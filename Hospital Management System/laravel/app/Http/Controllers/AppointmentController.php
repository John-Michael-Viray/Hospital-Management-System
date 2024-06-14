<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class AppointmentController extends Controller
{
    public function view()
    {
        $appointments = Appointment::all();
        return response()->json(['status' => 200, 'data' => $appointments]);
    }

    public function add(Request $request)
    {
        $rules = [
            'patient_id' => 'required|integer|exists:patients,id',
            'doctor_id' => 'required|integer|exists:doctors,id',
            'appointment_date' => 'required|date',
            'status' => 'required|string',
            'reason' => 'nullable|string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->messages()], 400);
        }

        try {
            $appointment = Appointment::create($request->all());
            return response()->json(['status' => 201, 'message' => 'Successfully created appointment', 'data' => $appointment], 201);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|integer|exists:patients,id',
            'doctor_id' => 'required|integer|exists:doctors,id',
            'appointment_date' => 'required|date',
            'status' => 'required|string',
            'reason' => 'nullable|string',
        ]);

        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->update($validatedData);
            return response()->json(['message' => 'Appointment updated successfully', 'data' => $appointment], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Appointment not found'], 404);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function delete($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $appointment->delete();
        return response()->json(['message' => 'Appointment removed successfully']);
    }
}
