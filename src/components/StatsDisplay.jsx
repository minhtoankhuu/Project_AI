import React, { useEffect, useState } from "react";
import axios from "axios";

const StatsDisplay = ({ running }) => {
    const [stats, setStats] = useState({
        total: 0,
        safety: 0,
        no_safety: 0,
        machinery: 0,
        fps: 0.0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/camera/stats");
                setStats(res.data);
            } catch (err) {
                console.error("Lỗi lấy thống kê:", err);
            }
        };

        if (running) {
            const interval = setInterval(fetchStats, 1000);
            return () => clearInterval(interval);
        }
    }, [running]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2 text-center">📊 Thống kê</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <p>👷 Tổng người: {stats.total}</p>
                <p>🟢 Có PPE: {stats.safety}</p>
                <p>🔴 Không PPE: {stats.no_safety}</p>
                <p>🚜 Machinery: {stats.machinery}</p>
                <p>🎞️ FPS: {stats.fps}</p>
            </div>
        </div>
    );
};

export default StatsDisplay;
