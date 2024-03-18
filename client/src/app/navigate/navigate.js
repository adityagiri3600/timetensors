import react, {FC} from "react";
import "./navigate.css";

const Navigate = ({handlePrev, handleNext}) => {
    
    return (
        <nav className={"nav-container"}>
            <button className={"prev nav-btn"} onPointerUp={handlePrev}>
                <span className="face">
                    <span className="nav-icon">{"◀"}</span> Prev
                </span>
            </button>
            <button className={"next nav-btn"} onPointerUp={handleNext}>
                <span className="face">
                    Next <span className="nav-icon">{"▶"}</span>
                </span>
            </button>
        </nav>
    )
};

export default Navigate;