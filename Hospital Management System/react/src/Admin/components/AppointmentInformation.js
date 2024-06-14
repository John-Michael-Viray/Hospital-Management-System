import React from "react";

const AppointmentInformation = ({ appointment, remove, onUpdateClick }) => {
    return (
        <tr>
            <td>{appointment.patient_id}</td>
            <td>{appointment.doctor_id}</td>
            <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
            <td>{appointment.status}</td>
            <td>{appointment.reason}</td>
            <td>
                <button className="btn btn-danger me-2" onClick={() => remove(appointment.id)}>Delete</button>
                <button className="btn btn-secondary" onClick={() => onUpdateClick(appointment)}>Update</button>
            </td>
        </tr>
    );
};

export default AppointmentInformation;
