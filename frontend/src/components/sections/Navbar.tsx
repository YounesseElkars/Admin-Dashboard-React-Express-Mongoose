import Container from '@/components/ui/Container';
import { ModeToggle } from '../ui/mode-toggle';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <div className="h-16 w-full">
      <Container>
        <div className="flex h-full items-center justify-between">
          <Button variant={'link'}>Home </Button>

          <div>
            <Button variant={'link'}>About</Button>
          </div>
          <div className="flex items-center justify-between">
            <Button variant={'link'}>Login</Button>
            <Button variant={'link'}>Register</Button>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
