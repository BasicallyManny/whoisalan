import { useState, useRef, useEffect } from 'react';
//Icon Imports
import { AiFillFolder, AiFillYoutube, AiOutlineDesktop, AiTwotoneTool } from "react-icons/ai";
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
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const GallaryModal: React.FC<ModalProps> = ({ show, onHide }) => {
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
                    Gallery of my recent works
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const YoutubeModal: React.FC<ModalProps> = ({ show, onHide }) => {
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
                    Preview of my youtube page
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ToolsModal: React.FC<ModalProps> = ({ show, onHide }) => {
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
                    Tools
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    A list of tools/skills/technologies I use
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const Homepage: React.FC = () => {
    //modal useStates
    const [aboutMeShow, setAboutMe] = useState(false);
    const [youTubeShow, setYouTube] = useState(false);
    const [gallaryShow, setGallary] = useState(false);
    const [toolsShow, setTools] = useState(false);

    return (
        <div className="flex items-center justify-center h-screen bg-cover" style={{ backgroundImage: `url(${windowsBG})` }}>
            {/**About Me Modal */}
            <Draggable initialPos={{ x: 100, y: 200 }}>
                <div id="my-draggable" className='p-2.5'>
                    <Button className="bg-transparent border-0" onDoubleClick={() => setAboutMe(true)}>
                        <AiFillFolder size={70} style={{ color: 'rgb(234, 179, 8)' }}></AiFillFolder>
                        <h5>About Me</h5>
                    </Button>
                </div>
                <AboutMeModal show={aboutMeShow} onHide={() => setAboutMe(false)} />
            </Draggable>

            {/**Gallary Modal */}
            <Draggable initialPos={{ x: 150, y: 250 }}>
                <div id="my-draggable" className='p-2.5'>
                    <Button className="bg-transparent border-0" onDoubleClick={() => setGallary(true)}>
                        <AiOutlineDesktop size={70} style={{ color: "black" }} ></AiOutlineDesktop>
                        <h5>Gallary</h5>
                    </Button>
                </div>
                <GallaryModal show={gallaryShow} onHide={() => setGallary(false)} />
            </Draggable>

            {/**Youtube Modal */}
            <Draggable initialPos={{ x: 200, y: 100 }}>
                <div id="my-draggable" className='p-2.5'>
                    <Button className="bg-transparent border-0" onDoubleClick={() => setYouTube(true)}>
                        <AiFillYoutube size={70} style={{ color: "red" }}></AiFillYoutube>
                        <h5>YouTube</h5>
                    </Button>
                </div>
                <YoutubeModal show={youTubeShow} onHide={() => setYouTube(false)} />
            </Draggable>

            {/**Tools Modal */}
            <Draggable initialPos={{ x: 250, y: 150 }}>
                <div id="my-draggable" className='p-2.5'>
                    <Button className="bg-transparent border-0" onDoubleClick={() => setTools(true)}>
                        <AiTwotoneTool size={70} style={{ color: 'gray' }}></AiTwotoneTool>
                        <h5>Tools</h5>
                    </Button>
                </div>
                <ToolsModal show={toolsShow} onHide={() => setTools(false)} />
            </Draggable>

        </div>
    );
}

export default Homepage;
