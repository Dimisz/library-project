import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import ExploreTopBooks from './ExploreTopBooks';
import Carousel from './carousel/Carousel';
import Heros from './heros/Heros';
import LibraryServices from './library-services/LibraryServices';

const HomePage = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </>
  );
};

export default HomePage;
