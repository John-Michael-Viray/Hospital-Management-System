import React from "react";

const DoctorInformation = ({ doctor, remove, onUpdateClick }) => {
    return (
        <tr>
            <td>{doctor.first_name} {doctor.last_name}</td>
            <td>{doctor.specialization}</td>
            <td>{doctor.license_number}</td>
            <td>{doctor.phone}</td>
            <td>{doctor.email}</td>
            <td>
                <button className="btn btn-danger me-2" onClick={() => remove(doctor.id)}>Delete</button>
                <button className="btn btn-secondary" onClick={() => onUpdateClick(doctor)}>Update</button>
            </td>
        </tr>
    );
};

export default DoctorInformation;
