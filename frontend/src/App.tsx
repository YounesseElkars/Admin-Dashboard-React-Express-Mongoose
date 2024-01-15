import { Outlet } from 'react-router-dom';
import Navbar from './components/sections/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
