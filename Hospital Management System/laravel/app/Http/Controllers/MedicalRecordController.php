<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicalRecord;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class MedicalRecordController extends Controller
{
    public function view()
    {
        $medicalRecords = MedicalRecord::all();
        return response()->json(['status' => 200, 'data' => $medicalRecords]);
    }

    public function add(Request $request)
    {
        $rules = [
            'patient_id' => 'required|integer|exists:patients,id',
            'doctor_id' => 'required|integer|exists:doctors,id',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->messages()], 400);
        }

        try {
            $medicalRecord = MedicalRecord::create($request->all());
            return response()->json(['status' => 201, 'message' => 'Successfully created medical record', 'data' => $medicalRecord], 201);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|integer|exists:patients,id',
            'doctor_id' => 'required|integer|exists:doctors,id',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        try {
            $medicalRecord = MedicalRecord::findOrFail($id);
            $medicalRecord->update($validatedData);
            return response()->json(['message' => 'Medical record updated successfully', 'data' => $medicalRecord], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Medical record not found'], 404);
        } catch (QueryException $e) {
            return response()->json(['status' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function delete($id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json(['message' => 'Medical record not found'], 404);
        }

        $medicalRecord->delete();
        return response()->json(['message' => 'Medical record removed successfully']);
    }
}