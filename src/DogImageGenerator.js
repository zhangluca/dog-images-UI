
import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './DogImageGenerator.css';

function DogImageGenerator() {
    const [number, setNumber] = useState(3);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); 

    const fetchDogImages = async () => {
        try {
            const response = await axios.post(`https://dog-images-2fa748890e13.herokuapp.com/generate_dogs/?number=${number}`);
           
            if (response.data && response.data.images) {
                setImages(response.data.images);
            } else {
            
                setImages([]);
                console.error('No images returned from the API');
            }
        } catch (err) {
            console.error('Error fetching images:', err);
            setImages([]); 
        }
    };

    // Function to extract breed name from URL
    const extractBreedName = (url) => {
        const match = url.match(/breeds\/([^/]+)/);
        if (match && match[1]) {
            return match[1].replace(/-/g, ' '); // Replace hyphens with spaces
        }
        return 'Unknown Breed';
    };

    const handleImageClick = (img) => {
        setSelectedImage(img); // Set the clicked image for full-screen view
    };

    const handleCloseFullScreen = () => {
        setSelectedImage(null); // Close the full-screen view
    };

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        centerMode: true, // Center the image in the slider
        centerPadding: '0', // Remove padding around the centered slide
    };

    return (
        <div>
            <h1>Dog Image Generator</h1>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
                min="1"
                max="8"
            />
            <button onClick={fetchDogImages}>Generate</button>
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div key={index} className="slider-slide">
                        <img src={img} alt="Dog" onClick={() => handleImageClick(img)} />
                        <div className="breed-name">{extractBreedName(img)}</div>
                    </div>
                ))}
            </Slider>
            {selectedImage && (
                <div className="modal" onClick={handleCloseFullScreen}>
                    <img src={selectedImage} alt="Full Size Dog" className="fullscreen-image" />
                </div>
            )}
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

export default DogImageGenerator;