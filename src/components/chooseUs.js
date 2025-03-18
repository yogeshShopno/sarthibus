import React from 'react';

const whyUsData = [
    // { icon: "assets/icons/path.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },
    // { icon: "assets/icons/busblue.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },
    // { icon: "assets/icons/mny.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },
    // { icon: "assets/icons/tckt.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },
    // { icon: "assets/icons/path.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },
    // { icon: "assets/icons/mny.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },
    // { icon: "assets/icons/busblue.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },

    { icon: "assets/icons/path.svg", title: "1,00,000+ Bus Routes", description: "Providing unmatched options to cater to all your travel requirements." },
    { icon: "assets/icons/affordable.svg", title: "Affordable Fares", description: "Enjoy competitive prices for every journey, ensuring the best value for your travel." },
    { icon: "assets/icons/mny.svg", title: "Secure Payments", description: "We prioritize your safety with secure and trusted payment methods." },
    { icon: "assets/icons/tckt.svg", title: "Easy Booking", description: "Book your tickets in just a few simple steps, anytime, anywhere." },
    { icon: "assets/icons/availability.svg", title: "24/7 Availability", description: "Access our services around the clock, making travel convenient at any time." },
    { icon: "assets/icons/reliable.svg", title: "Reliable Service", description: "We ensure timely and dependable bus services for a smooth experience." },
    { icon: "assets/icons/iconmonstr-delivery-8.svg", title: "24/7 Customer Support", description: "Our dedicated support team is always available to assist you with your queries." },
];

const ChooseUs = () => {
    return (
        <section className="mt-100 whyus--sec">
            <div className="container">
                <div className="whyus--main">
                    <div className="whyus--div">
                        <div className="titlediv text-center mb-3 mb-lg-5 mt-3 mt-lg-5">
                            <h4>why choose us?</h4>
                            <p>Choose us for hassle-free online bus bookings with a seamless experience and unbeatable convenience.</p>
                        </div>
                        <div className="whyus--content mt-3">
                            <div className="row justify-content-center">
                                {whyUsData.map((item, index) => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                                        <div className="whyus_card shadow-hover border-hover-none text-center card p-4" style={{height:"100%"}}>
                                            <div className="whyus--icon w-fitcontent m-auto p-4">
                                                <img src={item.icon} alt="" width="55px" className="img-fluid" />
                                            </div>
                                            <div className="whyus--content mt-3">
                                                <h5 className="fw-bold">{item.title}</h5>
                                                <p className="fw-medium">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChooseUs;
