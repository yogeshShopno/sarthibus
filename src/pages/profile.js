import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation, Switch } from 'react-router-dom';
import EditProfile from '../components/profile/editProfile';
import PreviousBooking from '../components/profile/previosbooking';
import CancelTicket from '../components/profile/cancel-ticket';
import ShowMyTicket from '../components/profile/show-my-ticket';
import TermsConditions from '../components/profile/terms-and-conditions';
import CancelPolicy from '../components/profile/cancel-policy';
import PrivacyPolicy from '../components/profile/privacy-policy';
import Faq from '../components/profile/faq';
import Supports from '../components/profile/supports';
import ShippingPolicy from '../components/profile/shipping-policy';
import Header from '../components/header';
import Footer from '../components/footer';
import Referral from '../components/profile/referral';
import Wallet from '../components/profile/wallet';

const ProfileDetails = () => {
    const history = useHistory();
    const location = useLocation();

    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (location.pathname) {
            const section = location.pathname.split('/').pop();
            setActiveSection(section);
        }
    }, [location.pathname]);

    return (
        <>
            <Header />
            <div className="profile--main mt-5">
                <div className="profile--maindiv">
                    <div className="container">
                        <div className="profilepage--div">
                            <div className="profilediv--row">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="profile--col position-sticky top-15px" style={{ cursor: "pointer" }}>
                                            <div className="features--div">
                                                <ul className="nav featurenav nav-tabs text-capitalize flex-column justify-content-end border-0">
                                                    {localStorage.getItem('UserID') &&
                                                        <li className="nav-item border-bottom-1">
                                                            <a href='/profile/edit-profile' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'edit-profile' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">My Profile</span>
                                                            </a>
                                                        </li>}
                                                    {localStorage.getItem('UserID') &&
                                                        <li className="nav-item border-bottom-1">
                                                            <a href='/profile/wallet' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'edit-profile' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Wallet</span>
                                                            </a>
                                                        </li>}
                                                    <li className="nav-item border-bottom-1">
                                                        <a href='/profile/support' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'support' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                            <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Support</span>
                                                        </a>
                                                    </li>
                                                    {localStorage.getItem('UserID') &&
                                                        <li className="nav-item border-bottom-1">
                                                            <a href='/profile/referral' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'referral' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">referral</span>
                                                            </a>
                                                        </li>
                                                    }

                                                    {localStorage.getItem('UserID') &&
                                                        <li className="nav-item border-bottom-1">
                                                            <a href='/profile/previous-booking' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'previous-booking' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Previous Booking</span>
                                                            </a>
                                                        </li>}
                                                    {localStorage.getItem('UserID') &&
                                                        <li className="nav-item border-bottom-1">
                                                            {/* <NavLink to="/profile/cancel-ticket" activeClassName="active" style={{ textDecoration: 'none' }}> */}
                                                            <a href='/profile/cancel-ticket' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'cancel-ticket' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Cancel Ticket</span>
                                                            </a>
                                                            {/* <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Cancel Ticket</span>
                                                            </div> */}
                                                            {/* </NavLink> */}
                                                        </li>}
                                                    {localStorage.getItem('UserID') &&
                                                        <li className="nav-item border-bottom-1">
                                                            {/* <NavLink to="/profile/show-my-ticket" activeClassName="active" style={{ textDecoration: 'none' }}> */}
                                                            {/* <div className="smooth my-2 btn-theme-opacity"> */}
                                                            <a href='/profile/show-my-ticket' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'show-my-ticket' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Show My Ticket</span>
                                                            </a>
                                                            {/* </div> */}
                                                            {/* </NavLink> */}
                                                        </li>}
                                                    {/* <li className="nav-item border-bottom-1">
                                                        <a href="/profile/shipping-delivery" className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'shipping-delivery' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Shipping and Delivery</span>
                                                            </div>
                                                        </a>
                                                    </li> */}
                                                    <li className="nav-item border-bottom-1">
                                                        <a href="/profile/terms-conditions" className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'terms-conditions' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Terms & Conditions</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item border-bottom-1">
                                                        <a href="/profile/cancel-refund-policy" className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'cancel-refund-policy' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Cancel & Refund Policy</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item border-bottom-1">
                                                        <a href="/profile/privacy-policy" className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'privacy-policy' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Privacy Policy</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item border-bottom-1">
                                                        <a href="/profile/faq" className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'faq' ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">FAQ</span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    {/* Add more links similarly */}
                                                </ul>

                                                <ul className="nav featurenav nav-tabs text-capitalize flex-column justify-content-end border-0">
                                                    {/* {localStorage.getItem('UserID') &&
                                                    <li className="nav-item border-bottom-1">
                                                        <a href='/profile/edit-profile' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'edit-profile' ? 'active' : ''}`}>
                                                            <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Edit Profile</span>
                                                        </a>
                                                    </li>
                                                } */}
                                                    {/* <li className="nav-item border-bottom-1">
                                                    <a href='/profile/support' className={`smooth mb-2 mt-0 btn-theme-opacity ${activeSection === 'support' ? 'active' : ''}`}>
                                                        <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Support</span>
                                                    </a>
                                                </li> */}
                                                    {/* {localStorage.getItem('UserID') &&
                                                    <li className="nav-item border-bottom-1">
                                                        <NavLink to="/profile/previous-booking" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Previous Booking</span>
                                                            </div>
                                                        </NavLink>
                                                    </li>} */}
                                                    {/* {localStorage.getItem('UserID') &&
                                                    <li className="nav-item border-bottom-1">
                                                        <NavLink to="/profile/cancel-ticket" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Cancel Ticket</span>
                                                            </div>
                                                        </NavLink>
                                                    </li>}
                                                {localStorage.getItem('UserID') &&
                                                    <li className="nav-item border-bottom-1">
                                                        <NavLink to="/profile/show-my-ticket" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                            <div className="smooth my-2 btn-theme-opacity">
                                                                <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Show My Ticket</span>
                                                            </div>
                                                        </NavLink>
                                                    </li>} */}
                                                    {/* <li className="nav-item border-bottom-1">
                                                    <NavLink to="/profile/shipping-delivery" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                        <div className="smooth my-2 btn-theme-opacity">
                                                            <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Shipping and Delivery</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item border-bottom-1">
                                                    <NavLink to="/profile/terms-conditions" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                        <div className="smooth my-2 btn-theme-opacity">
                                                            <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Terms & Conditions</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item border-bottom-1">
                                                    <NavLink to="/profile/cancel-refund-policy" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                        <div className="smooth my-2 btn-theme-opacity">
                                                            <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Cancel & Refund Policy</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item border-bottom-1">
                                                    <NavLink to="/profile/privacy-policy" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                        <div className="smooth my-2 btn-theme-opacity">
                                                            <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">Privacy Policy</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item border-bottom-1">
                                                    <NavLink to="/profile/faq" activeClassName="active" style={{ textDecoration: 'none' }}>
                                                        <div className="smooth my-2 btn-theme-opacity">
                                                            <span className="fw-medium fs-18 d-block py-3 custom-link no-link-style">FAQ</span>
                                                        </div>
                                                    </NavLink>
                                                </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-9">
                                        <Switch>
                                            <Route path="/profile/edit-profile" component={EditProfile} />
                                            <Route path="/profile/wallet" component={Wallet} />
                                            <Route path="/profile/referral" component={Referral} />
                                            <Route path="/profile/support" component={Supports} />
                                            <Route path="/profile/previous-booking" component={PreviousBooking} />
                                            <Route path="/profile/cancel-ticket" component={CancelTicket} />
                                            <Route path="/profile/show-my-ticket" component={ShowMyTicket} />
                                            <Route path="/profile/shipping-delivery" component={ShippingPolicy} />
                                            <Route path="/profile/terms-conditions" component={TermsConditions} />
                                            <Route path="/profile/cancel-refund-policy" component={CancelPolicy} />
                                            <Route path="/profile/privacy-policy" component={PrivacyPolicy} />
                                            <Route path="/profile/faq" component={Faq} />
                                            {/* Add more routes similarly */}
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfileDetails;
