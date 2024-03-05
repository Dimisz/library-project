import { useEffect, useState } from 'react';
import BookModel from '../../models/BookModel';
import LoadingSpinner from '../utils/LoadingSpinner';

import defaultBookImage from '../../Images/BooksImages/book-luv2code-1000.png';
import StarsReview from '../utils/StarsReview';
import CheckoutAndReviewBox from './CheckoutAndReviewBox';

const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const bookId = window.location.pathname.split('/')[2];

  useEffect(() => {
    const url: string = `http://localhost:8080/api/books/${bookId}`;

    console.log(`fetching from ${url}`);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setHttpError(null);
      })
      .catch((error: any) => {
        setHttpError(error.mesage);
      })
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
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
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="Book" />
            ) : (
              <img src={defaultBookImage} width="226" height="349" alt="Book" />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2 ">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={4.7} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="Book" />
          ) : (
            <img src={defaultBookImage} width="226" height="349" alt="Book" />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={4.7} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} mobile={true} />
        <hr />
      </div>
    </div>
  );
};

export default BookCheckoutPage;
