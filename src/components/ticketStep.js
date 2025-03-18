import React from 'react';
import { FaSearch } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import { FaMoneyBillWave } from "react-icons/fa";
function TicketStepsSection() {
    const firstImg = process.env.PUBLIC_URL + 'assets/images/tct1.png';

    return (
        <section className="mt-100 ticket--stepsec">
            <div className="container">
                <div className="ticket-stepdiv">
                    <div className="titlediv text-center mb-3 mb-lg-5 mt-3 mt-lg-5">
                        <h4>Get Your Tickets With Just 3 Steps</h4>

                        <p className="mb-0">Have a look at our popular reason. why you should choose you bus. Just a Bus and get
                            a ticket for your great journey!</p>
                    </div>
                    <div className="ticetstep--main">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                                <div className="ticketstep--card h-100 card rounded-5 overflow-hidden shadow-hover border-hover-none text-center">
                                    <div className="ticktstep--img">
                                        <img src={firstImg} alt="" className="img-fluid w-100 " />
                                    </div>
                                    <div className="px-5 pb-3">
                                        <div
                                            className="tctstep--icon btn-theme-outline-0 btn shadow-cust d-flex align-items-center justify-content-center position-relative bg-white"
                                        >
                                            <FaSearch size={25} color='rgb(121, 44, 143)' />
                                        </div>

                                        <div className="tctstep--content mt-3 text-center">
                                            <h5 className="fw-bold">Search Your Bus</h5>
                                            <p className="fw-medium">Choose your origin, destination, journey dates and search
                                                for buses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                                <div className="ticketstep--card h-100 card rounded-5 overflow-hidden shadow-hover border-hover-none text-center">
                                    <div className="ticktstep--img">
                                        <img src="assets/images/tct2.png" alt="" className="img-fluid w-100" />
                                    </div>
                                    <div className="px-5 pb-3">
                                        <div className="tctstep--icon btn-theme-outline-0 btn shadow-cust d-flex align-items-center justify-content-center z-1 position-relative bg-white">
                                            <GiTicket size={30} color='rgb(121, 44, 143)' />
                                        </div>
                                        <div className="tctstep--content mt-3 text-center">
                                            <h5 className="fw-bold">Choose The Ticket</h5>
                                            <p className="fw-medium">Choose the perfect bus ticket that fits your schedule and
                                                preferences.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                                <div className="ticketstep--card h-100 card rounded-5 overflow-hidden shadow-hover border-hover-none text-center">
                                    <div className="ticktstep--img">
                                        <img src="assets/images/tct3.png" alt="" className="img-fluid w-100" />
                                    </div>
                                    <div className="px-5 pb-3">
                                        <div className="tctstep--icon btn-theme-outline-0 btn shadow-cust d-flex align-items-center justify-content-center z-1 position-relative bg-white">
                                            <ion-icon name="cash-outline" className="fs-2"></ion-icon>
                                            <FaMoneyBillWave size={30} color='rgb(121, 44, 143)' />
                                        </div>
                                        <div className="tctstep--content mt-3 text-center">
                                            <h5 className="fw-bold">Pay Bill </h5>
                                            <p className="fw-medium">Complete your payment using the available secure methods to
                                                finalize your booking.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TicketStepsSection;
