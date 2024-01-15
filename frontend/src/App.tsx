import Navbar from './components/sections/Navbar';
import Container from './components/ui/Container';

const App = () => {
  return (
    <>
      <Navbar />

      {/* Content */}
      <div className="h-16 w-full">
        <Container>
          <h1 className="w-full text-center text-3xl font-semibold">Express - Redux App</h1>
        </Container>
      </div>
    </>
  );
};

export default App;
