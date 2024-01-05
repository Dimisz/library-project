import './App.css';
import Footer from './layouts/footer/Footer';
import Carousel from './layouts/home-page/carousel/Carousel';
import ExploreTopBooks from './layouts/home-page/ExploreTopBooks';
import Heros from './layouts/home-page/heros/Heros';
import LibraryServices from './layouts/home-page/library-services/LibraryServices';
import Navbar from './layouts/navbar/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
      <Footer />
    </>
  );
};

export default App;
