// components/Logout.js
import { signOut, auth } from '../../lib/firebase';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#FFF',
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
      <button style={buttonStyle} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
