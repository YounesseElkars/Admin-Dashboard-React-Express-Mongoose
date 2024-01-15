import Container from '@/components/ui/Container';
import { ModeToggle } from '../ui/mode-toggle';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-16 w-full">
      <Container>
        <div className="flex h-full items-center justify-between">
          <Link to={'/'}>
            <Button variant={'link'}>Home </Button>
          </Link>
          <div>
            <Link to={'/about'}>
              <Button variant={'link'}>About</Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <Link to={'/login'}>
              <Button variant={'link'}>Login</Button>
            </Link>
            <Link to={'/register'}>
              <Button variant={'link'}>Register</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
