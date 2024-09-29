import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2> <br /> <br />
      <form onSubmit={handleLogin}> 
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /> <br /> <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /> <br /> <br />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
