import React, { useState, useRef, useEffect } from 'react';

const Carousel = ({ children, transitionTime, getIndex, onChange, thresholdFraction, loopback }) => {

    transitionTime = transitionTime || 0.3;
    thresholdFraction = thresholdFraction || 0.1;

    const childWrapper = useRef(null);
    const carouselRef = useRef(null);

    const [childWidth, setChildWidth] = useState(0);
    const [currentChildIndex, setCurrentChildIndex] = useState(1);
    const [index, setIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);


    useEffect(() => {
        if (childWrapper.current) {
            setChildWidth(childWrapper.current.clientWidth);
        }
    }, [childWrapper]);

    useEffect(() => {
        if (getIndex)
            getIndex(index);
        if (onChange)
            onChange(index);
    }, [index]);


    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    }

    const handleTouchMove = (e) => {
        carouselRef.current.style.transition = 'none';
        // if loopback is false, then the first and last children are not draggable to the left and right respectively
        if(loopback || (index > 0 && index < children.length - 1) || (touchStartX - e.touches[0].clientX > 0 && index === 0) || (touchStartX - e.touches[0].clientX < 0 && index === children.length - 1))
            carouselRef.current.style.transform = `translateX(-${currentChildIndex * childWidth + touchStartX - e.touches[0].clientX}px)`;
    }

    const handleTouchEnd = (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        carouselRef.current.style.transition = `transform ${transitionTime}s ease-in-out`;
        const threshold = thresholdFraction * childWidth;
        if (Math.abs(diff) < threshold) {
            carouselRef.current.style.transform = `translateX(-${currentChildIndex * childWidth}px)`;
        }
        else {
            if (diff > 0) {
                if (loopback || index < children.length - 1)
                    handleNext();
            } else if (diff < 0) {
                if (loopback || index > 0)
                    handlePrev();
            }
        }
    }



    const handleNext = () => {
        if (currentChildIndex < children.length + 1) {

            setCurrentChildIndex(currentChildIndex + 1);
            if (currentChildIndex === children.length) {
                setTimeout(() => {
                    carouselRef.current.style.transition = 'none';
                    setCurrentChildIndex(1);
                }, transitionTime * 1000);
            }
        }
        else {
            setCurrentChildIndex(0);
        }

        if (currentChildIndex === children.length) {
            setIndex(0);
        } else {
            setIndex(currentChildIndex);
        }

    }

    const handlePrev = () => {
        if (currentChildIndex > 0) {

            setCurrentChildIndex(currentChildIndex - 1);
            if (currentChildIndex === 1) {
                setTimeout(() => {
                    carouselRef.current.style.transition = 'none';
                    setCurrentChildIndex(children.length);
                }, transitionTime * 1000);
            }
        }
        else {
            setCurrentChildIndex(children.length + 1);
        }

        if (currentChildIndex === 1) {
            setIndex(children.length - 1);
        } else {
            setIndex(currentChildIndex - 2);
        }
    }

    return (
        <>
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    overflow: 'hidden',
                    width: `${childWidth}px`
                }}
            >
                <div
                    ref={carouselRef}
                    style={{
                        display: 'flex',
                        transform: `translateX(-${currentChildIndex * childWidth}px)`,
                        transition: `none`
                    }}
                >
                    <div ref={childWrapper}>
                        {children[children.length - 1]}
                    </div>
                    {React.Children.map(children, (child, index) => (
                        <div key={index} ref={childWrapper}>
                            {child}
                        </div>
                    ))}
                    <div ref={childWrapper}>
                        {children[0]}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Carousel;