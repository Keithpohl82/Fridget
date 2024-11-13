import { useState } from 'react';

function PhotoUpload() {
    const [photoUrl, setPhotoUrl] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhotoUrl(event.target.result); // Set the base64 string as the image source
            };
            reader.readAsDataURL(file);
            
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                name="photoURL"
            />
            {photoUrl && (
                <div>
                    <img
                        src={photoUrl}
                        alt="Preview"
                        style={{ width: '300px', height: 'auto', marginTop: '10px' }}
                    />
                </div>
            )}
        </div>
    );
}
export default PhotoUpload;