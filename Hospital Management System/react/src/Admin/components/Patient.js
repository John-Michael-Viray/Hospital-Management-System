import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { usePatient } from "../usePatient";
import Loading from "./Loading";
import PatientInformation from "./PatientInformation";
import AddPatientForm from "./Forms/AddPatientForm";
import UpdatePatientForm from "./Forms/UpdatePatientForm";

const Patient = () => {
    const { loading, patients, add, update, remove } = usePatient();
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);

    const handleAddClose = () => {
        setAddFormVisible(false);
    };

    const handleUpdateClick = (patient) => {
        setCurrentPatient(patient);
        setUpdateFormVisible(true);
    };

    const handleUpdateClose = () => {
        setUpdateFormVisible(false);
        setCurrentPatient(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-md mt-5">
            <ToastContainer />
            <div className="patients m-2 p-2">
                <header className="d-flex justify-content-between mb-3">
                    <h2>Patients</h2>
                    <button className="btn btn-primary" onClick={() => setAddFormVisible(true)}>Add Patient</button>
                </header>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Emergency Contact</th>
                            <th>Medical History</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <PatientInformation
                                key={patient.id}
                                patient={patient}
                                remove={remove}
                                onUpdateClick={handleUpdateClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="addPatientModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addPatientModalLabel">New Patient</h1>
                                    <button type="button" className="btn-close" onClick={handleAddClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddPatientForm add={add} onClose={handleAddClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isUpdateFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="updatePatientModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="updatePatientModalLabel">Update Patient</h1>
                                    <button type="button" className="btn-close" onClick={handleUpdateClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <UpdatePatientForm patient={currentPatient} update={update} onClose={handleUpdateClose} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleUpdateClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Patient;
