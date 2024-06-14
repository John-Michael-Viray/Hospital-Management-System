import React, { useState } from 'react';

const AddAppointmentForm = (props) => {
    // Stores form data inputted by the user.
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        status: '',
        reason: ''
    });

    // Stores form error.
    const [formError, setFormError] = useState(null);

    // Checks for onChange events for the input fields and sets the variables' value.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function that handles form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error before submission
        setFormError(null);

        try {
            // Check if the operation is successful, if not then don't close the modal.
            if (await props.addAppointment(formData)) {
                props.onClose();
            }
        } catch (error) {
            setFormError(error.message || 'An error occurred while adding the appointment.');
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
            <button type="submit" className="btn btn-success">Add Appointment</button>
            {formError && <p className="text-danger mt-2">Error: {formError}</p>}
        </form>
    );
};

export default AddAppointmentForm;
