import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user from localStorage
    localStorage.removeItem("user");

    // Reset user state if setUser is provided
    if (setUser) {
      setUser(null);
    }

    // Redirect to login page
    navigate('/user-login');
  }, [navigate, setUser]);

  return null; // No UI needed
}

export default UserLogout;
