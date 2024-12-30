const uploadImageToCloudinary = async file => {
    // For React apps, environment variables must start with REACT_APP_
    const upload_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  
    // Add validation
    if (!upload_preset || !cloud_name) {
      console.error('Cloudinary configuration missing:', { upload_preset, cloud_name });
      throw new Error('Cloudinary configuration is missing');
    }
  
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', upload_preset);
      uploadData.append('cloud_name', cloud_name);
  
      console.log('Uploading to Cloudinary with:', {
        cloud_name,
        upload_preset: upload_preset,
        fileSize: file.size,
        fileType: file.type
      });
  
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: 'POST',
          body: uploadData
        }
      );
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Cloudinary error response:', errorData);
        throw new Error(errorData.error?.message || 'Upload failed');
      }
  
      const data = await res.json();
      console.log('Upload successful:', data);
      return data;
  
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };
  
  export default uploadImageToCloudinary;