import React, { useState } from "react";
import CameraStream from "./components/CameraStream";
import MapDisplay from "./components/MapDisplay";
import StatsDisplay from "./components/StatsDisplay";
import ViolationSidebar from "./components/ViolationSidebar";

const App = () => {
    const [reloadKey, setReloadKey] = useState(Date.now());
    const [streamRunning, setStreamRunning] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(1); // default cam 1

    return (
        <div className="flex flex-row min-h-screen p-4 gap-4 bg-gray-100">
            {/* BÊN TRÁI: Map + Stats + Camera */}
            <div className="w-2/3 flex flex-col gap-4">
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold">MAP</h2>
                    </div>

                    <MapDisplay
                        reloadKey={reloadKey}
                        streamActive={streamRunning}
                        camId={selectedCamera}
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4">
                    <StatsDisplay running={streamRunning} />
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4">
                    <CameraStream
                        onTriggerReload={() => setReloadKey(Date.now())}
                        onStreamStateChange={(state) => setStreamRunning(state)}
                        onCameraChange={(id) => setSelectedCamera(id)}
                    />
                </div>
            </div>

            {/* BÊN PHẢI: Lịch sử vi phạm */}
            <div className="w-1/3 bg-white rounded-2xl shadow-md p-4 overflow-y-auto">
                <ViolationSidebar />
            </div>
        </div>
    );
};

export default App;
