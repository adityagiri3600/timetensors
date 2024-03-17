import React from "react";

function Icon(props) {
    const src = "/" + props.class + ".png";
    return (
        <div className="icon">
            <img src={src} alt="" width={50} height={50} />
        </div>
    );
}

export default Icon;