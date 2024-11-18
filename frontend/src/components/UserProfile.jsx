import React, { useState } from "react";
import "bulma/css/bulma.min.css";

const UserProfile = ({ user, logoutUser }) => {
  const [avatar, setAvatar] = useState(user?.profilePicture || "");
  const [photoPreview, setPhotoPreview] = useState(""); // Local preview
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    try {
      // Compress and upload the image
      const formData = new FormData();
      formData.append("file", file);

      setUploading(true);

      const response = await fetch(`http://localhost:8080/users/${user.id}/upload-profile-picture`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const filePath = await response.text();
        setAvatar(filePath); // Update avatar with new file path
        alert("Profile picture updated successfully!");
      } else {
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("An error occurred while updating the profile picture.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <div className="columns is-vcentered">
          <div className="column is-narrow has-text-centered">
            <figure className="image is-128x128">
              <img src={avatar || "https://via.placeholder.com/150"} alt="User Avatar" className="is-rounded" />
            </figure>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: "10px" }} />
            {uploading && <p>Uploading...</p>}
          </div>
          {/* Other profile details */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
