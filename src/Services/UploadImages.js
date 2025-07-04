import axios from "axios";

export const uploadImage = async(imageData) => {
    const uploadImg = new FormData();
    uploadImg.append("file", imageData);
    uploadImg.append("cloude_name", "dx457iqpi");
    uploadImg.append("upload_preset", "Products");
    let response = await axios.post(`https://api.cloudinary.com/v1_1/dx457iqpi/image/upload`, uploadImg)
    return response.data.secure_url;
}