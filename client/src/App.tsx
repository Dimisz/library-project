import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './layouts/footer/Footer';
import HomePage from './layouts/home-page/HomePage';
import Navbar from './layouts/navbar/Navbar';
import SearchBooksPage from './layouts/search-books-page/SearchBooksPage';
import BookCheckoutPage from './layouts/book-checkout/BookCheckout';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooksPage />
          </Route>
          <Route path="/checkout/:bookId">
            <BookCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
