import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../../assets/images/banners/slide1.jpg";
import image2 from "../../assets/images/banners/slide2.jpg";
import image3 from "../../assets/images/banners/slide3.jpg";
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {
    return (
        <div className="container-fluid p-0"> 
            <Carousel fade interval={2000} controls={true} indicators={true}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                        style={{ height: "400px", objectFit: "cover" }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                        style={{ height: "400px", objectFit: "cover" }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                        style={{ height: "400px", objectFit: "cover" }}
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Slider;