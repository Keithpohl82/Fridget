import { useState } from 'react';

function PhotoUpload() {
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoPerview, setPhotoPreview] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhotoPreview(event.target.result);
                setPhotoUrl("frontend/public/photos/" + file.name) // Set the base64 string as the image source
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                name="photoPerview"
            />
            {photoPerview && (
                <div>
                    <img
                        src={photoPerview}
                        alt="Preview"
                        style={{ width: '300px', height: 'auto', marginTop: '10px' }}
                    />
                </div>
            )}
        </div>
    );
}
export default PhotoUpload;