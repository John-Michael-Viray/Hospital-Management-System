import React, { useState } from 'react';

const AddMedicalRecordForm = (props) => {
    // Stores form data inputted by the user.
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        visit_date: '',
        diagnosis: '',
        treatment: '',
        notes: ''
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
            if (await props.addMedicalRecord(formData)) {
                props.onClose();
            }
        } catch (error) {
            setFormError(error.message || 'An error occurred while adding the medical record.');
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
                <label htmlFor="visit_date" className="form-label">Visit Date:</label>
                <input
                    type="datetime-local"
                    id="visit_date"
                    name="visit_date"
                    value={formData.visit_date}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="diagnosis" className="form-label">Diagnosis:</label>
                <input
                    type="text"
                    id="diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="treatment" className="form-label">Treatment:</label>
                <input
                    type="text"
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="notes" className="form-label">Notes:</label>
                <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="form-control"
                ></textarea>
            </div>
            <button type="submit" className="btn btn-success">Add Medical Record</button>
            {formError && <p className="text-danger mt-2">Error: {formError}</p>}
        </form>
    );
};

export default AddMedicalRecordForm;
