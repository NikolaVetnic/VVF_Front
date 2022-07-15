import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CustomModal({ data }) {
    const { title, message, buttonCaption, onHide, path, ...rest } = data;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onHideAction = () => {
        dispatch(onHide({ ...data, show: false }));
        navigate(path);
    };

    return (
        <>
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHideAction}>{buttonCaption}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
