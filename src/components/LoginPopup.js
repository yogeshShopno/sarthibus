import React, { useCallback, useState, useEffect } from "react";
import { FaBusAlt } from "react-icons/fa";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { MdLocationCity, MdPersonAdd } from "react-icons/md";
import { AiOutlineMobile } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import debounce from 'lodash.debounce';

const LoginPopup = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [mobileNo, setMobileNo] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [from, setFrom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(0);
    const [open, setOpen] = useState(false)


    useEffect(() => {
        debouncedCityList();
        cityList('', 0);
        window.scrollTo(0, 0);

    }, []);




    const cityList = async (searchTerm = '', start = 0) => {
        if (loading) return; // Prevent multiple simultaneous API calls

        const data = new FormData();
        data.append('city_name', searchTerm);
        data.append('start', start);
        data.append('limit', 50); // This ensures the server is requested to return a maximum of 50 items
        data.append('calling_type', 1);

        try {
            const res = await axios.post("city_list", data);
            const allCities = res.data.data.all_city || [];

            // Slice to ensure only the first 50 cities are processed
            const newCities = allCities.slice(0, 50);

            if (start === 0) {
                setCities(newCities);
            } else {
                setCities((prevCities) => [...prevCities, ...newCities]);
            }
            // setCities(newCities);
        } catch (error) {
            console.error('Error fetching city list:', error);
        } finally {

        }
    };


    const loadMoreCities = () => {
        setStart((prevStart) => {
            const newStart = prevStart + 50;
            cityList('', newStart); // Load next 50 cities
            return newStart;
        });
    };


    const handleScroll = (event) => {
        // const { scrollTop, scrollHeight, clientHeight } = event.target;
        // if (scrollHeight - scrollTop <= clientHeight + 50 && !loading) {
        //     cityList(busInputValue, start);
        // }
        const target = event.target;
        const bottom =
            target.scrollHeight === target.scrollTop + target.clientHeight;

        if (bottom && !loading) {
            // Fetch the next batch of cities
            cityList('', start);
        }
        loadMoreCities();
    };


    const debouncedCityList = useCallback(
        debounce((searchTerm) => {
            setCities([]);
            cityList(searchTerm, 0);
        }, 300),
        []
    );

    const handleInputChange = (newInputValue) => {

        if (newInputValue) {
            debouncedCityList(newInputValue);
        }
    };


    const fetchCityListInstant = async () => {
        await cityList('');
    };



    const handleMobileChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, "");
        if (value.length <= 10) {
            setMobileNo(value);
        }
    };


    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleLogin = async () => {
        if (mobileNo.length !== 10) return;
        setIsLoading(true);
        setStep(2);

        let data = new FormData();
        data.append('number', mobileNo || "")
        try {
            await axios.post("customer_web_login", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message);
                    // localStorage.setItem('UserID', res?.data?.user_data?.id)

                } else {
                    toast.error(res.data.message || 'Invalid Message');
                }
            })
        }
        catch (res) {
            toast.error(res.data.message);
        } finally {
            setIsLoading(false);

        }

    };

    const handleOtpSubmit = async () => {
        const otpValue = otp.join("");
        if (otpValue.length !== 6) return;
        setIsLoading(true);

        let data = new FormData();
        data.append('number', mobileNo || "")

        data.append('otp', otpValue || "")
        try {
            await axios.post("customer_web_login", data, {
            }).then((res) => {
                if (res.data.success === true) {
                    toast.success(res?.data?.message);
                    const userId = res?.data?.user_data?.id;
                    console.log(res?.data?.user_data, res?.data?.user_data?.id); // Logs the UserID for debugging
                    localStorage.setItem('UserID', res?.data?.user_data?.id);

                    if (userId) {
                        localStorage.setItem('UserID', userId);




                    }
                    // Condition for 'type 1'
                    if (res?.data?.user_data?.type == "1") {
                        onClose(); // Fixed typo from 'onclose'
                    }
                    setStep(3);

                } else {
                    toast.error(res.data.message || 'Invalid Message');
                }
            });

        }
        catch (res) {
            toast.error(res.data.message);
        } finally {
            setIsLoading(false);

        }
    };

    const handleDetailsSubmit = async () => {
        if (!from) return; // Changed to check 'from' instead of cityName
        setIsLoading(true);
        let data = new FormData();
        data.append('referral_code', referralCode || "")
        data.append('number', mobileNo || "")

        data.append('city_id', from?.city_id || "")
        data.append('type', "2" || "")


        try {
            await axios.post("customer_web_login", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message);
                    if (res?.data?.user_data?.type == "1") {
                        onClose() 
                    }
                    setStep(3);
                } else {
                    toast.error(res.data.message || 'Invalid Message');
                }
            })
        }
        catch (res) {
            toast.error(res.data.message);
        } finally {
            setIsLoading(false);

        }
    };



    const goBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const getStepTitle = () => {
        switch (step) {
            case 1: return "Welcome !";
            case 2: return "Verify Mobile";
            case 3: return "Complete Profile";
            default: return "Log in";
        }
    };


    return (
        <>
            <div
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(4px)",
                    zIndex: 100,
                    animation: "fadeIn 0.3s ease-out"
                }}
            >
                <div className="container-fluid px-3 px-md-0">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                            <div
                                className="bg-white rounded-4 shadow-lg position-relative overflow-hidden"
                                style={{
                                    minHeight: "420px",
                                    maxWidth: "400px",
                                    margin: "0 auto",
                                    animation: "slideUp 0.3s ease-out"
                                }}
                            >
                                {/* Header */}
                                <div
                                    className="px-4 py-3 position-relative"
                                    style={{
                                        background: "linear-gradient(135deg, #6c2a7f 0%, #8e44ad 100%)"
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        {step > 1 ? (


                                            <div className="text-center text-white d-flex justify-content-center align-items-center gap-2">


                                                <IoMdArrowBack
                                                    onClick={goBack}
                                                    size={22}
                                                    className="text-white"
                                                    style={{ cursor: "pointer", opacity: 0.9 }}
                                                />



                                            </div>




                                        ) : (
                                            <div style={{ width: "22px" }}></div>
                                        )}

                                        <div className="text-center text-white d-flex justify-content-center align-items-center gap-2">
                                            <FaBusAlt size={24} />
                                            <p className=" fw-semibold m-0 text-white" style={{ margin: "0", fontSize: "1.3rem" }}>
                                                {getStepTitle()}
                                            </p>

                                        </div>


                                        <IoMdClose
                                            onClick={onClose}
                                            size={22}
                                            className="text-white"
                                            style={{ cursor: "pointer", opacity: 0.9 }}
                                        />
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="d-flex gap-2">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="flex-fill rounded-pill"
                                                style={{
                                                    height: "2px",
                                                    backgroundColor: i <= step ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)",
                                                    transition: "all 0.3s ease"
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 pb-2" >
                                    {/* Title */}


                                    {/* Step 1: Mobile Number */}
                                    {step === 1 && (
                                        <div className="d-flex flex-column" style={{ minHeight: "180px" }}>
                                            <div className="mb-4">
                                                <div className="input-group">
                                                    <span
                                                        className="input-group-text bg-white border-end-0 rounded-start-3"
                                                        style={{
                                                            borderColor: "#e0e0e0",
                                                            padding: "10px 12px",
                                                            fontSize: "0.9rem"
                                                        }}
                                                    >
                                                        <AiOutlineMobile size={18} className="text-muted me-1" />
                                                        +91
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        className="form-control border-start-0 rounded-end-3"
                                                        value={mobileNo}
                                                        onChange={handleMobileChange}
                                                        placeholder="Enter mobile number"
                                                        style={{
                                                            borderColor: "#e0e0e0",
                                                            fontSize: "0.95rem",
                                                            padding: "10px 14px"
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = "#6c2a7f";
                                                            e.target.style.boxShadow = "0 0 0 0.15rem rgba(108, 42, 127, 0.25)";
                                                            e.target.previousElementSibling.style.borderColor = "#6c2a7f";
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = "#e0e0e0";
                                                            e.target.style.boxShadow = "none";
                                                            e.target.previousElementSibling.style.borderColor = "#e0e0e0";
                                                        }}
                                                        maxLength={10}
                                                    />
                                                </div>
                                                {mobileNo.length > 0 && mobileNo.length < 10 && (
                                                    <div className="text-danger mt-2" style={{ fontSize: "0.8rem" }}>
                                                        Please enter a valid 10-digit mobile number
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-auto">
                                                <button
                                                    className="btn w-100 rounded-3 fw-semibold"
                                                    onClick={handleLogin}
                                                    disabled={mobileNo.length !== 10 || isLoading}
                                                    style={{
                                                        backgroundColor: "#6c2a7f",
                                                        borderColor: "#6c2a7f",
                                                        color: "white",
                                                        padding: "10px 20px",
                                                        fontSize: "0.95rem",
                                                        opacity: mobileNo.length !== 10 || isLoading ? 0.6 : 1,
                                                        transition: "all 0.2s ease"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!e.target.disabled) {
                                                            e.target.style.backgroundColor = "#5a2369";
                                                            e.target.style.transform = "translateY(-1px)";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!e.target.disabled) {
                                                            e.target.style.backgroundColor = "#6c2a7f";
                                                            e.target.style.transform = "translateY(0)";
                                                        }
                                                    }}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                            Sending OTP...
                                                        </>
                                                    ) : (
                                                        "Continue"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}


                                    {/* Step 2: OTP Verification */}
                                    {step === 2 && (
                                        <div className="d-flex flex-column" style={{ minHeight: "180px" }}>
                                            <div>
                                                <div className="text-center mb-4">
                                                    <BsShieldCheck size={40} style={{ color: "#6c2a7f" }} className="mb-3" />
                                                </div>

                                                <div className="d-flex justify-content-center gap-2 mb-4">
                                                    {otp.map((digit, index) => (
                                                        <input
                                                            key={index}
                                                            id={`otp-${index}`}
                                                            type="text"
                                                            value={digit}
                                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                                            className="form-control text-center fw-bold rounded-3"
                                                            style={{
                                                                width: "42px",
                                                                height: "42px",
                                                                fontSize: "1.1rem",
                                                                borderColor: "#e0e0e0",
                                                                borderWidth: "2px"
                                                            }}
                                                            onFocus={(e) => {
                                                                e.target.style.borderColor = "#6c2a7f";
                                                                e.target.style.boxShadow = "0 0 0 0.15rem rgba(108, 42, 127, 0.25)";
                                                            }}
                                                            onBlur={(e) => {
                                                                e.target.style.borderColor = "#e0e0e0";
                                                                e.target.style.boxShadow = "none";
                                                            }}
                                                            maxLength={1}
                                                        />
                                                    ))}
                                                </div>

                                                <div className="text-center mb-4">
                                                    <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                                                        Didn't receive the code?
                                                        <span
                                                            className="ms-1 fw-semibold"
                                                            style={{
                                                                color: "#6c2a7f",
                                                                cursor: "pointer",
                                                                textDecoration: "none"
                                                            }}
                                                            onClick={() => { handleLogin() }}
                                                            onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                                                            onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                                                        >
                                                            Resend
                                                        </span>
                                                    </small>
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <button
                                                    className="btn w-100 rounded-3 fw-semibold"
                                                    onClick={handleOtpSubmit}
                                                    disabled={otp.join("").length !== 6 || isLoading}
                                                    style={{
                                                        backgroundColor: "#6c2a7f",
                                                        borderColor: "#6c2a7f",
                                                        color: "white",
                                                        padding: "10px 20px",
                                                        fontSize: "0.95rem",
                                                        opacity: otp.join("").length !== 6 || isLoading ? 0.6 : 1,
                                                        transition: "all 0.2s ease"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!e.target.disabled) {
                                                            e.target.style.backgroundColor = "#5a2369";
                                                            e.target.style.transform = "translateY(-1px)";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!e.target.disabled) {
                                                            e.target.style.backgroundColor = "#6c2a7f";
                                                            e.target.style.transform = "translateY(0)";
                                                        }
                                                    }}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                            Verifying...
                                                        </>
                                                    ) : (
                                                        "Verify & Continue"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Additional Details */}
                                    {step === 3 && (
                                        <div className="d-flex flex-column  justify-content-betweeb " style={{ minHeight: "180px" }}>
                                            <div>
                                                <div className="mb-3">
                                                    <div className="input-group">
                                                        <span
                                                            className="input-group-text bg-white border-end-0 rounded-start-3"
                                                            style={{
                                                                borderColor: "#e0e0e0",
                                                                padding: "10px 12px"
                                                            }}
                                                        >
                                                            <MdPersonAdd size={18} className="text-muted" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control border-start-0 rounded-end-3"
                                                            value={referralCode}
                                                            onChange={(e) => setReferralCode(e.target.value)}
                                                            placeholder="Referral code (optional)"
                                                            style={{
                                                                borderColor: "#e0e0e0",
                                                                fontSize: "0.95rem",
                                                                padding: "10px 14px"
                                                            }}
                                                            onFocus={(e) => {
                                                                e.target.style.borderColor = "#6c2a7f";
                                                                e.target.style.boxShadow = "0 0 0 0.15rem rgba(108, 42, 127, 0.25)";
                                                                e.target.previousElementSibling.style.borderColor = "#6c2a7f";
                                                            }}
                                                            onBlur={(e) => {
                                                                e.target.style.borderColor = "#e0e0e0";
                                                                e.target.style.boxShadow = "none";
                                                                e.target.previousElementSibling.style.borderColor = "#e0e0e0";
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-4">


                                                    <form className="fromtoform">

                                                        <div className=" flex-grow-1 form-group">

                                                            <Autocomplete
                                                                id="from-city"
                                                                options={cities}
                                                                getOptionLabel={(option) => {
                                                                    const labels = [
                                                                        option.city_name,
                                                                        option.taluka_name,
                                                                        option.jilla_name,
                                                                        option.state_name,
                                                                    ].filter(Boolean);
                                                                    return labels.join(", ");
                                                                }}
                                                                value={from}
                                                                onChange={(event, newValue) => {
                                                                    console.log(newValue)
                                                                    setFrom(newValue); // Set the selected city
                                                                    setOpen(false); // Close the dropdown after selection
                                                                }}

                                                                onInputChange={(event, newInputValue) => {
                                                                    handleInputChange(newInputValue);
                                                                }}
                                                                onFocus={() => {
                                                                    if (cities.length === 0) cityList('', 0);
                                                                    fetchCityListInstant('');
                                                                }}
                                                                onScroll={handleScroll}
                                                                onKeyDown={(event) => {
                                                                    if (event.key === 'Enter' && cities.length > 0) {
                                                                        setFrom(cities[0]); // Automatically select the first city on Enter
                                                                        setOpen(false); // Close dropdown on selection
                                                                    }
                                                                }}
                                                                ListboxProps={{
                                                                    onScroll: handleScroll
                                                                }}
                                                                renderOption={(props, option, state) => (
                                                                    <>
                                                                        <li
                                                                            {...props}
                                                                            style={{ display: 'grid', padding: '8px', cursor: 'pointer' }}
                                                                            onClick={() => {
                                                                                setFrom(option);
                                                                                setOpen(false); // Close the dropdown when an option is clicked
                                                                            }}
                                                                        >
                                                                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                                                                {option.city_name}
                                                                            </span>
                                                                            <span style={{ fontSize: '0.7rem', color: '#666' }}>
                                                                                {[option.taluka_name, option.jilla_name, option.state_name].filter(Boolean).join(", ")}
                                                                            </span>
                                                                        </li>
                                                                        {loading && state.index === cities.length - 1 && (
                                                                            <div style={{ textAlign: 'center', padding: '8px' }}>
                                                                                <CircularProgress size={24} />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        size="small"
                                                                        onFocus={() => setOpen(true)} // Make sure to open the dropdown on focus
                                                                    />
                                                                )}
                                                            />


                                                        </div>

                                                    </form>


                                                    {!from && (
                                                        <div className="text-danger mt-2" style={{ fontSize: "0.8rem" }}>
                                                            City selection is required
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <button
                                                    className="btn w-100 rounded-3 fw-semibold"
                                                    onClick={handleDetailsSubmit}
                                                    disabled={!from || isLoading}
                                                    style={{
                                                        backgroundColor: "#6c2a7f",
                                                        borderColor: "#6c2a7f",
                                                        color: "white",
                                                        padding: "10px 20px",
                                                        fontSize: "0.95rem",
                                                        opacity: !from || isLoading ? 0.6 : 1,
                                                        transition: "all 0.2s ease"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!e.target.disabled) {
                                                            e.target.style.backgroundColor = "#5a2369";
                                                            e.target.style.transform = "translateY(-1px)";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!e.target.disabled) {
                                                            e.target.style.backgroundColor = "#6c2a7f";
                                                            e.target.style.transform = "translateY(0)";
                                                        }
                                                    }}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        "Continue"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
            @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
            }

            @keyframes slideUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
            }

            @media (max-width: 480px) {
            .otp-input {
                width: 36px !important;
                height: 36px !important;
                font-size: 1rem !important;
            }
            }
        `}</style>
        </>
    );
};

export default LoginPopup;