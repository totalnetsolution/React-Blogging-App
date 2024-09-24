import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  // Greeting based on the time of day
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    if (currentHour < 22) return 'Good Evening';
    return 'Good Night';
  };

  useEffect(() => {
    // Fetch all blogs from Firestore, ordered by date
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogsArray = [];
      querySnapshot.forEach((doc) => {
        blogsArray.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(blogsArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mt-5">
      <h2>{getGreeting()}, Welcome to the Blog Platform!</h2>
      <div className="mt-4">
        {blogs.map((blog) => (
          <div className="card mb-3" key={blog.id}>
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.body.slice(0, 150)}...</p>
              <p className="text-muted">By {blog.author} on {new Date(blog.createdAt.toDate()).toLocaleDateString()}</p>
              <Link to={`/author/${blog.userId}`} className="btn btn-link">See all blogs from this author</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
