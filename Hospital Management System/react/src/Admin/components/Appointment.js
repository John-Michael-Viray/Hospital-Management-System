import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useAppointment } from "../useAppointment";
import Loading from "./Loading";
import AppointmentInformation from "./AppointmentInformation";
import AddAppointmentForm from "./Forms/AddAppointmentForm";
import UpdateAppointmentForm from "./Forms/UpdateAppointmentForm";

const Appointment = () => {
    const { loading, appointments, add, update, remove } = useAppointment();
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    const handleAddClose = () => {
        setAddFormVisible(false);
    };

    const handleUpdateClick = (appointment) => {
        setCurrentAppointment(appointment);
        setUpdateFormVisible(true);
    };

    const handleUpdateClose = () => {
        setUpdateFormVisible(false);
        setCurrentAppointment(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-md mt-5">
            <ToastContainer />
            <header className="d-flex justify-content-between mb-3">
                <h2>Appointments</h2>
                <button className="btn btn-primary" onClick={() => setAddFormVisible(true)}>Add Appointment</button>
            </header>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <AppointmentInformation
                                key={appointment.id}
                                appointment={appointment}
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
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="addAppointmentModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addAppointmentModalLabel">New Appointment</h1>
                                    <button type="button" className="btn-close" onClick={handleAddClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddAppointmentForm addAppointment={add} onClose={handleAddClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isUpdateFormVisible && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="updateAppointmentModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="updateAppointmentModalLabel">Update Appointment</h1>
                                    <button type="button" className="btn-close" onClick={handleUpdateClose} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <UpdateAppointmentForm appointment={currentAppointment} update={update} onClose={handleUpdateClose} />
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

export default Appointment;
