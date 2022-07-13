import { Button, Modal } from "react-bootstrap";

export default function CustomModal(props) {
    const { title, message, buttonCaption, onHide, ...rest } = props.data;
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
                    <Button onClick={onHide}>{buttonCaption}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
