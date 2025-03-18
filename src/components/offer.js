import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoChevronBack, IoChevronForwardSharp } from "react-icons/io5";
import Slider from 'react-slick';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, FormControl, InputLabel } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const BusBookingDiscountOffers = (props) => {
    const offers = props.offer
    const [header, setHeader] = useState('');
    const [openAddPopUp, setOpenAddPopUp] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        const [isHovered, setIsHovered] = useState(false);

        return (
            <IoChevronForwardSharp
                className={className}
                style={{
                    ...style, display: 'block', color: 'black', border: '1px solid #3333332d', padding: '7px', borderRadius: '50%', height: '40px', width: '40px',
                    backgroundColor: isHovered ? 'skyblue' : 'white',
                    color: isHovered ? 'white' : 'black',
                }}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        );
    };
    const resetAddDialog = () => {
        setOpenAddPopUp(false);
    }
    const handleOpen = (dis) => {
        setSelectedBanner(dis);
        setOpenAddPopUp(true)
    }

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <MdOutlineArrowBackIos style={{ fontSize: '24px', color: 'black' }} />
            </div>
        );
    };
    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <MdOutlineArrowForwardIos style={{ fontSize: '24px', color: 'black' }} />
            </div>
        );
    };
    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: false,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
        <div>

            <section className="mt-2 bookdiscoubnt--section">
                <div className="bookdiscoubntslider--div">
                    <div className="swiper bookdiscoubnt_slider">
                        <div className="container">
                            <div className="titlediv d-flex justify-content-center position-relative align-items-center mb-3 mb-lg-5 mt-3 mt-lg-5">
                                <h4>Bus Booking Discount Offers</h4>
                            </div>
                        </div>
                        <Slider {...sliderSettings} className="px-6">
                            {offers?.banner?.map((dis, index) => (
                                <div key={index} className="px-4">
                                    <div className="d-flex flex-column align-items-center justify-content-center transform hover-scale transition duration-300">
                                        <img
                                            src={offers?.image_url + dis?.image}
                                            alt=""
                                            onClick={() => handleOpen(dis)}
                                            style={{ width: '90%', height: '90%', borderRadius: "20px" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
            <Dialog
                open={openAddPopUp}
                onClose={resetAddDialog}
                maxWidth="md"  
                fullWidth 
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '20px',
                        backgroundColor: '#f8f9fa',
                        padding: "0px"
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" className="sky_text">
                    <h6 style={{ backgroundColor: '#e1e5e4', padding: '18px', borderRadius: '5px', textAlign: "center" }}>
                        {selectedBanner?.title}
                    </h6>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={resetAddDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon style={{ fill: 'black' }} />
                </IconButton>
                <DialogContent
                    sx={{
                        maxHeight: '600px',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgb(108, 42, 127)',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#555',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f1f1f1',
                        }
                    }}
                >
                    <DialogContentText id="alert-dialog-description" style={{ padding: "0px" }}>
                        {selectedBanner && (
                            <div className="px-4">
                                <h6 style={{ color: "black", padding: "15px" }}>
                                    {selectedBanner.sub_title}
                                </h6>
                                <div className="d-flex flex-column justify-content-center transform hover-scale transition duration-300">
                                    <div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: selectedBanner.terms_conditions
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContentText>


                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
            <style jsx>{`
                .bookdiscoubnt--section {
                    overflow-x: hidden;
                }
                .bookdiscoubntslider--div {
                    width: 100%;
                    overflow: hidden;
                }
                .swiper.bookdiscoubnt_slider {
                    padding: 0 50px;
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

export default BusBookingDiscountOffers;
