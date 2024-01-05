import './App.css';
import Carousel from './layouts/home-page/carousel/Carousel';
import ExploreTopBooks from './layouts/home-page/ExploreTopBooks';
import Heros from './layouts/home-page/heros/Heros';
import Navbar from './layouts/navbar/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
    </>
  );
};

export default App;
