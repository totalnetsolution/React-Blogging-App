import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'blogs'), {
        title: formData.title,
        body: formData.body,
        createdAt: new Date(),
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Post</h2> <br /> <br />
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Blog Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        /> 
        <br /> <br />
        <textarea
          placeholder="Write Your Blog Here"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          required
        /> 
        <br /> <br />
        <button type="submit" className="btn btn-success">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
