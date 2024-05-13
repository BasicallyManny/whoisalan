import { useState, useRef, useEffect } from 'react';
//Icon Imports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AiFillFolder, AiFillYoutube, AiFillFileText, AiOutlineDesktop, AiTwotoneTool } from "react-icons/ai";
//Import background image
import windowsBG from "../assets/windowsBG.jpg"
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

const Homepage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-cover" style={{ backgroundImage: `url(${windowsBG})` }}>
            <Draggable initialPos={{ x: 100, y: 200 }}>
                <div className="my-draggable" style={{ border: '2px solid #aa5', padding: '10px' }}>
                    Drag Me! See how children are passed through to the div!
                </div>
            </Draggable>
            <Draggable initialPos={{ x: 100, y: 200 }}>
                <div className="my-draggable" style={{ border: '2px solid #aa5', padding: '10px' }}>
                    Drag Me! See how children are passed through to the div!
                </div>
            </Draggable>
            <Draggable initialPos={{ x: 100, y: 200 }}>
                <div className="my-draggable" style={{ border: '2px solid #aa5', padding: '10px' }}>
                    Drag Me! See how children are passed through to the div!
                </div>
            </Draggable>
        </div>
    );
};

export default Homepage;