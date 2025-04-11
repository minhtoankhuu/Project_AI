import React, { useEffect, useState } from "react";

const MapDisplay = ({ reloadKey, streamActive }) => {
    const [mapUrl, setMapUrl] = useState(`${window.location.origin}/static/map/no_video.png`);

    useEffect(() => {
        if (streamActive) {
            const timestamp = Date.now();
            setMapUrl(`${window.location.origin}/static/map/2d_map.png?${timestamp}`);
        } else {
            setMapUrl(`${window.location.origin}/static/map/no_video.png`);
        }
    }, [streamActive, reloadKey]);

    return (
        <div className="bg-gray-50 p-2 border rounded-xl shadow-inner">
            <h2 className="text-base font-semibold mb-2 text-center">Bản đồ vị trí 2D</h2>
            <div className="w-full h-auto">
                <img
                    src={mapUrl}
                    alt="2D Map"
                    className="w-full h-auto rounded border"
                    onError={() =>
                        setMapUrl(`${window.location.origin}/static/map/no_video.png`)
                    }
                />
            </div>
        </div>
    );
};

export default MapDisplay;