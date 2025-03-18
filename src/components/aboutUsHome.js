import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoChevronBack, IoChevronForwardSharp } from 'react-icons/io5';
import Slider from 'react-slick';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const AboutUsHome = (props) => {
    const clientReview = props.review
    const arrowNext = process.env.PUBLIC_URL + 'assets/images/arrow-next.png';
    const arrowPrev = process.env.PUBLIC_URL + 'assets/images/arrow-prev.png';

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: " 0 5px 8px #00000038",
                    borderRadius: '50%',
                    padding: '21px',
                    right: '10px',
                    zIndex: 1,
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    transition: 'background 0.3s ease, transform 0.3s ease',
                }}
                onClick={onClick}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 5px 8px #00000038";
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 5px 8px #00000038";
                    e.currentTarget.style.transform = 'translateY(-50%)';
                }}
            >
                <img src={arrowNext} width="90px" alt="bus icon" className="img-fluid" />

            </div>
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: " 0 5px 8px #00000038",
                    borderRadius: '50%',
                    padding: '21px',
                    right: '10px',
                    zIndex: 1,
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                onClick={onClick}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = " 0 5px 8px #00000038";
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = " 0 5px 8px #00000038";
                    e.currentTarget.style.transform = 'translateY(-50%)';
                }}
            >
                <img src={arrowPrev} alt="next icon" className="img-fluid" />
            </div>
        );
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
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
        <>
            <section className="mt-100 testimonial--sec">
                <div className="container">
                    <div className="testimonial--main">
                        <div className="testimonial--div">
                            <div className="titlediv text-center mb-3 mb-lg-5">
                                <h4>what clients say about us</h4>
                                <p>Our clients praise our seamless booking process and the wide range of travel options we offer.</p>
                            </div>
                            <div className="testimonial--content mt-5">
                                <div className='bg-before'>
                                    <div className="testimonial--content mt-5">
                                        <Slider {...sliderSettings} className="px-4">
                                            {clientReview?.client_review?.map((review, index) => (
                                                <div className="px-4" key={index} >
                                                    <div className="testimonial--card my-5">
                                                        <div className="p-3 rounded-4 testimonialcrd--content d-flex align-items-center justify-content-center">
                                                            <div className="divbefore-after shadow p-4 my-5">
                                                                <div className="testiuserimg align-items-center d-flex justify-content-center">
                                                                    <img src={clientReview?.image_url + review?.image} alt="" className="img-fluid" />
                                                                </div>
                                                                <div className="testimonial--content text-center">
                                                                    <div className="titlediv text-center">
                                                                        <h4>{review?.name}</h4>
                                                                        <p>{review?.designation}</p>
                                                                    </div>
                                                                    <div className="testimon--msg">
                                                                        <p>{review?.msg}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUsHome;