import Container from '@/components/ui/Container';
import { ModeToggle } from '../ui/mode-toggle';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { UseAppSelector } from '@/redux/store';
import { useLogoutMutation } from '@/redux/features/usersApiSlice';
import { logout } from '@/redux/features/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const { userInfo } = UseAppSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall('').unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-16 w-full">
      <Container>
        <div className="mt-4 flex h-full items-center justify-between p-4 shadow-md">
          <Link to={'/'}>
            <Button variant={'link'}>Home </Button>
          </Link>

          {userInfo ? (
            <div className="flex items-center justify-between">
              <Link to={'/profile'}>
                <Button variant={'link'}>profile</Button>
              </Link>
              <Button onClick={logoutHandler} variant={'link'}>
                Logout
              </Button>
              <ModeToggle />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Link to={'/login'}>
                <Button variant={'link'}>Login</Button>
              </Link>
              <Link to={'/register'}>
                <Button variant={'link'}>Register</Button>
              </Link>
              <ModeToggle />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
