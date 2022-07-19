import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CommentCard } from "./comment-card";

import { commentsSelector, viewedSelector } from "../../store/movie/selectors";
import CreateCommentForm from "../forms/create-comment-form";
import { userDataSelector } from "../../store/auth/selectors";
import {
    DEFAULT_COMMENT_DISPLAY_INC,
    DEFAULT_STARTING_COMMENT_DISPLAY_NUM,
} from "../../constants";

export const Comments = () => {
    const comments = useSelector(commentsSelector);

    const authenticatedUser = useSelector(userDataSelector);
    const viewed = useSelector(viewedSelector);

    const startingCount = DEFAULT_STARTING_COMMENT_DISPLAY_NUM;
    const [count, setCount] = useState(startingCount);

    const handleLoadMore = () => {
        setCount(count + DEFAULT_COMMENT_DISPLAY_INC);
    };

    return (
        <Container className="justify-content-md-center">
            <Row>
                <h3>Comments</h3>
            </Row>

            <CreateCommentForm
                user_id={authenticatedUser.id}
                movie_id={viewed.id}
            />

            {comments?.slice(0, count).map((comment) => {
                return (
                    <CommentCard
                        key={comment.id}
                        user={comment.user}
                        movie={viewed.title}
                        content={comment.content}
                        date={comment.created_at}
                    />
                );
            })}

            {count < comments.length ? (
                <Button
                    className="w-50 m-4"
                    variant="success"
                    as="input"
                    size="lg"
                    type="button"
                    onClick={handleLoadMore}
                    value={`Load ${DEFAULT_COMMENT_DISPLAY_INC} More`}
                />
            ) : (
                <></>
            )}
        </Container>
    );
};
