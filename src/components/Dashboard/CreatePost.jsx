import { useState } from 'react';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const CreatePost = ({ user }) => {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.length < 5 || formData.body.length < 100) {
      alert("Blog title must be between 5-50 characters, and body between 100-3000 characters.");
      return;
    }
    try {
      await addDoc(collection(db, 'blogs'), {
        ...formData,
        author: user.displayName,
        userId: user.uid,
        createdAt: new Date(),
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" required minLength="5" maxLength="50" />
        <textarea name="body" value={formData.body} onChange={handleChange} placeholder="Blog Body" rows="5" required minLength="100" maxLength="3000"></textarea>
        <button type="submit" className="btn btn-success">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
