import React, { useState } from "react";
import WebSocketStream from "./WebSocketStream";

const CameraStream = ({ onTriggerReload, onStreamStateChange }) => {
    const [camId, setCamId] = useState(null);
    const [reloadKey, setReloadKey] = useState(Date.now());

    const handleClick = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/camera/detect?cam_id=${id}`);
            setCamId(id);
            setReloadKey(Date.now());
            if (onTriggerReload) onTriggerReload();
            if (onStreamStateChange) onStreamStateChange(true);
        } catch (err) {
            console.error("Lỗi khi gọi API detect", err);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <label className="font-semibold mr-2">
                    {camId ? `CAMERA ${camId}` : "Chọn Camera để bắt đầu"}
                </label>
                {[1, 2, 3, 4, 5].map((id) => (
                    <button
                        key={id}
                        onClick={() => handleClick(id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                        Camera {id === 5 ? "Webcam" : id}
                    </button>
                ))}
            </div>

            {camId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-md font-semibold mb-2">Video phát hiện</h3>
                        <WebSocketStream key={reloadKey} camId={camId} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CameraStream;
