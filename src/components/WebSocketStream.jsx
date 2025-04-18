import React, { useEffect, useRef, useState } from "react";

const WebSocketStream = ({ camId, onStreamStateChange, onWarningChange }) => {
    const [image, setImage] = useState(null);
    const wsRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/stream/${camId}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connected");
            onStreamStateChange?.(true);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.image) {
                    setImage(`data:image/jpeg;base64,${data.image}`);
                }
                if (typeof data.warning !== "undefined") {
                    onWarningChange?.(data.warning);
                }
            } catch (err) {
                console.error("Error parsing WebSocket message", err);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            onStreamStateChange?.(false);
            onWarningChange?.(false);
        };

        return () => ws.close();
    }, [camId]);

    return (
        <div className="rounded-xl overflow-hidden">
            {image ? (
                <img
                    src={image}
                    alt={`Camera ${camId} Feed`}
                    className="w-full h-auto"
                />
            ) : (
                <p className="text-gray-500 text-sm text-center">Waiting for stream...</p>
            )}
        </div>
    );
};

export default WebSocketStream;
