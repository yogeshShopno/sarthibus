import { useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const LoginPopup = () => {

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





    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobileNo(value);

        }
    };




    return (
        <>

<section className="loginsection py-5 position-fixed top-0 left-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-index-9999">

    <div className="container">
        <div className="py-5 hero--content">
            {loginBox && (
                <div className="center-container bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
                    <form>
                        <div className="my-4">
                            <h5 style={{ color: "#6c2a7f", fontWeight: 700 }} className="fs-4 font-weight-bold">Log in</h5>
                            <span style={{ color: "#6c2a7f", fontWeight: 500 }}>Please fill your information below</span>
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

                            <div className="d-flex justify-content-end">
                                <Button variant="contained"  style={{ backgroundColor: "rgb(121 44 143)" }}>Login </Button>
                            </div>

                        </div>
                    </form>
                </div>
            )}
        </div>
    </div>
</section>



        </>
    )
}
export default LoginPopup