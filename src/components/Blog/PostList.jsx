import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = auth.currentUser;

useEffect(() => {
  if (currentUser) {
    const q = query(collection(db, 'blogs'), where('userId', '==', currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsArray);
    });
    return () => unsubscribe();
  }
}, [currentUser]);

const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
};

  return (
    <div className="container mt-5">
      <h2>Your Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <div className="list-group">
          {posts.map((post) => (
            <div key={post.id} className="list-group-item">
              <h5>{post.title}</h5>
              <p>{post.body.slice(0, 100)}...</p>
              <p className="text-muted">Published on {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
              <div>
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


export default PostList;
