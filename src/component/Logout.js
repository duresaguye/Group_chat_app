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

    
  
    return (
      <div className="flex justify-end">
        <button 
          onClick={handleLogout} 
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Logout
        </button>
      </div>
        );
  };

  export default Logout;
