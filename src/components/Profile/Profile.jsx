// src/components/Profile/Profile.jsx
import { useState } from 'react';
import { auth } from '../../firebase';
import { updateProfile, updatePassword } from 'firebase/auth';

const Profile = () => {
  const currentUser = auth.currentUser;
  const [firstName, setFirstName] = useState(currentUser?.displayName?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(currentUser?.displayName?.split(' ')[1] || '');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(currentUser, { displayName: `${firstName} ${lastName}` });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage(`Error updating profile: ${error.message}`);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword) {
      try {
        await updatePassword(currentUser, newPassword);
        setMessage('Password updated successfully');
      } catch (error) {
        setMessage(`Error updating password: ${error.message}`);
      }
    } else {
      setMessage('Please enter a new password');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleProfileUpdate}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
      <form onSubmit={handlePasswordUpdate} className="mt-4">
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Password</button>
      </form>
    </div>
  );
};

export default Profile;
