import React, { useState } from "react";
import "bulma/css/bulma.min.css";

const UserProfile = ({ user, logoutUser }) => {
  const [avatar, setAvatar] = useState(user?.profilePicture ? `http://localhost:8080/${user.profilePicture}` : "https://via.placeholder.com/150");
  const [photoFile, setPhotoFile] = useState(null); // File selected for upload
  const [photoPreview, setPhotoPreview] = useState(""); // Local preview
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file)); // Set local preview
  };

  const handleUpload = async () => {
    if (!photoFile) {
      alert("No file selected. Please choose a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", photoFile); // Use photoFile state

      const response = await fetch(`http://localhost:8080/userservice/${user.id}/upload-profile-picture`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const newFilePath = await response.text(); // Backend returns the new file path
        console.log("File uploaded successfully:", newFilePath);
        setAvatar(newFilePath); // Update the avatar state
        setPhotoPreview(""); // Clear the local preview after successful upload
        alert("Profile picture updated successfully!");
      } else {
        const errorText = await response.text();
        console.error("Error uploading profile picture:", errorText);
        alert(`Failed to update profile picture: ${errorText}`);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("An error occurred while uploading the profile picture.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <div className="columns is-vcentered">
          {/* Profile Picture Section */}
          <div className="column is-narrow has-text-centered">
            <figure className="image is-128x128">
              <img src={photoPreview || avatar} alt="User Avatar" className="is-rounded" />
            </figure>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: "10px" }} />
            {photoPreview && (
              <button className="button is-primary mt-3" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Update Profile Picture"}
              </button>
            )}
            {uploading && <p>Uploading...</p>}
          </div>

          {/* Other profile details */}
          <div className="column">
            <h2 className="title is-4">{user.username}</h2>
            <p className="subtitle is-6">{user.email}</p>
            <button className="button is-danger" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
