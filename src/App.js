import React, { useState } from "react";
import CameraStream from "./components/CameraStream";
import MapDisplay from "./components/MapDisplay";
import StatsDisplay from "./components/StatsDisplay";
import ViolationSidebar from "./components/ViolationSidebar";

const App = () => {
    const [reloadKey, setReloadKey] = useState(Date.now());
    const [streamRunning, setStreamRunning] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(1);
    const [warning, setWarning] = useState(false); // ⚠️ cảnh báo toàn app

    return (
        <div className="flex flex-row min-h-screen p-4 gap-4 bg-gray-100">
            {/* BÊN TRÁI */}
            <div className="w-2/3 flex flex-col gap-4">
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">MAP</h2>
                    <MapDisplay
                        reloadKey={reloadKey}
                        streamActive={streamRunning}
                        camId={selectedCamera}
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4">
                    <StatsDisplay running={streamRunning} />
                </div>

                {/* ⚠️ bọc khung camera bằng cảnh báo */}
                <div className={`transition-all duration-300 border-4 rounded-2xl shadow-md p-4 ${warning ? 'border-red-600 bg-red-50 animate-pulse' : 'border-transparent bg-white'
                    }`}>
                    <CameraStream
                        onTriggerReload={() => setReloadKey(Date.now())}
                        onStreamStateChange={(state) => setStreamRunning(state)}
                        onCameraChange={(id) => setSelectedCamera(id)}
                        onWarningChange={(value) => setWarning(value)} // ✅ truyền cảnh báo từ dưới lên
                    />
                </div>
            </div>

            {/* BÊN PHẢI */}
            <div className="w-1/3 bg-white rounded-2xl shadow-md p-4 overflow-y-auto">
                <ViolationSidebar />
            </div>
        </div>
    );
};

export default App;
