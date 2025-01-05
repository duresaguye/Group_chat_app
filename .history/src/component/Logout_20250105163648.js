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
      backgroundColor: '#4285F4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px'
    };
  
    return (
      <div>
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  export default Logout;
