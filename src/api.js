import axios from "axios";

export const detectFromCamera = async (camId) => {
    const res = await axios.get(`http://localhost:8000/api/camera/detect?cam_id=${camId}`);
    return res.data.image_path;
};
