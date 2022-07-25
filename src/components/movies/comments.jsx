import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CommentCard } from "./comment-card";

import { commentsSelector, viewedSelector } from "../../store/movie/selectors";
import CreateCommentForm from "../forms/create-comment-form";
import { userDataSelector } from "../../store/auth/selectors";
import {
    DEFAULT_COMMENT_DISPLAY_INC,
    DEFAULT_STARTING_COMMENT_DISPLAY_NUM,
} from "../../constants";
import { useSocket } from "../../sockets/socket-hook";
import { getComments } from "../../store/movie/actions";
import { createSocketConnection } from "../../sockets/socket-service";

export const Comments = () => {
    const comments = useSelector(commentsSelector);

    const dispatch = useDispatch();

    const authenticatedUser = useSelector(userDataSelector);
    const viewed = useSelector(viewedSelector);

    const startingCount = DEFAULT_STARTING_COMMENT_DISPLAY_NUM;
    const [count, setCount] = useState(startingCount);

    const handleLoadMore = () => {
        setCount(count + DEFAULT_COMMENT_DISPLAY_INC);
    };

    useSocket({
        type: "NEW_COMMENT",
        callback: (payload) => {
            console.log(payload);
        },
    });

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

            {count < comments?.length ? (
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
