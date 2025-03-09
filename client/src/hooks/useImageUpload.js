import axios from "axios";
import { useState } from "react";

export const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState();
  const [imageUploadingEror, setImageUploadingError] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const handleUpload = async (imageFile) => {
    console.log(imageFile);

    try {
      if (!imageFile) {
        setImageUploadingError("Please select an image");
        return;
      }
      setImageUploadingError(null);
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET_NAME,
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            setImageUploadingProgress(progress); // Update progress state
          },
        },
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      setImageUploadingError(error.message);
      setImageUploadingProgress(null);
    } finally {
      setImageUploadingProgress(null);
    }
  };

  return { handleUpload, imageUrl, imageUploadingEror, imageUploadingProgress };
};
