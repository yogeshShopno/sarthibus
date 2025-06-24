import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TravellingImg from '../Images/SarthiBus Banner.png';
import Playstore from '../Images/play store (2).png';
import Applestore from '../Images/apple store (2).png';

import { FaCircleCheck } from 'react-icons/fa6';
import { GiRoundStar } from 'react-icons/gi';

const SathiBanner = () => {
    return (
        <section className="mt-4 bookdiscount--section">
            <div className="">
                <div className="mt-100 justify-content-center align-items-center">
                    <div className="col-lg-8 m-auto banner_st">
                        <div className="card rounded-5 overflow-hidden" style={{ background: "rgb(121, 44, 143)", color: "white" }}>
                            <div className="row align-items-center p-4">
                                <div className="col-lg-8 col-md-12 px-4">
                                    <h2 className="text-uppercase fw-bold pt-4">Enjoy the app!</h2>
                                    <div className="p-5 rounded-4 mb-4 mt-3 bg-light text-dark">
                                        <div className='d-flex'>
                                            <div className='col-7'>
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <FaCircleCheck size={25} style={{ color: 'green' }} />
                                                    <span className="fw-bold" style={{ fontSize: "large" }}>Quick access</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <FaCircleCheck size={25} style={{ color: 'green' }} />
                                                    <span className="fw-bold" style={{ fontSize: "large" }}>Superior live tracking</span>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className="col-12">
                                                    <h4 className="fw-bold">Download the App on</h4>
                                                    <div className="d-flex flex-column align-items-start">
                                                        <a href="https://play.google.com/store/search?q=sarthi%20bus&c=apps&hl=en" style={{ cursor: "pointer" }}>
                                                            <img src={Playstore} alt="Play Store" className="img-fluid mt-2" style={{ maxWidth: "80%" }} /></a>
                                                        <a style={{ cursor: "pointer" }}>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between mt-5">
                                            <div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <h4 className="fw-bold mb-0">4.9</h4>
                                                    <GiRoundStar size={20} />
                                                </div>
                                                <small>1K+ downloads</small>
                                                <p>Play Store</p>
                                            </div>
                                            <hr style={{ border: "1px solid" }} />
                                            <div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <h4 className="fw-bold mb-0">4.6</h4>
                                                    <GiRoundStar size={20} />
                                                </div>
                                                <small>2K+ downloads</small>
                                                <p>App Store</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 text-center d-lg-block d-none">
                                    <img src={TravellingImg} alt="Travel" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SathiBanner;
