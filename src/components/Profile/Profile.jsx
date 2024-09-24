import { useState } from 'react';
import { auth } from '../../firebase';
import { updateProfile, updatePassword } from 'firebase/auth';

const Profile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.displayName.split(' ')[0]);
  const [lastName, setLastName] = useState(user.displayName.split(' ')[1]);
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async () => {
    await updateProfile(user, { displayName: `${firstName} ${lastName}` });
    if (newPassword) {
      await updatePassword(user, newPassword);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div>
        <label>First Name</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label>New Password</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <button onClick={handleUpdate} className="btn btn-primary">Update</button>
    </div>
  );
};

export default Profile;
