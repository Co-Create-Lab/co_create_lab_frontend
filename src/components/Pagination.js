import ReactPaginate from 'react-paginate';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pagination ({totalCount, setProjects, setLoadingSpinner}) {
    const navigate = useNavigate();

    const [offset, setOffset] = useState(0);
     // offset on first click = 2nd page

    const pageCount = Math.ceil(totalCount/5)
    // to calculate the needed number of pages 
    // pageCount will be set as an attribute in the return

    const fetchNewPage = (offset) => {
    setLoadingSpinner(true)
    axios
    .get(`http://localhost:8080/projects/paginate?offset=${offset}&limit=5`)
    .then((response) => {
        setProjects(response.data.project)
        setLoadingSpinner(false)

    })
    .catch((err) => {
        console.log(err)
        setLoadingSpinner(false)
    navigate('/404')
    })
   }

    const handlePageClick = (e) => {
        let newOffset = (e.selected) * 5 // offset = 5 -> multiple page number = new offset
        console.log(newOffset)
        fetchNewPage(newOffset)
        setOffset(newOffset)
    }

    console.log(pageCount)


    return(
        <>
        <ReactPaginate
        previousLabel={'<<'} // which word for back
        nextLabel={'>>'} // which word for next
        breakLabel={'...'} // how the break looks like
        pageCount={pageCount} // how many pages
        // marginPagesDisplayed={2} // how many pages after breakLabel
        pageRangeDisplayed={5} // how many pages between breakLabel
        onPageChange={handlePageClick}
        containerClassName={'pagination pagination-sm justify-content-center'} // className for Container STYLING FROM BOOTSTRAP
        pageClassName={'page-item'} // className for item
        pageLinkClassName={'page-link'} // className for link
        previousClassName={'page-item'} // className for previous button
        previousLinkClassName={'page-link'}// className for previous link
        nextClassName={'page-item'} // className for next button
        nextLinkClassName={'page-link'}// className for next link
        breakClassName={'page-item'} // className for break button
        breakLinkClassName={'page-link'}// className for break link
        activeClassName={''} // className for active page
        // renderOnZeroPageCount={null}
        hrefAllControls={true}
        forcePage={9}

        />
        </>

    )
}