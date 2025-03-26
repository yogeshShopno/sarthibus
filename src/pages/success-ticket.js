
import { Button, CardActions, CardContent } from "@mui/material";
import { useEffect, useState, } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";


const SuccessTicket = () => {
    const [facebook, setFacebook] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const location = useLocation();
    const status = location.state?.status || false; // Prevents error if state is undefined
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.push("/"); // Redirect to home if state is missing
        }
    }, [location, history]);

    useEffect(() => {
        successTicket();

        // Prevent back navigation
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const successTicket = async () => {
        const res = await axios.get("social_media_link");

        if (res.data.success === true) {
            setFacebook(res.data.data.facebook_link);
            setTwitter(res.data.data.twitter_link);
            setLinkedin(res.data.data.linkedin_link);
            setInstagram(res.data.data.instagram_link);

        }
    }

    return (

        <div
            className="bg-image-sarthi"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f9f9f9",
                // backgroundColor: "#eedbf1",
            }}>


            <Card
                className="m-auto"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    boxShadow: "rgb(121 44 143 / 48%) 0px 4px 12px",
                    background: "rgb(163 79 186 / 62%)",
                }}
            >
                <CardContent style={{ textAlign: "center" }}>
                    {/* <div class="success-checkmark">
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                            <div class="icon-circle"></div>
                            <div class="icon-fix"></div>
                        </div>
                    </div> */}
                    {status && <div class="main-container">
                        <div class="check-container">
                            <div class="check-background">
                                <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="check-shadow"></div>
                        </div>
                    </div>}

                    {/* <img
                        src="assets/images/confirmed.svg"
                        alt="Ticket Confirmed"
                        style={{ width: "120px", height: "120px", marginBottom: "1rem" }}
                    /> */}
                    <h3
                        style={{
                            fontSize: "1.8rem",
                            color: "white",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                        }}
                    >
                        {status ? "Ticket Confirmed" : "Ticket Not Confirmed"}

                    </h3>
                </CardContent>

                <CardActions
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <img
                            src="/assets/icons/instagram.png"
                            alt="Instagram"
                            style={{
                                width: "30px",
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
                                width: "30px",
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
                                width: "30px",
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
                                width: "30px",
                                transition: "transform 0.3s",
                            }}
                            onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
                            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        />
                    </a>
                </CardActions>

                <CardActions style={{ display: "flex", justifyContent: "center" }}>
                    {/* <Button
                        href="/"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(121,68,143,1) 0%, rgba(145,90,165,1) 100%)",
                            color: "white !important",
                            padding: "0.8rem 1.5rem",
                            borderRadius: "25px",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "1rem",
                            transition: "background 0.3s",
                        }}
                        onMouseOver={(e) =>
                        (e.target.style.background =
                            "linear-gradient(90deg, rgba(145,90,165,1) 0%, rgba(121,68,143,1) 100%)")
                        }
                        onMouseOut={(e) =>
                        (e.target.style.background =
                            "linear-gradient(90deg, rgba(121,68,143,1) 0%, rgba(145,90,165,1) 100%)")
                        }
                    >
                        Back to Home
                    </Button> */}
                    <Button href="/" autoFocus color="error"
                        style={{ backgroundColor: "white", color: "rgb(121 44 143)", fontWeight: "bold", marginBottom: "20px", marginTop: "1rem" }}
                    >
                        Back to Home
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
export default SuccessTicket