import React, { useState } from 'react';

const UpdateAppointmentForm = ({ appointment, update, onClose }) => {
    const { patient_id, doctor_id, appointment_date, status, reason } = appointment;
    const [formData, setFormData] = useState({ patient_id, doctor_id, appointment_date, status, reason });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if the operation is successful, if not then don't close the modal.
        if (await update(appointment.id, formData)) {
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="rounded bg-light p-4">
            <div className="mb-3">
                <label htmlFor="patient_id" className="form-label">Patient:</label>
                <input
                    type="text"
                    id="patient_id"
                    name="patient_id"
                    value={formData.patient_id}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="doctor_id" className="form-label">Doctor:</label>
                <input
                    type="text"
                    id="doctor_id"
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="appointment_date" className="form-label">Appointment Date:</label>
                <input
                    type="datetime-local"
                    id="appointment_date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="reason" className="form-label">Reason:</label>
                <input
                    type="text"
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-success">Update</button>
        </form>
    );
};

export default UpdateAppointmentForm;
