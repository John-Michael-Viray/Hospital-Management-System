import { useState, useEffect } from "react";
import { toast, Slide } from 'react-toastify';

export function usePatient() {
    // Store and setter for patients.
    const [patients, setPatients] = useState([]);

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

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/patients/");
            const data = await response.json();

            if (response.ok) {
                setPatients(data.data);
            } else {
                throw new Error("Failed to fetch patients.");
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            // Set loading to false after fetching data, regardless of success or failure
            setLoading(false); 
        }
    };

    const add = async (patient) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/patients/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(patient),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add patient.");
            }

            fetchPatients();
            return notify("Successfully added the patient.", "success");
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    const update = async (patientId, updatedPatientData) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/patients/update/${patientId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedPatientData),
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to update patient.");
            }

            // After successfully updating the patient, fetch the updated list of patients
            fetchPatients();
            return notify("Successfully updated the patient.", "success");
        } catch (error) {
            console.error("Error updating patient:", error);
        }
    };

    const remove = async (patientId) => {
        if (window.confirm("Are you sure you want to remove this patient?")) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/patients/remove/${patientId}`,
                    {
                        method: "DELETE",
                    }
                );
                
                if (!response.ok) {
                    throw new Error("Failed to remove patient.");
                }

                fetchPatients();
                return notify("Successfully deleted the patient.", "success");
            } catch (error) {
                console.error("Error removing patient:", error);
            }
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return { loading, patients, setPatients, add, update, remove};
}
