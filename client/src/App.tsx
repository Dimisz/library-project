import './App.css'
import Carousel from './layouts/home-page/Carousel'
import ExploreTopBooks from './layouts/home-page/ExploreTopBooks'
import Navbar from './layouts/navbar/Navbar'

const App = () => {

  return (
   <>
     <Navbar />
     <ExploreTopBooks/>
     <Carousel/>
   </>
  )
}

export default App
