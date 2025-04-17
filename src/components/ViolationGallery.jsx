// components/ViolationGallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function ViolationGallery({ cameraId }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchViolations = async () => {
            try {
                const url = cameraId
                    ? `http://localhost:8000/api/images/violations?camera_id=${cameraId}`
                    : `http://localhost:8000/api/images/violations`;
                const res = await axios.get(url);
                setImages(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy ảnh vi phạm:", err);
            }
        };

        fetchViolations();
    }, [cameraId]);

    return (
        <div>
            <h2>Ảnh Vi Phạm {cameraId ? `(Camera ${cameraId})` : ""}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {images.map((img) => (
                    <div key={img.id} style={{ width: "200px" }}>
                        <img
                            src={`http://localhost:8000/static/${img.image_path}`}
                            alt="violation"
                            style={{ width: "100%" }}
                        />
                        <p>Camera {img.camera_id}</p>
                        <p>{new Date(img.saved_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViolationGallery;
