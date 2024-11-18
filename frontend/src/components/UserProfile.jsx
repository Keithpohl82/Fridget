import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";

const UserProfile = ({ user, logoutUser }) => {
  const [avatar, setAvatar] = useState(user?.profilePicture || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [email, setEmail] = useState(user?.email || ""); // Add email state
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleEditProfile = () => {
    setIsEditing(!isEditing);
    setErrorMessage(""); // Clear error messages when toggling edit mode
    setSuccessMessage(""); // Clear success messages when toggling edit mode
  };

  const saveProfileChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/userservice/update-email?newEmail=${encodeURIComponent(
          email
        )}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        setSuccessMessage("Email updated successfully.");
        setIsEditing(false);
      } else {
        const message = await response.text();
        setErrorMessage(message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <div className="columns is-vcentered">
          <div className="column is-narrow has-text-centered">
            <figure
              className="image is-128x128 is-clickable"
              onClick={() => setShowAvatarSelection(!showAvatarSelection)}
            >
              <img
                src={avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="is-rounded"
              />
            </figure>
          </div>
          <div className="column">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={username}
                  disabled
                  className="input mb-3"
                  placeholder="Username"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input mb-3"
                  placeholder="Email"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="textarea mb-3"
                  placeholder="Bio"
                />
                {errorMessage && (
                  <p className="help is-danger">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="help is-success">{successMessage}</p>
                )}
                <button
                  className="button is-primary is-fullwidth"
                  onClick={saveProfileChanges}
                >
                  Save Changes
                </button>
                <button
                  className="button is-light is-fullwidth mt-2"
                  onClick={toggleEditProfile}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h2 className="title is-4">{username}</h2>
                <p className="subtitle is-6">Email: {email}</p>
                <p className="subtitle is-6">{bio}</p>
                <button className="button is-info" onClick={toggleEditProfile}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional: Avatar Selection Popup */}
      {showAvatarSelection && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setShowAvatarSelection(false)}
          ></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Choose an Avatar</p>
              <button
                className="delete"
                onClick={() => setShowAvatarSelection(false)}
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <p>Avatar selection functionality will be added here.</p>
            </section>
          </div>
        </div>
      )}

      <div className="buttons is-centered mt-4">
        <button className="button is-danger" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
