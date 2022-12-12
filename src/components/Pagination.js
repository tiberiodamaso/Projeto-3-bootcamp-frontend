function Pagination(props) {

    const { currentPage, postsPerPage, totalPosts, paginate, nextPage, prevPage } = props;
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage)

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return ( 
        <div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              
              
              <li className={`page-item ${currentPage===1 ? "disabled" : ""}`}><span className="page-link" onClick={() => prevPage()} style={{cursor: "pointer"}}>Previous</span></li>
              
              
              {pageNumbers.map(num => (                        
                        
                        <li className={`page-item ${currentPage===num ? "active" : ""}`} key={num}>
                            <span onClick={() => paginate(num)} className="page-link" style={{cursor: "pointer"}}>{num}</span>
                        </li>
                    ))}

              <li className={`page-item ${currentPage===totalPages ? "disabled" : ""}`}><span className="page-link" onClick={() => nextPage()} style={{cursor: "pointer"}}>Next</span></li>
            </ul>
          </nav>
        </div>
     );
}

export default Pagination;