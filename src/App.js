import React, { useState } from "react";
import CameraStream from "./components/CameraStream";
import MapDisplay from "./components/MapDisplay";
import StatsDisplay from "./components/StatsDisplay";

const App = () => {
    const [reloadKey, setReloadKey] = useState(Date.now());
    const [streamRunning, setStreamRunning] = useState(false);

    return (
        <div className="flex flex-row min-h-screen p-4 gap-4 bg-gray-100">
            {/* Cột bên trái: MAP và STATS */}
            <div className="w-1/3 flex flex-col gap-4">
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">MAP</h2>
                    <MapDisplay reloadKey={reloadKey} streamActive={streamRunning} />
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4">
                    <StatsDisplay running={streamRunning} />
                </div>
            </div>

            {/* Cột bên phải: Camera + Video */}
            <div className="w-2/3 bg-white rounded-2xl shadow-md p-4">
                <CameraStream
                    onTriggerReload={() => setReloadKey(Date.now())}
                    onStreamStateChange={(state) => setStreamRunning(state)}
                />
            </div>
        </div>
    );
};

export default App;
