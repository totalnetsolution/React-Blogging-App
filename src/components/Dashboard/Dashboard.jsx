import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'blogs'), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsArray = [];
        querySnapshot.forEach((doc) => {
          postsArray.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsArray);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'blogs', postId));
        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Error deleting post: ', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {currentUser?.displayName}</h2>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <Link to="/create-post" className="btn btn-primary mb-4">Create New Post</Link>

      {posts.length === 0 ? (
        <p>You have no posts yet. Start by creating one!</p>
      ) : (
        <div className="list-group">
          {posts.map((post) => (
            <div key={post.id} className="list-group-item">
              <h5>{post.title}</h5>
              <p>{post.body.slice(0, 150)}...</p>
              <p className="text-muted">Published on {new Date(post.createdAt.toDate()).toLocaleDateString()}</p>
              <div className="d-flex">
                <Link to={`/edit-post/${post.id}`} className="btn btn-primary me-2">Edit</Link>
                <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
