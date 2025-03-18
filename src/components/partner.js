import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SwiperCore from 'swiper';
import { IoChevronBack } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoChevronForwardSharp } from "react-icons/io5";
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export const PartnersSection = () => {
    const busIcon = process.env.PUBLIC_URL + 'assets/images/bus-partner-img.png';
    const [clientShoutOuts] = useState([
        { id: 1, name: 'Raghav', src: busIcon },
        { id: 4, name: 'Akshar', src: busIcon },
        { id: 5, name: 'Raghuveer', src: busIcon },
        { id: 5, name: 'Raghuveer', src: busIcon },
        { id: 5, name: 'Raghuveer', src: busIcon },
    ]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        nextArrow: <IoChevronForwardSharp />,
        prevArrow: <IoChevronBack />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <section className="mt-10 partners--section">
            <div className="partnersslider--div">
                <div className="swiper partner_slider">
                </div>
            </div>
        </section>
    );
};
