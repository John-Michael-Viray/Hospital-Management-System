import { useState, useEffect } from "react";
import { toast, Slide } from 'react-toastify';

export function useMedicalRecord() {
    // Store and setter for medical records.
    const [medicalRecords, setMedicalRecords] = useState([]);

    // State for displaying a loading page. Used for fetching data first before render.
    const [loading, setLoading] = useState(true);

    const notify = (message, status) => {
        if (status === "success") {
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

    const fetchMedicalRecords = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/medical-records/");
            const data = await response.json();

            if (response.ok) {
                setMedicalRecords(data.data);
            } else {
                throw new Error("Failed to fetch medical records.");
            }
        } catch (error) {
            console.error("Error fetching medical records:", error);
        } finally {
            // Set loading to false after fetching data, regardless of success or failure
            setLoading(false);
        }
    };

    const add = async (medicalRecord) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/medical-records/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(medicalRecord),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add medical record.");
            }

            fetchMedicalRecords();
            return notify("Successfully added the medical record.", "success");
        } catch (error) {
            console.error("Error adding medical record:", error);
        }
    };

    const update = async (medicalRecordId, updatedMedicalRecordData) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/medical-records/update/${medicalRecordId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedMedicalRecordData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update medical record.");
            }

            // After successfully updating the medical record, fetch the updated list of medical records
            fetchMedicalRecords();
            return notify("Successfully updated the medical record.", "success");
        } catch (error) {
            console.error("Error updating medical record:", error);
        }
    };

    const remove = async (medicalRecordId) => {
        if (window.confirm("Are you sure you want to remove this medical record?")) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/medical-records/remove/${medicalRecordId}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to remove medical record.");
                }

                fetchMedicalRecords();
                return notify("Successfully deleted the medical record.", "success");
            } catch (error) {
                console.error("Error removing medical record:", error);
            }
        }
    };

    useEffect(() => {
        fetchMedicalRecords();
    }, []);

    return { loading, medicalRecords, setMedicalRecords, add, update, remove };
}
