
import { useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const RegisterDetail = () => {
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordIcon, setShowPasswordIcon] = useState(false);
    const [errors, setErrors] = useState({});
    const [registerData, setRegisterData] = useState([]);
    const [userName, setUserName] = useState('');
    const [referral, setReferral] = useState('');
    const [emailID, setEmailID] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [registerBox, setRegisterBox] = useState(true);
    const [timer, setTimer] = useState(30);
    const [resendEnabled, setResendEnabled] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const [redirectPath, setRedirectPath] = useState('');

    const {
        passengerData = [],
        name = '',
        emailId = '',
        usermobileNo = '',
        selectedTotalSeat = [],
        totalPrice = 0,
        selectedTotalSeatPrice = [],
        bus_id = null,   
        bus_name = '',
        boarding_point_name = '',
        droping_point_name = '',
        selectedboadingValue = null,
        selecteddropingValue = null,
        bus_ac = '',
        droping_time = '',
        boarding_time = '',
        droping_date = '',
        boarding_date = '',
        busIcon = '',
        time_different = '',
        formattedDate = '',
        to = null,
        from = null,
        // remainingTime = 0,
        main_boarding_point_id = '',
        main_droping_point_id = '',
    } = location.state || {};

    useEffect(() => {

        setRedirectPath(localStorage.getItem('redirectPath'))
    },);
    const handleClickPassword = () => setShowPasswordIcon((show) => !show);

    const handleReferral = (value) => {
        setReferral(value)
        localStorage.setItem('referral', JSON.stringify(referral));
    }
    const handleOtp = () => {
        const newErrors = {};
        if (!otp) {
            newErrors.otp = 'please enter Otp';
            toast.error('Please enter Otp');
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            handelRegisterAPi();
        }
    };

    const handleResendOtp = () => {
        setTimer(30);
        setResendEnabled(false);
        handelRegisterAPi();
    };

    const handleNext = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!userName) {
            newErrors.userName = 'Name is required';
            toast.error('Name is required');
        }
        if (!mobileNo) {
            newErrors.mobileNo = 'Mobile Number is required';
            toast.error('Mobile Number is required');
        } else if (!/^\d{10}$/.test(mobileNo)) {
            newErrors.mobileNo = 'Mobile number must be 10 digits';
            toast.error('Mobile number must be 10 digits');
        }
        if (!password) {
            newErrors.password = 'Password is required';
            toast.error('Password is required');
        }
       
        if (emailID && !emailRegex.test(emailID)) {
            newErrors.emailID = 'Enter a valid email address';
            toast.error('Enter a valid email address');
        }

        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            handelRegisterAPi();
        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobileNo(value);
        }
    };

    const handelRegisterAPi = async () => {
        let data = new FormData();
        data.append('name', userName);
        data.append('number', mobileNo);
        data.append('password', password);
        data.append('email', emailID);
        data.append('otp', otp);
        data.append('referral_code', referral)

        try {
            await axios.post("customer_signup", data)
                .then((res) => {
                    if (res.data.success == true) {
                        setRegisterData(res.data.data);
                        toast.success(res.data.message);
                        setRegisterBox(false);
                        setShowOtpBox(true);
                        startOtpTimer();

                        if (res.data.message === 'Successfully register.') {
                            setTimeout(() => {
                                history.push('/login', {
                                    passengerData,
                                    name,
                                    emailId,
                                    mobileNo,
                                    selectedTotalSeat,
                                    totalPrice,
                                    selectedTotalSeatPrice,
                                    bus_id,
                                    bus_name,
                                    boarding_point_name,
                                    droping_point_name,
                                    selectedboadingValue,
                                    selecteddropingValue,
                                    bus_ac,
                                    droping_time,
                                    boarding_time,
                                    droping_date,
                                    boarding_date,
                                    busIcon,
                                    time_different,
                                    formattedDate,
                                    to,
                                    from,
                                    main_boarding_point_id,
                                    main_droping_point_id,
                                })
                            }, 3000);
                        }

                    } else {
                        toast.error(res.data.message);
                    }
                });
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    const startOtpTimer = () => {
        setTimer(30); 
        setResendEnabled(false);

        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(countdown);
                    setResendEnabled(true);
                    setOtp('');
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const handelBackRegister = () => {
        setRegisterBox(true);
        setShowOtpBox(false);
    };

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
                <section className="loginsection py-5">
                    <div className="container">
                        <div className="py-5 hero--content">
                            {registerBox &&
                                <div className="center-container" style={{ height: '100% ' }}>
                                    <div className="form-wrapper form_pge">
                                        <form>
                                            <div className="my-4">
                                                <h5 style={{ color: "#6c2a7f", fontWeight: 700 }} className="fs-4 font-weight-bold">Sign Up</h5>
                                                <span style={{ color: "#6c2a7f", fontWeight: 500 }}>Please fill your information below</span>
                                            </div>
                                            <div className="reg_sec_fld">
                                                <div className="my-4">
                                                    <TextField
                                                        required
                                                        id="outlined-number"
                                                        style={{ width: '100%' }}
                                                        size="small"
                                                        value={userName}
                                                        placeholder="Name"
                                                        onChange={(e) => setUserName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="my-4">
                                                    <OutlinedInput
                                                        type="tel"
                                                        value={mobileNo}
                                                        onChange={handleMobileChange}
                                                        startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                                                        style={{ width: '100%' }}
                                                        size="small"
                                                        placeholder="Mobile Number"
                                                        autoComplete="false"
                                                    />
                                                </div>
                                                <div className="my-4">
                                                    <TextField
                                                        required
                                                        id="outlined-email"
                                                        style={{ width: '100%' }}
                                                        size="small"
                                                        value={emailID}
                                                        placeholder="E-mail"
                                                        onChange={(e) => setEmailID(e.target.value)}
                                                        autoComplete="false"

                                                    />
                                                </div>
                                                <div className="my-4">
                                                    <FormControl variant="outlined" style={{ width: '100%' }}>
                                                        <OutlinedInput
                                                            value={password}
                                                            autoComplete="false"
                                                            size="small"
                                                            style={{ width: '100%' }}
                                                            placeholder="Password"
                                                            id="outlined-basic"
                                                            type={showPasswordIcon ? 'text' : 'password'}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickPassword}
                                                                    >
                                                                        {showPasswordIcon ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </FormControl>
                                                </div>

                                                <div className="my-4">
                                                    <TextField
                                                        required
                                                        id="outlined-referral"
                                                        style={{ width: '100%' }}
                                                        size="small"
                                                        value={referral}
                                                        placeholder="Referral"
                                                        onChange={(event) => handleReferral(event.target.value)}

                                                    />
                                                </div>

                                                <div className="d-flex justify-content-end">
                                                    <Button variant="contained" onClick={handleNext} style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Next</Button>
                                                </div>
                                                <div className="d-flex justify-content-center mr-2 my-4 reg_bottom_text">
                                                    Already have an account?
                                                    <span style={{ color: "darkblue", fontWeight: 500, cursor: "pointer", marginLeft: "10px" }} onClick={() => {
                                                        if (redirectPath === '/passnger-detail-view') {
                                                            history.push('/login', {
                                                                passengerData,
                                                                name,
                                                                emailId,
                                                                mobileNo,
                                                                selectedTotalSeat,
                                                                totalPrice,
                                                                selectedTotalSeatPrice,
                                                                bus_id,
                                                                bus_name,
                                                                boarding_point_name,
                                                                droping_point_name,
                                                                selectedboadingValue,
                                                                selecteddropingValue,
                                                                bus_ac,
                                                                droping_time,
                                                                boarding_time,
                                                                droping_date,
                                                                boarding_date,
                                                                busIcon,
                                                                time_different,
                                                                formattedDate,
                                                                to,
                                                                from,
                                                                main_boarding_point_id,
                                                                main_droping_point_id,
                                                            })
                                                        } else {
                                                            history.push('/login');
                                                        }
                                                    }

                                                    }>
                                                        Login to your account
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }

                            {/* OTP Form */}
                            {showOtpBox &&
                                <div className="center-container">
                                    <div className="form-wrapper forgot_form">
                                        <form>
                                            <div className="my-4">
                                                <h5 style={{ color: "#6c2a7f", fontWeight: 700 }} className="fs-4 font-weight-bold">Enter OTP</h5>
                                                <span style={{ color: "#6c2a7f", fontWeight: 500 }}>Please enter the OTP sent to your number</span>
                                            </div>
                                            <div>
                                                <div className="mt-4 mb-1">
                                                    <TextField
                                                        required
                                                        type="number"
                                                        id="outlined-number"
                                                        sx={{ width: '100%' }}
                                                        size="small"
                                                        value={otp}
                                                        placeholder="Enter OTP"
                                                        onChange={(e) => setOtp(e.target.value)}
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-end mb-4">
                                                    <span
                                                        style={{ color: resendEnabled ? 'blue' : "gray", fontWeight: 500, cursor: "pointer" }}
                                                        onClick={resendEnabled ? handleResendOtp : null}
                                                    >
                                                        {resendEnabled ? 'Re-send OTP' : `Re-send OTP in ${timer}s`}
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-center gap-4">
                                                    <Button onClick={handelBackRegister} style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Back</Button>
                                                    <Button variant="contained" onClick={handleOtp} style={{ backgroundColor: "rgb(121 44 143)" }}>Register</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default RegisterDetail;
