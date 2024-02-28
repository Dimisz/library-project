import CarouselBook from './CarouselBook';

import BookModel from '../../../models/BookModel';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../utils/LoadingSpinner';

const Carousel = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const baseUrl: string = 'http://localhost:8080/api/books';
    const url: string = `${baseUrl}?page=0&size=9`;
    console.log(`fetching from ${url}`);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const resData = data._embedded.books;
        setBooks(resData);
        setHttpError(null);
      })
      .catch((error: any) => {
        setHttpError(error.mesage);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <div
      className="container mt-5"
      style={{
        height: 550,
      }}
    >
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(0, 3).map((book) => {
                return <CarouselBook book={book} key={book.id} />;
              })}
            </div>
          </div>

          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(3, 6).map((book) => {
                return <CarouselBook book={book} key={book.id} />;
              })}
            </div>
          </div>

          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(6, 9).map((book) => {
                return <CarouselBook book={book} key={book.id} />;
              })}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <CarouselBook book={books[7]} />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <a className="btn btn-outline-secondary btn-lg" href="#">
          View More
        </a>
      </div>
    </div>
  );
};

export default Carousel;
