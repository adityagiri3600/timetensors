const GlowingBorder = ({
    children,
    width,
    height,
    color1,
    color2="transparent",
    backgroundColour="transparent",
    id,
    animation,
    style,
    className,
}) => {
    const square = `
            @keyframes ${id}-moveRed {
                0% { cx: 100%; cy: 100%; }
                25% { cx: 0%; cy: 100%; }
                50% { cx: 0%; cy: 0%; }
                75% { cx: 100%; cy: 0%; }
                100% { cx: 100%; cy: 100%; }
            }
            @keyframes ${id}-moveBlue {
                0% { cx: 0%; cy: 0%; }
                25% { cx: 100%; cy: 0%; }
                50% { cx: 100%; cy: 100%; }
                75% { cx: 0%; cy: 100%; }
                100% { cx: 0%; cy: 0%; }
            }
          `;

    const staticc = `
            @keyframes ${id}-moveRed {
                0% { cx: 0%; cy: 0%; }
                100% { cx: 0%; cy: 0%; }
            }
            @keyframes ${id}-moveBlue {
                0% { cx: 100%; cy: 100%; }
                100% { cx: 100%; cy: 100%; }
            }
            `;

    const animationStyle = animation === "square" ? square : staticc;

    return (
        <div className={`btn-press ${className}`} style={{...style}}>
            <div
                style={{
                    filter: "blur(10px)",
                    position: "absolute",
                    zIndex: "-1",
                    opacity: "0.5",
                }}
            >
                <svg
                    style={{
                        position: "absolute",
                        zIndex: "-1",
                        width: `${width}px`,
                        height: `${height}px`,
                        borderRadius: "5px",
                    }}
                >
                    <defs>
                        <radialGradient id={`${id}-redGradient`}>
                            <stop offset="0%" stopColor={color1} />
                            <stop offset="100%" stopColor={backgroundColour} />
                        </radialGradient>
                        <radialGradient id={`${id}-blueGradient`}>
                            <stop offset="0%" stopColor={color2} />
                            <stop offset="100%" stopColor={backgroundColour} />
                        </radialGradient>
                        <filter
                            id="blurFilter"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                        >
                            <feGaussianBlur stdDeviation="5" />
                        </filter>
                        <style>
                            {`
            ${animationStyle}
            #${id}-redCircle {
              animation: ${id}-moveRed 8s infinite;
              filter: saturate(1);
            }
            #${id}-blueCircle {
              animation: ${id}-moveBlue 8s infinite;
              filter: saturate(1);
            }
          `}
                        </style>
                    </defs>

                    <g filter="url(#blurFilter)" clipPath="url(#textClip)">
                        <circle
                            id={`${id}-redCircle`}
                            cx="50"
                            cy="50"
                            r="50"
                            fill={`url(#${id}-redGradient)`}
                            style={{ mixBlendMode: "screen" }}
                        />
                        <circle
                            id={`${id}-blueCircle`}
                            cx="50"
                            cy="50"
                            r="50"
                            fill={`url(#${id}-blueGradient)`}
                            style={{ mixBlendMode: "screen" }}
                        />
                    </g>
                </svg>
            </div>
            <svg
                style={{
                    position: "absolute",
                    zIndex: "-1",
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: "5px",
                }}
            >
                <defs>
                    <radialGradient id={`${id}-redGradient`}>
                        <stop offset="0%" stopColor={color1} />
                        <stop offset="100%" stopColor={backgroundColour} />
                    </radialGradient>
                    <radialGradient id={`${id}-blueGradient`}>
                        <stop offset="0%" stopColor={color2} />
                        <stop offset="100%" stopColor={backgroundColour} />
                    </radialGradient>
                    <filter
                        id="blurFilter"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                    >
                        <feGaussianBlur stdDeviation="5" />
                    </filter>
                    <style>
                        {`
            ${animationStyle}
            #${id}-redCircle {
              animation: ${id}-moveRed 8s infinite;
              filter: saturate(1);
            }
            #${id}-blueCircle {
              animation: ${id}-moveBlue 8s infinite;
              filter: saturate(1);
            }
          `}
                    </style>
                </defs>

                <g filter="url(#blurFilter)" clipPath="url(#textClip)">
                    <circle
                        id={`${id}-redCircle`}
                        cx="50"
                        cy="50"
                        r="50"
                        fill={`url(#${id}-redGradient)`}
                        style={{ mixBlendMode: "screen" }}
                    />
                    <circle
                        id={`${id}-blueCircle`}
                        cx="50"
                        cy="50"
                        r="50"
                        fill={`url(#${id}-blueGradient)`}
                        style={{ mixBlendMode: "screen" }}
                    />
                </g>
            </svg>
            {children}
        </div>
    );
};

export default GlowingBorder;
