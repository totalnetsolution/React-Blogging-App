import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile'; 
import PrivateRoute from './utils/PrivateRoute';
import CreatePost from './components/Blog/CreatePost';
import EditPost from './components/Blog/EditPost';
import PostList from './components/Blog/PostList';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/create-post" element={<PrivateRoute element={CreatePost} />} />
        <Route path="/edit-post/:id" element={<PrivateRoute element={EditPost} />} />
        <Route path="/post-list/:id" element={<PrivateRoute element={PostList} />} />
      </Routes>
    </>
  );
}

export default App;