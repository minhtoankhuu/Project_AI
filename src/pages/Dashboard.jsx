import React from "react";
import CameraStream from "../components/CameraStream";
import MapDisplay from "../components/MapDisplay";
import StatsDisplay from "../components/StatsDisplay";

const Dashboard = () => {
    return (
        <div className="flex flex-row min-h-screen p-4 gap-4 bg-gray-100">
            {/* Left column */}
            <div className="w-1/3 flex flex-col gap-4">
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">MAP</h2>
                    <MapDisplay />
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">Thông số hiển thị</h2>
                    <StatsDisplay />
                </div>
            </div>

            {/* Right column */}
            <div className="w-2/3 bg-white rounded-2xl shadow-md p-4">
                <CameraStream />
            </div>
        </div>
    );
};

export default Dashboard;