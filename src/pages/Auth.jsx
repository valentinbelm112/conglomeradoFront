import React, { useState, useRef } from "react";
import FormLogin from "../components/FormLogin.jsx";
import "../pages/styles/Auth.scss";
import img1Carousel from "./assets/img1Carrusel.png";
import img2Carousel from "./assets/img2Carousel.png";
import Carousel from "@itseasy21/react-elastic-carousel";
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
];

const Auth = () => {
    const [state, setState] = useState(0);
    const [stateinit, setStateinit] = useState(false);
    const carouselRef = useRef(null);
    let resetTimeout;

    return (
        <div className="container-gestion-login-conglomerado">
            <div className="row container-login-conglomerado">
                <div className="block_left col-md-8">
                    <Carousel
                        className="corousel-container-conglomerado"
                        breakPoints={breakPoints}
                        autoPlaySpeed={3000}
                        enableAutoPlay={true}
                        showArrows={false}
                        pagination={false}
                        ref={carouselRef}
                        onNextEnd={(currentItem, pageIndex) => {
                            clearTimeout(resetTimeout);
                            resetTimeout = setTimeout(() => {
                                carouselRef?.current?.goTo(0);
                            }, 4000); // same time
                        }}
                        autoTabIndexVisibleItems={true}
                        enableSwipe={false}
                        itemPadding={[0, 2]}
                        enableTilt={true}
                        initialActiveIndex={stateinit ? stateinit : state}
                    >
                        <img
                            className="itemCarrusel"
                            src={img1Carousel}
                        />

                        <img
                            className="itemCarrusel"
                            src={img2Carousel}
                        />

                        <img
                            className="itemCarrusel"
                            src={img1Carousel}
                        />
                        <img
                            className="itemCarrusel"
                            src={img2Carousel}
                        />
                    </Carousel>
                </div>
                <div className="block_right col-md-4">
                    <div className="container-title-login">
                       
                        <FormLogin />
                    </div>



                </div>
            </div>
        </div>

    );
};

export default Auth;
