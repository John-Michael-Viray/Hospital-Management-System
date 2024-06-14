import React from 'react';

const MedicalRecordInformation = ({ medicalRecord, remove, onUpdateClick }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this medical record?')) {
            remove(medicalRecord.id);
        }
    };

    return (
        <tr>
            <td>{medicalRecord.patient_id}</td>
            <td>{medicalRecord.doctor_id}</td>
            <td>{medicalRecord.visit_date}</td>
            <td>{medicalRecord.diagnosis}</td>
            <td>{medicalRecord.treatment}</td>
            <td>{medicalRecord.notes}</td>
            <td>
                <button className="btn btn-primary me-2" onClick={() => onUpdateClick(medicalRecord)}>Update</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default MedicalRecordInformation;
