import React, { useEffect, useRef, useState } from "react";

const WebSocketStream = ({ camId, onStreamStateChange }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!camId) return;

        const wsUrl = `ws://localhost:8000/ws/stream/${camId}`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log(`WebSocket kết nối đến camera ${camId}`);
            if (onStreamStateChange) onStreamStateChange(true);
        };

        socket.onmessage = (event) => {
            if (event.data.startsWith("/9j") || event.data.startsWith("iVBOR")) {
                setImageSrc(`data:image/jpeg;base64,${event.data}`);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket lỗi:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket đóng");
            if (onStreamStateChange) onStreamStateChange(false);
        };

        return () => {
            if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
                socket.close();
            }
        };
    }, [camId]);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt={`Camera ${camId}`} className="w-full rounded-md border" />
            ) : (
                <img src="/static/map/no_video.png" alt="No video" className="w-full rounded-md border" />
            )}
        </div>
    );
};

export default WebSocketStream;
