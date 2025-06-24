import { Button, CardActions, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const logo = process.env.PUBLIC_URL + '../assets/images/sarthi bus logo.png';
  const history = useHistory();

  const [facebook, setFacebook] = useState('https://www.facebook.com/share/1AnQmqwbuA/?mibextid=wwXIfr')
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/company/sarthibusofficial/')
  const [twitter, setTwitter] = useState('https://x.com/sarthibus?s=11')
  const [instagram, setInstagram] = useState('https://www.instagram.com/sarthibus')
  const [youtube, setYoutube] = useState('https://youtube.com/@sarthibusofficial?si=mFhxkKTfCuEBXBr4')


  useEffect(() => {
    // successTicket();
  }, [])
  // const successTicket = async () => {
  //   const res = await axios.get("social_media_link");
  //   if (res.data.success === true) {
  //     setFacebook(res.data.data.facebook_link);
  //     setTwitter(res.data.data.twitter_link);
  //     setLinkedin(res.data.data.linkedin_link);
  //     setInstagram(res.data.data.instagram_link);
  //     setYoutube(res.data.data.instagram_link);


  //   }
  // }

  return (
    <footer>
      <div className="footer--div mt-100 pt-5" style={{ backgroundColor: "#F6F0F8" }}>
        <div className="container">
          <div className=" row pb-5 justify-content-between">
            <div className="col-xl-3 col-lg-3 col-sm-12 col-md-12 col-12 mb-4 mb-lg-0">
              <div className="footer-col d-grid">
                <div className="footerlogo">
                  <img src={logo} alt="" className="img-fluid" onClick={() => history.push('/')} style={{ maxHeight: '60px', cursor: "pointer" }} />
                </div>
                <div className="footer-f-content mt-3">
                  <p className="fw-medium">
                    Sarthi Bus is your trusted partner for online bus ticket bookings, serving millions of satisfied travelers across the globe.
                    Sarthi Bus offers seamless bus ticket booking through its website and mobile apps covering all major routes.
                  </p>

                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6 col-md-4 col-12 mb-4 mb-lg-0">
              <div className="footer-col" style={{ cursor: "pointer" }}>
                <div className="ul title-footer mb-4">
                  <h5 className="text-capitalize fw-bold pb-2 mb-0">information</h5>
                </div>
                <ul className="footer-ul list-unstyled text-capitalize">
                  <li className="footerli mb-2" >
                    <a href="/about-us" style={{ textDecoration: "none" }}>about </a>
                  </li>

                  <li className="footerli mb-2">
                    <a href="/contact-us" style={{ textDecoration: "none" }}>contact</a>
                  </li>
                  {localStorage.getItem('UserID') ? <li className="footerli mb-2" onClick={() => history.push('/profile')}>
                    <a >Account</a>
                  </li> : <li className="footerli mb-2" onClick={() => history.push('/login')}>
                    <a >Login</a>
                  </li>}
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6 col-md-4 col-12 mb-4 mb-lg-0">
              <div className="footer-col">
                <div className="ul title-footer mb-4">
                  <h5 className="text-capitalize fw-bold pb-2 mb-0">Policies</h5>
                </div>
                <ul className="footer-ul list-unstyled text-capitalize">
                  <li className="footerli mb-2">
                    <NavLink to="/profile/terms-conditions" className="smooth mb-2 mt-0 btn-theme-opacity">
                      <span activeClassName="active">Terms & Conditions</span>
                    </NavLink>
                  </li>
                  <li className="footerli mb-2" >
                    <NavLink to="/profile/privacy-policy" className="smooth mb-2 mt-0 btn-theme-opacity">
                      <span activeClassName="active">Privacy Policy</span>
                    </NavLink>
                  </li>

                  <li className="footerli mb-2" >
                    <NavLink to="/profile/support" className="smooth mb-2 mt-0 btn-theme-opacity">
                      <span activeClassName="active">Support</span>
                    </NavLink>
                  </li>
                  <li className="footerli mb-2" >
                    <NavLink to="/profile/cancel-refund-policy" className="smooth mb-2 mt-0 btn-theme-opacity">
                      <span activeClassName="active">Cancel & Refund</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-12 col-md-4 col-12 mb-4 mb-lg-0">
              <div className="footer-col">
                <div className="ul title-footer mb-4">
                  <h5 className="text-capitalize fw-bold pb-2 mb-0">Talk to Us Today</h5>
                </div>
                <ul className="footer-ul list-unstyled text-capitalize">
                  <li className="footerli mb-2 d-flex justify-content-between gap-1" >
                    <div className="relative w-full mb-3 footer_fld">
                      <TextField size='small' label='Email ID' />
                    </div>
                    <Button variant='contained' style={{ backgroundColor: "rgb(121 44 143)", height: "100%" }}>Submit</Button>
                  </li>

                </ul>
                <CardActions
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/icons/instagram.png"
                      alt="Instagram"
                      style={{
                        width: "25px",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    />
                  </a>
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/icons/communication.png"
                      alt="Facebook"
                      style={{
                        width: "25px",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    />
                  </a>
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/icons/twitter.png"
                      alt="Twitter"
                      style={{
                        width: "25px",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    />
                  </a>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/icons/linkedin.png"
                      alt="LinkedIn"
                      style={{
                        width: "25px",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    />
                  </a>
                  <a href={youtube} target="_blank" rel="noopener noreferrer">
                    <img
                      src="/assets/icons/youtube.png"
                      alt="Youtube"
                      style={{
                        width: "25px",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    />
                  </a>
                </CardActions>
              </div>
            </div>
          </div>

        </div>
        <div style={{ backgroundColor: "#F6F0F8" }}>
          <p className='class="d-flex justify-content-center mb-0 mt-1 py-3'> <a target="_blank"
            class="d-flex justify-content-center"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: '700',
              cursor: 'pointer',

            }} href="https://webvisioninfotech.com/">Copyright © 2024 Sarthi Bus Developed By Webvision Infotech</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
