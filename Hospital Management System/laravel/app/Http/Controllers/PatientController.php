<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class PatientController extends Controller
{
    
    public function view()
    {
        $patients = Patient::all();
        return response()->json(['status' => 200, 'data' => $patients]);
    }

    public function add(Request $request)
    {
        $rules = [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'emergency_contact' => 'required|string',
            'medical_history' => 'required|string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->messages()], 400);
        }

        try {
            $patient = Patient::create($request->all());
            return response()->json(['status' => 201, 'message' => 'Successfully created patient', 'data' => $patient], 201);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'emergency_contact' => 'required|string',
            'medical_history' => 'required|string',
        ]);

        try {
            $patient = Patient::findOrFail($id);
            $patient->update($validatedData);
            return response()->json(['message' => 'Patient updated successfully', 'data' => $patient], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Patient not found'], 404);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function delete($id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        $patient->delete();
        return response()->json(['message' => 'Patient removed successfully']);
    }
}
