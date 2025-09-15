import React, { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { Offcanvas, Nav, Navbar, Container, Dropdown, Button } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import GoogleTranslate from '../components/GoogleTranslate.js'
import '../styles/style.css';
import LoginPopup from './LoginPopup.js';
import axios from 'axios';


const Header = () => {
    const history = useHistory();
    const logo = process.env.PUBLIC_URL + '../../assets/images/sarthi bus logo.png';
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false)
    const [walletAmount, setWalletAmount] = useState(false)
const userID = localStorage.getItem('UserID')
    useEffect(() => {
        const getProfileData = async () => {
            try {
                const data = new FormData();
                data.append("user_id", userID);

                const res = await axios.post("get_profile", data);
                setWalletAmount(res.data?.data?.wallet ?? 0);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (userID) {
            getProfileData();
        }
    }, []);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOpenProfile = () => {
        const data = localStorage.getItem('UserID');
        if (data) {
            history.push('/profile/edit-profile')
        } else {
            history.push('/profile/support')
        }
    }

    const resetAddDialogReview = () => {
        setOpen(false)
    }

    const logoClick = () => {
        localStorage.removeItem('busState')
    }


    const handleLogOut = () => {
        localStorage.removeItem('UserName')
        localStorage.removeItem('EmailID')
        localStorage.removeItem('MobileNo')
        localStorage.removeItem('UserID')
        setOpen(false)
        localStorage.clear();

        history.push('/')
    }

    return (
        <>

            <header className="shadow-sm">
                <Navbar expand="lg" >
                    <Container>
                        <Navbar.Brand >
                            <img src={logo} alt="Logo" className="img-fluid" onClick={() => {
                                logoClick();
                                window.location.href = '/'
                            }
                            } style={{ maxHeight: '55px', cursor: "pointer" }} />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow}>
                            <CiMenuBurger size={25} />
                        </Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav" className="text-capitalize d-lg-flex fw-medium menu d-none d-lg-block">
                            <Nav className="m-auto mb-2 mb-lg-0">
                                <Nav.Link href="/" onClick={logoClick()}>Home</Nav.Link>
                                <Nav.Link href="/about-us" >About</Nav.Link>
                                <Nav.Link href="/contact-us">Contact</Nav.Link>
                            </Nav>
                            {
                                userID &&(<Nav.Link href="/profile/wallet">
                                <div
                                    className="d-inline-flex align-items-center justify-content-between px-3 py-1 rounded-pill shadow-sm border gap-2 "
                                    style={{
                                        background: "#f3e7f7",
                                        border: "1px solid #e6d5ef",
                                        boxShadow: "0 5px 15px rgba(121, 44, 143, 0.1)",
                                        transition: "transform 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                >
                                    <img
                                        src="/assets/icons/wallet.png"
                                        alt="Wallet"
                                        className="flex-shrink-0"
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            filter: "invert(18%) sepia(60%) saturate(750%) hue-rotate(275deg) brightness(90%) contrast(95%)",
                                        }}
                                    />
                                    <span className=" text-xsm fs-6 whitespace-nowrap">
                                        ₹ {walletAmount}
                                    </span>
                                </div>
                            </Nav.Link>)
                            }
                            
                            <Nav className="list-unstyled m-0">
                                <Dropdown>
                                    <Dropdown.Toggle id='id="google_translate_element"' variant="link" className="nav-link dropdown-toggle d-flex align-items-center gap-1">
                                        <GoogleTranslate />
                                    </Dropdown.Toggle>
                                </Dropdown>
                            </Nav>






                            <Nav className="list-unstyled m-0">
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" className="nav-link dropdown-toggle d-flex align-items-center gap-1">
                                        <CgProfile size={25} /> Account
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {!localStorage.getItem('UserID') ? (
                                            <>
                                                <Dropdown.Item onClick={() => setOpenLogin(true)}>Register</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setOpenLogin(true)}>Login</Dropdown.Item>
                                            </>
                                        ) : (
                                            <>
                                                <Dropdown.Item onClick={handleOpenProfile}>Profile</Dropdown.Item>
                                                <Dropdown.Item onClick={handleClickOpen}>Logout</Dropdown.Item>
                                            </>
                                        )}

                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Offcanvas show={show} onHide={handleClose} className="menu--offcanvas text-capitalize fw-semibold p-5 w-fitcontent">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="navbar-nav m-auto mb-2 mb-lg-0">
                            <Nav.Item>
                                <Nav.Link href="/" >Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Link href="/about-us" >About</Nav.Link>

                            <Nav.Item>
                                <Nav.Link href="/contact-us">Contact</Nav.Link>
                            </Nav.Item>

                             {
                                userID &&( <Nav.Item>
                                <Nav.Link href="/profile/wallet">Wallet : ₹ {walletAmount}</Nav.Link>
                            </Nav.Item>) }
                           
                        </Nav>

                        <Nav className="list-unstyled m-0 mt-4">
                            <Dropdown>
                                <Offcanvas.Title >
                                    <CgProfile size={25} /> Account
                                </Offcanvas.Title>
                                <Nav className="navbar-nav m-auto mb-2 mb-lg-0 mt-4">
                                    <Nav.Item>
                                        <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
                                    </Nav.Item>
                                    {!localStorage.getItem('UserID') ? (
                                        <Nav.Item className='mt-3'>
                                            <Dropdown.Item onClick={() => setOpenLogin(true)}>Login</Dropdown.Item>
                                        </Nav.Item>
                                    ) : (
                                        <Nav.Item className='mt-3'>
                                            <Dropdown.Item onClick={handleClickOpen}>Logout</Dropdown.Item>
                                        </Nav.Item>
                                    )}
                                </Nav>
                            </Dropdown>
                        </Nav>
                        <Nav>
                            <Dropdown className='mt-4'>
                                <Nav.Item>
                                    <Dropdown.Toggle variant="link" className="nav-link dropdown-toggle d-flex align-items-center gap-1">
                                        <GoogleTranslate />
                                    </Dropdown.Toggle>
                                </Nav.Item>
                            </Dropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                <Dialog
                    open={open}
                    sx={{
                        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper ": {
                            width: "100%"
                        },
                    }}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <IconButton
                        aria-label="close"
                        onClick={resetAddDialogReview}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle style={{ color: "rgb(121 44 143)", fontSize: "x-large" }} className='text-center mt-5'>  {"Logout"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" className='text-center mt-4'>
                            Are you sure you want to Log Out ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='text-center justify-content-center mb-5 mt-2'>
                        <Button variant="contained" style={{ width: "40%", border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)", fontWeight: "500" }} onClick={handleLogOut} >Yes Logout!</Button>
                        <Button color="error" onClick={() => setOpen(false)} style={{ width: "40%", border: "2px solid rgb(121 44 143)", backgroundColor: "white", backgroundColor: "rgb(121 44 143)" }}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                {openLogin && <LoginPopup onClose={() => setOpenLogin(false)} />}
            </header>

        </>
    );
};

export default Header;
