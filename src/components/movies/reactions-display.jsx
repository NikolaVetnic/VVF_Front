import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../store/auth/selectors";
import { postReaction } from "../../store/movie/actions";
import { viewedSelector } from "../../store/movie/selectors";
import { useSocket } from "../../sockets/socket-hook";

export const ReactionsDisplay = () => {
    const dispatch = useDispatch();

    const { id: user_id } = useSelector(userDataSelector);
    const { id: movie_id, likes, dislikes } = useSelector(viewedSelector);

    const socket = io.connect("http://127.0.0.1:6379");

    useSocket({
        type: "NEW_COMMENT",
        callBack: (payload) => {
            console.log(payload);
        },
    });

    const handleLike = () => {
        dispatch(
            postReaction({
                user_id,
                movie_id,
                reaction: "like",
            })
        );
    };

    const handleDislike = () => {
        dispatch(
            postReaction({
                user_id,
                movie_id,
                reaction: "dislike",
            })
        );
    };

    return (
        <Container className="w-75">
            <Row>
                <Col>
                    <Button variant="outline-primary" onClick={handleDislike}>
                        Dislike ({dislikes})
                    </Button>{" "}
                </Col>
                <Col>
                    <Button variant="outline-primary" onClick={handleLike}>
                        Like ({likes})
                    </Button>{" "}
                </Col>
            </Row>
        </Container>
    );
};
