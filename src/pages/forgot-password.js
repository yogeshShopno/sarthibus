import { useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import OTPInput from "react-otp-input";

const ForgotPasswordDetail = () => {
    const busIcon = process.env.PUBLIC_URL + 'assets/images/bus-icon.svg';
    const [mobileNo, setMobileNo] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const [showPasswordIcon, setShowPasswordIcon] = useState(false)
    const [errors, setErrors] = useState({});
    const [userName, setUserName] = useState()
    const [emailID, setEmailID] = useState()
    const [otpAPI, setOtpAPI] = useState()
    const handleClickPassword = () => setShowPasswordIcon((show) => !show);
    const history = useHistory()
    const [otp, setOtp] = useState("");
    const [showOtpBox, setShowOtpBox] = useState(false)
    const [forgotBox, setForgotBox] = useState(true)
    const [timer, setTimer] = useState(30);
    const [resendEnabled, setResendEnabled] = useState(false);

    const handleResendOtp = () => {
        setTimer(30);
        setResendEnabled(false);
        handleForgotAPI();
    };

    const handleOtp = () => {
        const newErrors = {};
        if (!otp) {
            newErrors.otp = 'please enter Otp';
            toast.error('Please enter Otp');
        }
        if (!password) {
            newErrors.password = 'Password is required';
            toast.error('Password is required');
        }
       
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            ForgotPasswordConfirm();
           
        }
    };
    const ForgotPasswordConfirm = async () => {
        let data = new FormData();
        data.append('number', mobileNo);
        data.append('new_password', password);
        data.append('otp', otp);
        try {
            const res = await axios.post("customer_reset_password", data);
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    history.push('/login');   
                }, 2000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
        }
    };


    const handleForgotNext = () => {
        const newErrors = {};

        if (!mobileNo) {
            newErrors.mobileNo = 'mobile No is required';
            toast.error('Mobile Number is required');
        }

        else if (!/^\d{10}$/.test(mobileNo)) {
            newErrors.mobileNo = 'mobile number must be 10 digits';
            toast.error('Mobile number must be 10 digits');
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
             setTimer(30);
            handleForgotAPI()
        }
    };

    const handleForgotAPI = async () => {
        let data = new FormData();
        data.append('number', mobileNo)
      
        try {
            await axios.post("customer_reset_password", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    setShowOtpBox(true)
                    setForgotBox(false)
                    setOtpAPI(res.data.data.otp)
                    toast.success(res.data.message);
                    startOtpTimer()
                } else {
                    toast.error(res.data.message || 'Invalid Message');
                }
            })
        }
        catch (res) {
            toast.error(res.data.message);
        }
    }

    const startOtpTimer = () => {
        setTimer(30);  
        setResendEnabled(false);

        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(countdown);
                    setResendEnabled(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const handelBackRegister = () => {
        setForgotBox(true);
        setShowOtpBox(false);
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
                <section className="loginsection py-5">

                    <div className="container">
                        <div className="py-5 hero--content">
                            {forgotBox &&
                                <div className="center-container" >
                                    <div className="form-wrapper forgot_form">
                                        <form >
                                            <div className="my-4">
                                                <h5 style={{ color: "#6c2a7f", fontWeight: 700 }} className="fs-4 font-weight-bold">Forgot Password</h5>
                                            </div>
                                            <div>
                                                <div className="my-4 ">
                                                    <OutlinedInput
                                                        type="number"
                                                        value={mobileNo}
                                                        onChange={(e) => setMobileNo(e.target.value)}
                                                        startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                                                        sx={{ width: '100%' }}

                                                        size="small"
                                                        placeholder="Mobile Number"
                                                        autoComplete="false"
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <Button variant="contained" onClick={handleForgotNext} style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Next</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>}

                            {showOtpBox &&
                                <div className="center-container" >
                                    <div className="form-wrapper otp_form">
                                        <form >
                                            <div className="my-4">
                                                <h5 style={{ color: "#6c2a7f", fontWeight: 700 }} className="fs-4 font-weight-bold">Enter OTP</h5>
                                                <span style={{ color: "#6c2a7f", fontWeight: 500 }}  >Please enter the OTP sent to your number</span>
                                            </div>
                                            <div>
                                                <div className="mt-4 mb-1" style={{ display: 'flex' }}>
                                                    <OTPInput
                                                        value={otp}
                                                        onChange={setOtp}
                                                        numInputs={6}
                                                        containerStyle={{
                                                            display: 'flex',
                                                            gap: '0.5rem',
                                                            width: '100%',
                                                        }}
                                                        inputStyle={{
                                                            width: "100%",
                                                            fontSize: "inherit",
                                                            borderBottom: "1px solid rgb(121, 44, 143)",
                                                        }}
                                                        renderInput={(props) => <input {...props} />}
                                                    />

                                                </div>
                                                <div className="my-4">
                                                    <FormControl variant="outlined" style={{ width: '100%' }}>
                                                        <OutlinedInput
                                                            value={password}
                                                            autoComplete="false"
                                                            size="small"
                                                            sx={{ width: '100%' }}
                                                            placeholder="Password"
                                                            id="outlined-basic"
                                                            type={showPasswordIcon ? 'text' : 'password'}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickPassword}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                    >
                                                                        {showPasswordIcon ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </FormControl>

                                                </div>
                                                <div className="d-flex justify-content-end mb-4">
                                                    <span
                                                        style={{ color: resendEnabled ? 'blue' : "gray", fontWeight: 500, cursor: "pointer" }}
                                                        onClick={resendEnabled ? handleResendOtp : null}
                                                    >
                                                        {resendEnabled ? 'Re-send otp' : `Re-send otp in ${timer}s`}
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-center gap-4">
                                                    <Button onClick={handelBackRegister} style={{ color: "rgb(121 44 143)", border: '1px solid rgb(121 44 143)' }}>Back</Button>
                                                    <Button variant="contained" onClick={handleOtp} style={{ backgroundColor: "rgb(121 44 143)" }}>Submit</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default ForgotPasswordDetail