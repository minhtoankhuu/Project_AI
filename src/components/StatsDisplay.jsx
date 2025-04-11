import React, { useEffect, useState } from "react";

const StatsDisplay = ({ running }) => {
    const [stats, setStats] = useState({ total: 0, safety: 0, no_safety: 0, fps: 0 });

    useEffect(() => {
        if (!running) return;
        const interval = setInterval(async () => {
            try {
                const res = await fetch("http://localhost:8000/api/camera/stats");
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);

    return (
        <div className="text-sm">
            <h2 className="font-bold">Thông số hiển thị</h2>
            <p>Tổng công nhân: {stats.total}</p>
            <p>An toàn (Safety): {stats.safety}</p>
            <p>Vi phạm (No-Safety): {stats.no_safety}</p>
            <p>FPS: {stats.fps}</p>
        </div>
    );
};

export default StatsDisplay;