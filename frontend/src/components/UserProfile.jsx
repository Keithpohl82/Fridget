import React, { useState } from "react";
import "bulma/css/bulma.min.css";

const predefinedAvatars = [
  "https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg",
  "https://img.freepik.com/free-vector/cute-shiba-inu-dog-chef-cooking-egg-fried-cartoon-vector-icon-illustration-animal-food-isolated_138676-8268.jpg",
  "https://img.freepik.com/free-vector/cute-cat-chef-cooking-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated-flat-vector_138676-9606.jpg",
  "https://img.freepik.com/free-vector/cute-bear-chef-cooking-honey-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated_138676-7927.jpg",
  "https://img.freepik.com/free-vector/cute-cow-chef-cooking-steak-meat-cartoon-vector-icon-illustration-animal-food-icon-isolated-flat_138676-8887.jpg",
  "https://img.freepik.com/free-vector/cute-astronaut-chef-with-fish-knife-cartoon-vector-icon-illustration-science-food-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4140.jpg",
  "https://img.freepik.com/free-vector/men-chef-holding-plate-cartoon-food-restaurant-logo-hand-draw-vector-illustration_56104-2135.jpg",
];

const UserProfile = ({ user }) => {
  const [avatar, setAvatar] = useState(user.profilePicture);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle avatar change via file upload
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setAvatarFile(file);
        setShowAvatarSelection(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle predefined avatar selection
  const handlePredefinedAvatarSelect = (avatarUrl) => {
    setAvatar(avatarUrl);
    setShowAvatarSelection(false);
  };

  const toggleAvatarSelection = () => {
    setShowAvatarSelection(!showAvatarSelection);
  };

  const toggleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const saveProfileChanges = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <div className="columns is-vcentered">
          <div className="column is-narrow has-text-centered">
            <figure className="image is-128x128 is-clickable" onClick={toggleAvatarSelection}>
              <img
                src={avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="is-rounded"
              />
            </figure>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="column">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input mb-3"
                  placeholder="Username"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="textarea mb-3"
                  placeholder="Bio"
                />
                <button className="button is-primary is-fullwidth" onClick={saveProfileChanges}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <h2 className="title is-4">{username}</h2>
                <p className="subtitle is-6">{bio}</p>
                <button className="button is-info" onClick={toggleEditProfile}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Avatar Selection Popup */}
      {showAvatarSelection && (
        <div className="modal is-active">
          <div className="modal-background" onClick={toggleAvatarSelection}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Choose an Avatar</p>
              <button className="delete" onClick={toggleAvatarSelection} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <div className="columns is-multiline">
                {predefinedAvatars.map((avatarUrl, index) => (
                  <div className="column is-4" key={index}>
                    <figure className="image is-64x64 is-clickable">
                      <img
                        src={avatarUrl}
                        alt={`Avatar ${index + 1}`}
                        className="is-rounded"
                        onClick={() => handlePredefinedAvatarSelect(avatarUrl)}
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-link"
                onClick={() => document.querySelector(`input[type="file"]`).click()}
              >
                Upload Your Avatar
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* User Stats */}
      <div className="box mt-4">
        <div className="columns">
          <div className="column has-text-centered">
            <h3 className="title is-5">{user.posts}</h3>
            <p>Recipes Followed</p>
          </div>
          <div className="column has-text-centered">
            <h3 className="title is-5">{user.followers}</h3>
            <p>Ingredients Used</p>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="box">
        <h3 className="title is-5">Details</h3>
        <p>
          <strong>Location:</strong> {user.location || "Not specified"}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "Not specified"}
        </p>
      </div>

      {/* User Actions */}
      <div className="buttons is-centered mt-4">
        <button className="button is-danger">Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
