import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditPost = () => {
  const { id } = useParams();  // Get the post ID from the URL params
  const [formData, setFormData] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchPost();
  }, [id]);

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
      const docRef = doc(db, 'blogs', id);
      await updateDoc(docRef, {
        title: formData.title,
        body: formData.body,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Blog Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            minLength="5"
            maxLength="50"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Blog Body</label>
          <textarea
            className="form-control"
            id="body"
            name="body"
            rows="5"
            value={formData.body}
            onChange={handleChange}
            minLength="100"
            maxLength="3000"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
