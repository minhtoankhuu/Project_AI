import React, { useEffect, useState } from "react";

const MapDisplay = ({ reloadKey, streamActive }) => {
    const [mapData, setMapData] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        let polling;

        const fetchMap = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/camera/map");
                const data = await res.json();
                setMapData(`data:image/png;base64,${data.image}`);
            } catch (error) {
                console.error("Lỗi khi lấy ảnh map:", error);
                setMapData(null);
            }
        };

        if (streamActive) {
            fetchMap(); // fetch ngay lần đầu tiên
            polling = setInterval(fetchMap, 1000);
            setIntervalId(polling);
        } else {
            clearInterval(intervalId);
            setMapData(`/static/map/no_video.png?${Date.now()}`);
        }

        return () => clearInterval(polling);
    }, [streamActive, reloadKey]);

    return (
        <div className="bg-gray-50 p-2 border rounded-xl shadow-inner">
            <h2 className="text-base font-semibold mb-2 text-center">Bản đồ vị trí 2D</h2>
            <div className="w-full h-auto">
                <img
                    src={mapData || "/static/map/no_video.png"}
                    alt="2D Map"
                    className="w-full h-auto rounded border"
                />
            </div>
        </div>
    );
};

export default MapDisplay;