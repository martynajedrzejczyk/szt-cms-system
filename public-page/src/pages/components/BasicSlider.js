import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import "./styles.css";

const HeroBanner = ({ title, description, images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((currentImage) => (currentImage + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="herobanner-container">
            <img src={`http://localhost:5000/image?name=${images[currentImage]}`} alt="Hero Banner" className="hero-image" />
            <div className="herobanner-text">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default HeroBanner;

HeroBanner.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
};