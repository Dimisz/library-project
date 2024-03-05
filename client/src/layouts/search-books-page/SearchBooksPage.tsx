import { useState, useEffect } from 'react';
import BookModel from '../../models/BookModel';
import LoadingSpinner from '../utils/LoadingSpinner';
import SearchBook from './components/SearchBook';
import Pagination from '../utils/Pagination';

export default function SearchBooksPage() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [categorySelection, setCategorySelection] = useState('Book category');

  useEffect(() => {
    const baseUrl: string = 'http://localhost:8080/api/books';
    const url: string =
      searchUrl === ''
        ? `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`
        : `${baseUrl}${searchUrl}`.replace(
            '<pageNumber>',
            `${currentPage - 1}`
          );

    console.log(`fetching from ${url}`);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetchedBooks = data._embedded.books;
        setBooks(fetchedBooks);
        const pageData = data.page;
        setTotalAmountOfBooks(pageData.totalElements);
        setTotalPages(pageData.totalPages);

        setHttpError(null);
      })
      .catch((error: any) => {
        setHttpError(error.mesage);
      })
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

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

  const handleSearchInputChange = () => {
    setCurrentPage(1);
    if (search === '') {
      setSearchUrl('');
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
      );
      setCategorySelection('Book Selection');
    }
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    const lowerCasedValue = value.toLowerCase();
    if (
      lowerCasedValue === 'fe' ||
      lowerCasedValue === 'be' ||
      lowerCasedValue === 'data' ||
      lowerCasedValue === 'devops'
    ) {
      setCategorySelection(lowerCasedValue);
      setSearchUrl(
        `/search/findByCategory?category=${lowerCasedValue}&page=<pageNumber>&size=${booksPerPage}`
      );
    } else {
      setCategorySelection('All');
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
    }
  };

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                aria-labelledby="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                onClick={handleSearchInputChange}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {categorySelection}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li onClick={() => categoryField('All')}>
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
                <li onClick={() => categoryField('fe')}>
                  <a className="dropdown-item" href="#">
                    Frontend
                  </a>
                </li>
                <li onClick={() => categoryField('be')}>
                  <a className="dropdown-item" href="#">
                    Backend
                  </a>
                </li>
                <li onClick={() => categoryField('data')}>
                  <a className="dropdown-item" href="#">
                    Data
                  </a>
                </li>
                <li onClick={() => categoryField('devops')}>
                  <a className="dropdown-item" href="#">
                    DevOps
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {totalAmountOfBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results ({totalAmountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks}{' '}
                items:
              </p>
              {books.map((book) => {
                return <SearchBook book={book} key={book.id} />;
              })}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Library Services
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
