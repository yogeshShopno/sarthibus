import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import Header from "../header";
const Supports = () => {
    const [supportsdata, setSupportsdata] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        SupportsList()
    }, [])

    const SupportsList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("contact_us", data);
            setSupportsdata(res.data.data.contact);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div>
                    <div className="container my-5 card-border">
                        <div className="card shadow support-card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4 pt-3 pb-3">Support</h2>
                                <div className="mb-3 d-flex justify-content-between flex-wrap">
                                    <p className="mb-1">
                                        <strong>Email: </strong>
                                        <a href={`mailto:${supportsdata.email}`}> {supportsdata.email}</a>
                                    </p>
                                    <p className="mb-1">
                                        <strong>Mobile: </strong>
                                        <a href={`tel:${supportsdata.mobile}`}>{supportsdata.mobile}</a>
                                    </p>
                                    <p className="mb-1">
                                        <strong>WhatsApp: </strong>
                                        <a
                                            href={`https://wa.me/${supportsdata.whatsapp_number}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {supportsdata.whatsapp_number}
                                        </a>
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <h3 className="h5">About Us</h3>
                                    <p className="text-bold">{supportsdata.aboutus}</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <h3 className="h5 me-3">Follow Us</h3>
                                    <a href={supportsdata.facebook_link} target="_blank">
                                        <FaFacebook className="fs-2" />
                                    </a>
                                    <a href={supportsdata.instagram_link} target="_blank">
                                        <FaSquareInstagram className="fs-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Supports