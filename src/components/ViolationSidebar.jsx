import React, { useState } from "react";
import axios from "axios";
import ViolationGallery from "./ViolationGallery";

function ViolationSidebar() {
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCleaning, setIsCleaning] = useState(false);

    const handleCleanup = async () => {
        setIsCleaning(true);
        try {
            const res = await axios.post("http://localhost:8000/api/images/cleanup");
            alert(`🧹 Đã xoá ${res.data.removed} ảnh không tồn tại khỏi database!`);
        } catch (err) {
            console.error("Cleanup lỗi:", err);
            alert("❌ Không thể cleanup!");
        } finally {
            setIsCleaning(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mb-2">
                <h2 className="text-xl font-semibold mb-2">Lịch sử vi phạm</h2>

                {/* Chọn camera */}
                <div className="flex gap-2 mb-2 flex-wrap">
                    {[1, 2, 3, 4].map((id) => (
                        <button
                            key={id}
                            onClick={() => setSelectedCamera(id)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${selectedCamera === id
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            Camera {id}
                        </button>
                    ))}
                </div>

                {/* Nút dọn ảnh lỗi */}
                <button
                    onClick={handleCleanup}
                    disabled={isCleaning}
                    className={`px-3 py-1 rounded text-sm font-medium ${isCleaning
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                >
                    {isCleaning ? "Đang xoá..." : "🧹 Dọn ảnh lỗi"}
                </button>
            </div>

            {/* Gallery */}
            {selectedCamera ? (
                <div className="overflow-y-auto flex-1">
                    <ViolationGallery cameraId={selectedCamera} date={selectedDate} />
                </div>
            ) : (
                <p className="text-gray-500 text-sm">Chọn camera để xem lịch sử vi phạm</p>
            )}
        </div>
    );
}

export default ViolationSidebar;
