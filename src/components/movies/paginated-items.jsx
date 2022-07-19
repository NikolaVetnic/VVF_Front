import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getMovies } from "../../store/movie/actions";
import { Items } from "./items";
import { moviesSelector } from "../../store/movie/selectors";
import ReactPaginate from "react-paginate";

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
        if (!!movies) {
            setCurrentItems(
                movies
                    .filter((movie) =>
                        searchTerm === ""
                            ? true
                            : movie.title
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                    )
                    .filter((movie) =>
                        genreFilter === "all"
                            ? true
                            : movie.genre === genreFilter
                    )
                    .slice(itemOffset, endOffset)
            );
            setPageCount(Math.ceil(movies.length / itemsPerPage));
        }
    }, [genreFilter, itemOffset, itemsPerPage, movies, searchTerm]);

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
                    {/* ovo cu najverovatnije skroz izbacivati pa nisam ni dirao */}
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
