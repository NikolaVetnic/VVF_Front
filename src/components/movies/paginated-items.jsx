import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesSelector } from "../../store/movie/selectors";
import { Items } from "./items";
import ReactPaginate from "react-paginate";
import { getMovies } from "../../store/movie/actions";
import { Col, Container, Row } from "react-bootstrap";

export default function PaginatedItems({
    itemsPerPage,
    searchTerm,
    genreFilter,
}) {
    const dispatch = useDispatch();

    const movies = useSelector(moviesSelector);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(movies.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(movies.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, movies]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % movies.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items
                movies={currentItems}
                searchTerm={searchTerm}
                genreFilter={genreFilter}
            />

            <hr />
            <Container>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
