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
    };

    return (
      <div>
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  export default Logout;
