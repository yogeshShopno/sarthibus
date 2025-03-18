import { Button } from "@mui/material"
import Footer from "../components/footer"
import Header from "../components/header"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const ContactUs = () => {
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const history = useHistory()
    const [errors, setErrors] = useState({});

    const [sarthiMobile, SetSarthiMobile] = useState('')
    const [sarthiEmail, SetSarthiEmail] = useState('')

    const handleReset = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMsg('');
    }
    const getContactDetails = async () => {

        try {
            await axios.get("contact_us", {
            }).then((res) => {

                SetSarthiMobile(res.data.data.contact.mobile)
                SetSarthiEmail(res.data.data.contact.email)

            })
        } catch (error) {
            toast.error(error.data.message || 'API is not working');
        }

    }

    useEffect(() => {
        getContactDetails()
    }, [])

    const handleSubmit = () => {
        const newErrors = {};
        if (!msg) {
            newErrors.firstName = 'message No is required';
            toast.error('Message is required');
        }
        if (!firstName) {
            newErrors.firstName = 'firstName No is required';
            toast.error('FirstName is required');
        }
        if (!lastName) {
            newErrors.lastName = 'lastName No is required';
            toast.error('LastName is required');
        }
        if (!phone) {
            newErrors.phone = 'mobile No is required';
            toast.error('Mobile Number is required');
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'mobile number must be 10 digits';
            toast.error('Mobile number must be 10 digits');
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            handleAPI()
        }
    };
    const handleAPI = async () => {
        let data = new FormData();
        data.append('first_name', firstName)
        data.append('last_name', lastName)
        data.append('mobile_number', phone)
        data.append('email', email)
        data.append('msg', msg)
        try {
            await axios.post("contact", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message)
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setMsg('');
                    // setTimeout(() => {
                    //     history.push('/');
                    // }, 2000);
                } else {
                    toast.error(res.data.message)
                }
            })
        } catch (error) {
            toast.error(error.data.message || 'API is not working');
        }



    }


    return (
        <>
            <div>
                <Header />
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
                <section className='w-100'>
                    <div className="about-banner">
                        <h1 className="text-white fs-3">CONTACT US</h1>
                    </div>
                    <div className="container-md container-sm container-xl mt-5">
                        <div className="row">
                            <div className="col">
                                We'll start with some questions and get you to the right place.
                                let's get you some help. We're going to ask you some questions and then connect you with a member of our support team.
                                Can you describe your issue in a few sentences? This will help our team understand what's going on.
                                We'll start with some questions and get you to the right place.
                                let's get you some help. We're going to ask you some questions and then connect you with a member of our support team.
                                Can you describe your issue in a few sentences? This will help our team understand what's going on.
                                We'll start with some questions and get you to the right place.
                                let's get you some help. We're going to ask you some questions and then connect you with a member of our support team.
                                Can you describe your issue in a few sentences? This will help our team understand what's going on.
                                <div className="my-2"> 
                                    <h6><b>Mobile No :</b> {sarthiMobile}</h6>
                                    <h6><b>Email ID:</b>  {sarthiEmail} </h6>
                                    <b>Address:</b> 2nd floor, Shop No. 28-29, Ghayael Estate, L.H.Road Varachha, 395006, Surat India
                                </div>
                               
                            </div>
                        </div>
                        <div className="py-5 container-lg">
                            <div className="col-md justify-content-center row">
                                <div className="col-lg-8 ">
                                    <div className=" text-white p-4 rounded shadow" style={{ border: "1px solid rgb(121, 44, 143)" }}>
                                        <form className="">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="firstName" className="form-label" style={{ color: "black" }}>First Name *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="firstName"
                                                            name="firstName"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            placeholder="First Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lastName" className="form-label" style={{ color: "black" }}>Last Name *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="lastName"
                                                            name="lastName"
                                                            placeholder="Last Name"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="form-label" style={{ color: "black" }}>Email </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone" className="form-label" style={{ color: "black" }}>Phone *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="phone"
                                                            name="phone"
                                                            placeholder="Phone"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="message" className="form-label" style={{ color: "black" }}>Message</label>
                                                <textarea
                                                    className="form-control"
                                                    id="message"
                                                    name="message"
                                                    rows="4"
                                                    placeholder="Enter your message here..."
                                                    value={msg}
                                                    onChange={(e) => setMsg(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="gap-2 d-flex justify-content-end mb-3 mt-4">

                                                <Button
                                                    onClick={handleSubmit}
                                                    variant="contained"
                                                    color="success"
                                                    style={{ backgroundColor: "rgb(121 44 143)", width: "20%" }}
                                                >
                                                    Submit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={handleReset}
                                                    style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)", width: "20%" }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <Footer />
            </div>
        </>
    )
}
export default ContactUs