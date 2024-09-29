import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'; 
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const postsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
        setLoading(false);
      },
      (err) => {
        setError('Error fetching posts: ' + err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'blogs', postId));
        alert('Post deleted successfully!');
      } catch (err) {
        alert('Error deleting post: ' + err.message);
      }
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;
  if (posts.length === 0) return <p>No posts found.</p>;

  return (
    <div className="container mt-5">
      <h2>Your Posts</h2>
      <Link to="/create-post" className="btn btn-primary mb-3">Create New Post</Link>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            <h5>{post.title}</h5>
            <p>{post.body.slice(0, 100)}...</p>
            <Link to={`/edit-post/${post.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
            <button className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
