// components/Login.js
import { signInWithPopup, auth, provider } from '../../lib/firebase';

const Login = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
