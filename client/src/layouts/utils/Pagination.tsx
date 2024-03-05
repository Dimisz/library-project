interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: any;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const pageNumbers = [];
  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }
  return (
    <nav aria-label="....">
      <ul className="pagination">
        <li className="page-item" onClick={() => props.paginate(1)}>
          <button className="page-link">First Link</button>
        </li>
        {pageNumbers.map((num) => (
          <li
            key={num}
            onClick={() => props.paginate(num)}
            className={
              'page-item' + (props.currentPage === num ? 'active' : '')
            }
          >
            <button className="page-link">{num}</button>
          </li>
        ))}
        <li
          className="page-item"
          onClick={() => props.paginate(props.totalPages)}
        >
          <button className="page-link">Last Page</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
