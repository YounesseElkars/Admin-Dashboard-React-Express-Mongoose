import { UseAppSelector } from '@/redux/store';
import Container from '../ui/Container';

const Home = () => {
  const { userInfo } = UseAppSelector((store) => store.auth);

  return (
    <div className="w-full">
      <Container>
        <h1 className="mt-20 w-full text-center text-3xl font-semibold">
          {userInfo ? <span> Hi {userInfo.name} 👋 </span> : <span>You need to login or register</span>}
        </h1>
      </Container>
    </div>
  );
};

export default Home;
