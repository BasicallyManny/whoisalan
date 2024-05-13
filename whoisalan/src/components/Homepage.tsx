import { useState, useRef, useEffect } from 'react';
//Icon Imports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AiFillFolder, AiFillYoutube, AiFillFileText, AiOutlineDesktop, AiTwotoneTool } from "react-icons/ai";
//Import background image
import windowsBG from "../assets/windowsBG.jpg"
//Import Bootstrap Components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrap styles


//add draggable div logic
const Draggable: React.FC<{ initialPos: { x: number; y: number }; children: React.ReactNode }> = ({ initialPos, children }) => {
    const [pos, setPos] = useState<{ x: number; y: number }>(initialPos);
    const [dragging, setDragging] = useState<boolean>(false);
    const [rel, setRel] = useState<{ x: number; y: number } | null>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Only left mouse button
        if (e.button !== 0 || !divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setRel({
            x: e.pageX - rect.left,
            y: e.pageY - rect.top
        });
        setDragging(true);

        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseUp = (e: MouseEvent) => {
        setDragging(false);
        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!dragging || !rel) return;

        setPos({
            x: e.pageX - rel.x,
            y: e.pageY - rel.y
        });

        e.stopPropagation();
        e.preventDefault();
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dragging]);

    return (
        <div
            ref={divRef}
            onMouseDown={onMouseDown}
            style={{
                position: 'absolute',
                left: pos.x + 'px',
                top: pos.y + 'px',
                cursor: dragging ? 'grabbing' : 'grab'
            }}
        >
            {children}
        </div>
    );
};

interface ModalProps {
    show: boolean;
    onHide: () => void;
}

//Modal Scripts
const AboutMeModal: React.FC<ModalProps> = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    About Me
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    HELLO MY MY NAME IS ALAN 
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button varaint="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const Homepage: React.FC = () => {
    //modal useStates
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="flex items-center justify-center h-screen bg-cover" style={{ backgroundImage: `url(${windowsBG})` }}>
            <Draggable initialPos={{ x: 100, y: 200 }}>
                <div className="my-draggable" className='p-2.5'>
                    <Button className="bg-transparent border-0" onDoubleClick={() => setModalShow(true)}>
                        <AiFillFolder size={70} style={{ color: 'rgb(234, 179, 8)' }}></AiFillFolder>
                        <h5>About Me</h5>
                    </Button>
                </div>
                <AboutMeModal show={modalShow} onHide={() => setModalShow(false)} />
            </Draggable>
        </div>
    );
}

export default Homepage;
