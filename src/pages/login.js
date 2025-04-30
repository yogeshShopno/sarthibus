import { useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const LoginDetail = () => {

    const location = useLocation();
    const [mobileNo, setMobileNo] = useState()
    const [password, setPassword] = useState()
    const handleMouseDownPassword = (event) => event.preventDefault();
    const [showPasswordIcon, setShowPasswordIcon] = useState(false)
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] = useState([]);
    const [otpAPI, setOtpAPI] = useState()
    const handleClickPassword = () => setShowPasswordIcon((show) => !show);
    const [otp, setOtp] = useState();
    const [showOtpBox, setShowOtpBox] = useState(false)
    const [loginBox, setLoginBox] = useState(true)
    const [timer, setTimer] = useState(30);
    const [resendEnabled, setResendEnabled] = useState(false);
    const { from, to, formattedDate, inputValue, redirectPath } = location.state || { to: '', from: '', formattedDate: '', inputValue: '', redirectPath: '' };

    const history = useHistory()

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
        selectedboardingValue = null,
        selecteddropingValue = null,
        bus_ac = '',
        droping_time = '',
        boarding_time = '',
        droping_date = '',
        boarding_date = '',
        busIcon = '',
        time_different = '',
        main_boarding_point_id = '',
        main_droping_point_id = '',
    } = location.state || {};

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setResendEnabled(true);
        }

    }, [timer]);

    const handleResendOtp = () => {
        setTimer(30);
        setResendEnabled(false);
        handelLoginOTP();
    };


    const handleOtp = () => {
        const newErrors = {};
        if (!otp) {
            newErrors.otp = 'please enter Otp';
            toast.error('Please enter Otp');
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            if (otp == otpAPI) {
                LoginAPI();
            } else {
                toast.error('Invalid OTP')
            }
        }
    };

    const LoginAPI = async () => {
        let data = new FormData();
        data.append('number', mobileNo)
        data.append('password', password)
        data.append('otp', otp)
        try {
            await axios.post("customer_login", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    setLoginData(res.data.data)
                    setShowOtpBox(true)
                    setLoginBox(false)
                    toast.success(res.data.message)

                    localStorage.setItem('UserID', res?.data?.user_data?.id)
                } else {
                    toast.error(res.data.message)
                }
            })
        }
        catch (error) {
            toast.error(error.data.message || 'API is not working');
        }
    }

    const handleLogin = () => {
        const newErrors = {};

        if (!mobileNo) {
            newErrors.mobileNo = 'Mobile No is required';
            toast.error('Mobile Number is required');
        } else if (mobileNo.length !== 10) {
            newErrors.mobileNo = 'Mobile number must be 10 digits';
            toast.error('Mobile number must be 10 digits');
        }
        if (!password) {
            newErrors.password = 'Password is required';
            toast.error('Password is required');
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            handelLoginOTP();

        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobileNo(value);

        }
    };

    const handelLoginOTP = async () => {
        let data = new FormData();
        data.append('number', mobileNo)
        data.append('password', password)
        try {
            await axios.post("customer_login", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    setLoginData(res.data.data)
                    toast.success(res.data.message);
                    localStorage.setItem('UserID', res?.data?.user_data?.id)

                    setTimeout(() => {

                        if (redirectPath === '/passenger-detail-view') {
                            localStorage.removeItem('redirectPath');
                            history.push('/passenger-detail-view', {
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
                                selectedboardingValue,
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

                        } else if (redirectPath === '/bus-list') {
                            localStorage.removeItem('redirectPath');
                            history.push({
                                pathname: '/bus-list',
                                state: { to, from, formattedDate, inputValue, redirectPath }
                            });
                        } else {

                            history.push({
                                pathname: '/',
                                state: { to, from, formattedDate, inputValue }
                            });
                        }
                    }, 2000);

                } else {
                    toast.error(res.data.message || 'Invalid Message');
                }
            })
        }
        catch (res) {
            toast.error(res.data.message);
        }
    }

    const handelBackLogin = () => {
        setLoginBox(true);
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
                            {loginBox &&
                                <div className="center-container" >
                                    <div className="form-wrapper">
                                        <form >
                                            <div className="my-4">
                                                <h5 style={{ color: "#6c2a7f", fontWeight: 700 }} className="fs-4 font-weight-bold">Log in</h5>
                                                <span style={{ color: "#6c2a7f", fontWeight: 500 }}  >Please fill your information below</span>
                                            </div>
                                            <div>
                                                <div className="my-4">
                                                    <OutlinedInput
                                                        type="tel"
                                                        value={mobileNo}
                                                        onChange={handleMobileChange}
                                                        startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                                                        sx={{ width: '100%' }}
                                                        size="small"
                                                        placeholder="Mobile Number"
                                                        inputProps={{
                                                            maxLength: 10
                                                        }}
                                                    />
                                                </div>
                                                <div className="my-4">
                                                    <FormControl variant="outlined" style={{ width: '100%' }}>
                                                        <OutlinedInput
                                                            value={password}
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
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleLogin();
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <div className="d-flex justify-content-end my-2">
                                                        <span style={{ color: "darkblue", cursor: "pointer", fontWeight: 500 }} onClick={() => history.push('/forgot-password')}>Forgot Password?</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <Button variant="contained" onClick={handleLogin} style={{ backgroundColor: "rgb(121 44 143)" }}>Login </Button>
                                                </div>
                                                <div className="d-flex justify-content-center mr-2 my-md-4 reg_bottom_text">
                                                    Don’t have an account?
                                                    <span style={{ color: "darkblue", fontWeight: 500, cursor: "pointer", marginLeft: "10px" }} onClick={() => {
                                                        if (redirectPath === '/passenger-detail-view') {
                                                            history.push('/sign-up', {
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
                                                                selectedboardingValue,
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
                                                            history.push('/sign-up')

                                                        }

                                                    }} > Register yourself</span>
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
export default LoginDetail