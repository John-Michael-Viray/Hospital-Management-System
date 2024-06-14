import { useState, useEffect } from "react";
import { toast, Slide } from 'react-toastify';

export function useAppointment() {
    // Store and setter for appointments.
    const [appointments, setAppointments] = useState([]);

    // State for displaying a loading page. Used for fetching data first before render.
    const [loading, setLoading] = useState(true);

    const notify = (message, status) => {
        if(status === "success") {
            toast.success(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return true;
        } else if (status === "error") {
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return false;
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/appointments/");
            const data = await response.json();

            if (response.ok) {
                setAppointments(data.data);
            } else {
                throw new Error("Failed to fetch appointments.");
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            // Set loading to false after fetching data, regardless of success or failure
            setLoading(false); 
        }
    };

    const add = async (appointment) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/appointments/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(appointment),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add appointment.");
            }

            fetchAppointments();
            return notify("Successfully added the appointment.", "success");
        } catch (error) {
            console.error("Error adding appointment:", error);
        }
    };

    const update = async (appointmentId, updatedAppointmentData) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/appointments/update/${appointmentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedAppointmentData),
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to update appointment.");
            }

            // After successfully updating the appointment, fetch the updated list of appointments
            fetchAppointments();
            return notify("Successfully updated the appointment.", "success");
        } catch (error) {
            console.error("Error updating appointment:", error);
        }
    };

    const remove = async (appointmentId) => {
        if (window.confirm("Are you sure you want to remove this appointment?")) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/appointments/remove/${appointmentId}`,
                    {
                        method: "DELETE",
                    }
                );
                
                if (!response.ok) {
                    throw new Error("Failed to remove appointment.");
                }

                fetchAppointments();
                return notify("Successfully deleted the appointment.", "success");
            } catch (error) {
                console.error("Error removing appointment:", error);
            }
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return { loading, appointments, setAppointments, add, update, remove};
}
