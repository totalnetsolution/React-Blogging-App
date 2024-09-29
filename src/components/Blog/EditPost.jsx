import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditPost = () => {
  const { id } = useParams();  
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'blogs', id);  
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({
            title: docSnap.data().title,
            body: docSnap.data().body
          });
          setLoading(false);
        } else {
          setError('Post not found');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'blogs', id);
      await updateDoc(docRef, {
        title: formData.title,
        body: formData.body,
        updatedAt: new Date(),
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Error updating post');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdatePost}>
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
        <button type="submit" className="btn btn-success">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
