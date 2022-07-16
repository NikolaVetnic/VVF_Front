import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CommentCard } from "./comment-card";

import {
    selectedCommentsSelector,
    selectedMovieSelector,
} from "../../store/movie/selectors";
import CreateCommentForm from "../forms/create-comment-form";
import { userDataSelector } from "../../store/auth/selectors";

export const Comments = () => {
    const comments = useSelector(selectedCommentsSelector);

    const authenticatedUser = useSelector(userDataSelector);
    const selectedMovie = useSelector(selectedMovieSelector);

    const startingCount = 1;
    const [count, setCount] = useState(startingCount);

    const handleLoadMore = () => {
        setCount(count + 1);
        console.log("count : " + count);
    };

    if (comments !== undefined)
        return (
            <Container>
                <Row>
                    <h3>Comments</h3>
                </Row>

                <CreateCommentForm
                    userId={authenticatedUser.id}
                    movieId={selectedMovie.id}
                />

                {comments.slice(0, count).map((comment) => {
                    return (
                        <CommentCard
                            key={comment.id}
                            user={comment.user}
                            content={comment.content}
                            date={comment.created_at}
                        />
                    );
                })}

                {count < comments.length ? (
                    <Button
                        variant="success"
                        as="input"
                        size="lg"
                        type="button"
                        onClick={handleLoadMore}
                        value={`Load ${startingCount} More`}
                        style={{
                            width: "12rem",
                            marginTop: "1rem",
                        }}
                    />
                ) : (
                    <></>
                )}
            </Container>
        );
    else return <Container>AA</Container>;
};
