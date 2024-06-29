import React, { useState } from "react";
import * as tbIcons from 'react-icons/tb';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import styles from "./IconSelector.module.css";

const IconSelector = ({ selectedIconProp, setIcon, iconCount = 25 }) => {
    const iconPacks = {...tbIcons, ...FaIcons, ...AiIcons, ...GiIcons};
    const [selectedIcon, setSelectedIcon] = useState(selectedIconProp);
    const [search, setSearch] = useState("");

    const handleIconClick = (icon) => {
        setIcon(icon);
        setSelectedIcon(icon);
    };

    const filteredIcons = Object.keys(iconPacks)
        .filter((iconName) =>
            iconName
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .slice(0, iconCount);

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search icons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {selectedIcon && (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                        {React.createElement(iconPacks[selectedIcon], {
                            size: 48,
                        })}
                    </div>
                    <div onClick={() => handleIconClick(null)}>Clear</div>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "10px",
                    maxHeight: "300px",
                    overflow: "scroll",
                }}
            >
                {filteredIcons.map((iconName, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                border:
                                    selectedIcon === iconName
                                        ? "2px solid blue"
                                        : "2px solid transparent",
                                padding: "3px",
                                cursor: "pointer",
                            }}
                            onClick={() => handleIconClick(iconName)}
                        >
                            {iconPacks[iconName] &&
                                React.createElement(iconPacks[iconName], {
                                    size: 20,
                                })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const icon = (iconName) => {
    const iconPacks = {...tbIcons, ...FaIcons, ...AiIcons, ...GiIcons};
    if (!iconPacks[iconName]) {
        return null;
    }
    return React.createElement(iconPacks[iconName], {
        size: 20,
    });
}

export default IconSelector;
export { icon };
