import { BrowserRouter, Route, Routes } from "react-router-dom";

// Admin
import AdminLayout from "./Admin/components/AdminLayout";
import AdminPatient from "./Admin/components/Patient";
import AdminDoctor from "./Admin/components/Doctor";
import AdminAppointment from "./Admin/components/Appointment";
import AdminMedicalRecord from "./Admin/components/MedicalRecord";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Admin Layout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminPatient />} />
                        <Route path="home" element={<AdminPatient />} />
                        <Route path="manage/patients" element={<AdminPatient />} />
                        <Route path="manage/doctors" element={<AdminDoctor />} />
                        <Route path="manage/appointments" element={<AdminAppointment />} />
                        <Route path="manage/medicalrecords" element={<AdminMedicalRecord />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;