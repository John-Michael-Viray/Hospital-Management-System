import React from "react";

// Component used for displaying loading screen.
// Used to provide enough time to fetch data and render after fetched.
export default function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};