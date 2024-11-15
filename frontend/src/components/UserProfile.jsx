import React, { useState } from "react";
import styles from "../styles/Profile.module.css";

const predefinedAvatars = [
  "https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg",
  "https://img.freepik.com/free-vector/cute-shiba-inu-dog-chef-cooking-egg-fried-cartoon-vector-icon-illustration-animal-food-isolated_138676-8268.jpg",
  "https://img.freepik.com/free-vector/cute-cat-chef-cooking-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated-flat-vector_138676-9606.jpg",
  "https://img.freepik.com/free-vector/cute-bear-chef-cooking-honey-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated_138676-7927.jpg",
  "https://img.freepik.com/free-vector/cute-cow-chef-cooking-steak-meat-cartoon-vector-icon-illustration-animal-food-icon-isolated-flat_138676-8887.jpg",
  "https://img.freepik.com/free-vector/cute-astronaut-chef-with-fish-knife-cartoon-vector-icon-illustration-science-food-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4140.jpg",
  "https://img.freepik.com/free-vector/men-chef-holding-plate-cartoon-food-restaurant-logo-hand-draw-vector-illustration_56104-2135.jpg"
];

const UserProfile = ({ user }) => {
  const [avatar, setAvatar] = useState(user.profilePicture);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  // Handle avatar change via file upload
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setAvatarFile(file);
        setShowAvatarSelection(false); // Hide the avatar selection after upload
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle predefined avatar selection
  const handlePredefinedAvatarSelect = (avatarUrl) => {
    setAvatar(avatarUrl);
    setShowAvatarSelection(false); // Close the selection popup
  };

  // Toggle avatar selection visibility
  const toggleAvatarSelection = () => {
    setShowAvatarSelection(!showAvatarSelection);
  };

  // Toggle edit mode
  const toggleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  // Save changes after editing
  const saveProfileChanges = () => {
    // You can save the changes to the backend or update global state here
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer} onClick={toggleAvatarSelection}>
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className={styles.avatar}
          />
          <input
            type="file"
            accept="image/*"
            className={styles.avatarInput}
            onChange={handleAvatarChange}
            style={{ display: "none" }} // Hide the default file input
          />
        </div>
        <div className={styles.profileInfo}>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.usernameInput}
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={styles.bioInput}
              />
              <button onClick={saveProfileChanges} className={styles.saveProfile}>
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <h2 className={styles.username}>{username}</h2>
              <p className={styles.bio}>{bio}</p>
              <button onClick={toggleEditProfile} className={styles.editProfile}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Selection Popup */}
      {showAvatarSelection && (
        <div className={styles.avatarSelectionPopup}>
          <h3>Choose an Avatar</h3>
          <div className={styles.predefinedAvatars}>
            {predefinedAvatars.map((avatarUrl, index) => (
              <img
                key={index}
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                className={styles.predefinedAvatar}
                onClick={() => handlePredefinedAvatarSelect(avatarUrl)}
              />
            ))}
          </div>
          {/* Upload Avatar Button */}
          <button
            className={styles.uploadButton}
            onClick={() => document.querySelector(`.${styles.avatarInput}`).click()}
          >
            Upload Your Avatar
          </button>
        </div>
      )}

      {/* User Stats */}
      <div className={styles.userStats}>
        <div className={styles.stat}>
          <h3>{user.posts}</h3>
          <p>Recipes Followed</p>
        </div>
        <div className={styles.stat}>
          <h3>{user.followers}</h3>
          <p>Ingridients Used</p>
        </div>
        
      </div>

      {/* User Details */}
      <div className={styles.userDetails}>
        <h3>Details</h3>
        <p>
          <strong>Location:</strong> {user.location || "Not specified"}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "Not specified"}
        </p>
        <p>
  
        </p>
      </div>

      {/* Settings/Preferences */}
      <div className={styles.userActions}>
        <button className={`${styles.btn} ${styles.logout}`}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
