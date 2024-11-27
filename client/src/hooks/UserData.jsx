import { useCookies } from 'react-cookie';

const UserData = () => {
  const [cookies] = useCookies(['user']);
  
  // Parse and return user data
//   console.log(cookies.user);
  
  const userData = cookies.user ? cookies.user : null;
  
  // Check if user is logged in
  const isLoggedIn = Boolean(userData);

  return { userData, isLoggedIn };
};

export default UserData;
