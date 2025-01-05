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
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#4285F4',
      color: 'white',
    };
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    };
    return (
      <div >
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  export default Logout;
