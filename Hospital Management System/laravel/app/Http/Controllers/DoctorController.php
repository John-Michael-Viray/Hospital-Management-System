<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class DoctorController extends Controller
{
    
    public function view()
    {
        $doctors = Doctor::all();
        return response()->json(['status' => 200, 'data' => $doctors]);
    }

    public function add(Request $request)
    {
        $rules = [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'specialization' => 'required|string',
            'license_number' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->messages()], 400);
        }

        try {
            $doctor = Doctor::create($request->all());
            return response()->json(['status' => 201, 'message' => 'Successfully created doctor', 'data' => $doctor], 201);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'specialization' => 'required|string',
            'license_number' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
        ]);

        try {
            $doctor = Doctor::findOrFail($id);
            $doctor->update($validatedData);
            return response()->json(['message' => 'Doctor updated successfully', 'data' => $doctor], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Doctor not found'], 404);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function delete($id)
    {
        $doctor = Doctor::find($id);

        if (!$doctor) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }

        $doctor->delete();
        return response()->json(['message' => 'Doctor removed successfully']);
    }
}
