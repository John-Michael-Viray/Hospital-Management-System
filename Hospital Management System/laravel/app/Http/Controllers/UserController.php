<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class UserController extends Controller
{
    // Get all the available products from the database.
    public function view()
    {
        $user = new User();
        $users = $user->all();

        return response()->json(['status' => 200, 'data' => $users]);
    }

    // Adds user to the cart.
    public function add(Request $request)
    {
        // Define validation rules
        $rules = [
            'name' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string',
        ];

        // Validate the incoming request data
        $validator = Validator::make($request->all(), $rules);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->messages()], 400);
        }

        try {
            // Attempt to find the user in the cart
            $existingUser = User::where('name', $request->name)
                ->where('email', $request->email)
                ->first();

            // If the user exists, return a specific error response
            if ($existingUser) {
                return response()->json(['status' => 409, 'message' => 'User already exists'], 409);
            } else {
                // If the user doesn't exist, create a new entry
                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->save();

                return response()->json(['status' => 201, 'message' => 'Successfully created user'], 201);
            }
        } catch (QueryException $e) {
            // Check if the error is a duplicate entry error
            if ($e->getCode() == 23000) { // 23000 is the SQLSTATE code for integrity constraint violation
                return response()->json(['status' => 409, 'message' => 'User already exists'], 409);
            }

            // Return a generic error message
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        } catch (\Exception $e) {
            // Return a generic error message
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
            // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Hash the password
        $hashedPassword = Hash::make($validatedData['password']);

        try {
            // Attempt to find the user in the database by ID
            $user = User::findOrFail($id);

            // Check if there's another user with the same name and email
            $existingUser = User::where('name', $validatedData['name'])
                                ->where('email', $validatedData['email'])
                                ->where('id', '!=', $id) // Exclude the current user from the check
                                ->first();

            if ($existingUser) {
                return response()->json(['status' => 409, 'message' => 'User with this name and email already exists'], 409);
            }

            // Update the user with validated data
            $user->name = $validatedData['name'];
            $user->email = $validatedData['email'];
            $user->password = $hashedPassword;
            $user->save();

            return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'User not found'], 404);
        } catch (QueryException $e) {
            // Check if the error is a duplicate entry error
            if ($e->getCode() == 23000) { // 23000 is the SQLSTATE code for integrity constraint violation
                return response()->json(['status' => 409, 'message' => 'User already exists'], 409);
            }

            // Return a generic error message
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        } catch (\Exception $e) {
            // Return a generic error message
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    // Removes user from the cart.
    public function delete($id)
    {
        // Fetch the user from the database
        $user = User::find($id);

        if (!$user) {
            // User not found, return appropriate response (e.g., 404 Not Found)
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        // Return a success response
        return response()->json(['message' => 'User removed successfully']);
    }
}
