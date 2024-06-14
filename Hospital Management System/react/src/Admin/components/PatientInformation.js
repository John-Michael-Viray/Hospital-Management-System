import React from "react";

const PatientInformation = ({ patient, remove, onUpdateClick }) => {
    return (
        <tr>
            <td>{patient.first_name} {patient.last_name}</td>
            <td>{new Date(patient.date_of_birth).toLocaleDateString()}</td>
            <td>{patient.gender}</td>
            <td>{patient.address}</td>
            <td>{patient.phone}</td>
            <td>{patient.email}</td>
            <td>{patient.emergency_contact}</td>
            <td>{patient.medical_history}</td>
            <td>
                <button className="btn btn-danger me-2" onClick={() => remove(patient.id)}>Delete</button>
                <button className="btn btn-secondary" onClick={() => onUpdateClick(patient)}>Update</button>
            </td>
        </tr>
    );
};

export default PatientInformation;
