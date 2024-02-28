import { useState, useEffect } from 'react';
import BookModel from '../../models/BookModel';
import LoadingSpinner from '../utils/LoadingSpinner';

export default function SearchBooksPage() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const baseUrl: string = 'http://localhost:8080/api/books';
    const url: string = `${baseUrl}?page=0&size=5`;
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
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-6">
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="search"
                aria-label="search"
              />
              <button className="btn btn-outline-success">Search</button>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id= ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
