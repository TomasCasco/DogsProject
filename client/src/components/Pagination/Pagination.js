import React from "react";
import createPagination from "./createPagination";
import Dog from '../Dog/Dog';
import "./Pagination.css";

export default function Pagination({response}) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { pagination } = createPagination({
    numberOfArticles: response.length,
    articlesPerPage: 8,
    numberOfButtons: 8,
    currentPage
  });

  const handleClick = page => setCurrentPage(page);
  let dogs =response.slice((currentPage-1)*8, (currentPage-1)*8+8)
  return (
    <>  
    <ul className='container'>
        { 
        Array.isArray(dogs)?
                dogs?.map( dog =>(
                        <li className='dog' key={dog.id}>
                          <Dog dog={dog}/>
                              </li>
        ))
        :
        <h3>{response}</h3>
        }
    </ul>
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          previous
        </li>
        {pagination.map(page => (
          <li
            className={`${currentPage === page && "active"}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          next
        </li>
      </ul>
    </div>
    </>
  );
}
