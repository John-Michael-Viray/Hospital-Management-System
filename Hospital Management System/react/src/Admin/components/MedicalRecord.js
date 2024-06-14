import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useMedicalRecord } from "../useMedicalRecord";
import Loading from "./Loading";
import MedicalRecordInformation from "./MedicalRecordInformation";
import AddMedicalRecordForm from "./Forms/AddMedicalRecordForm";
import UpdateMedicalRecordForm from "./Forms/UpdateMedicalRecordForm";

const MedicalRecord = () => {
    const { loading, medicalRecords, add, update, remove } = useMedicalRecord();
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [currentMedicalRecord, setCurrentMedicalRecord] = useState(null);

    const handleAddClose = () => {
        setAddFormVisible(false);
    };

    const handleUpdateClick = (medicalRecord) => {
        setCurrentMedicalRecord(medicalRecord);
        setUpdateFormVisible(true);
    };

    const handleUpdateClose = () => {
        setUpdateFormVisible(false);
        setCurrentMedicalRecord(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-md mt-5">
            <ToastContainer />
            <header className="d-flex justify-content-between mb-3">
                <h2>Medical Records</h2>
                <button className="btn btn-primary" onClick={() => setAddFormVisible(true)}>Add Medical Record</button>
            </header>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Visit Date</th>
                            <th>Diagnosis</th>
                            <th>Treatment</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalRecords.map((medicalRecord) => (
                            <MedicalRecordInformation
                                key={medicalRecord.id}
                                medicalRecord={medicalRecord}
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
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="addMedicalRecordModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addMedicalRecordModalLabel">New Medical Record</h1>
                                    <button type="button" className="btn-close" onClick={handleAddClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddMedicalRecordForm addMedicalRecord={add} onClose={handleAddClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isUpdateFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="updateMedicalRecordModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="updateMedicalRecordModalLabel">Update Medical Record</h1>
                                    <button type="button" className="btn-close" onClick={handleUpdateClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <UpdateMedicalRecordForm medicalRecord={currentMedicalRecord} update={update} onClose={handleUpdateClose} />
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

export default MedicalRecord;
