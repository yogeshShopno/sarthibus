
import { Button } from "@mui/material";
import Header from "../components/header"
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuClock2 } from "react-icons/lu";
import { PiWalletBold } from "react-icons/pi";
import Footer from "../components/footer";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Loader from "../components/loader";
import App from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FaCheckCircle } from "react-icons/fa";

const PassengerView = () => {
    const busIconCoupon = process.env.PUBLIC_URL + 'assets/images/bus icon coupon.png';
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [orderId, setOrderId] = useState('');
    const location = useLocation();
    const [finalAmount, setFinalAmount] = useState(0);
    const [finalAmountApi, setFinalAmountApi] = useState(0);
    const [GSTAmountApi, setGSTAmountApi] = useState(0);
    const [serviceChargeAPI, setServiceChargeAPI] = useState(0);
    const [finalSarthiDis, setFinalSarthiDis] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [couponData, setCouponData] = useState([])
    const [openPopupBoxConfirm, setOpenPopUpBoxConfirm] = useState(false)
    const [errors, setErrors] = useState({});
    const [couponOpen, setCouponOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [walletAmount, setWalletAmount] = useState(0);
    const [facebook, setFacebook] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const {
        passengerData = [],
        name = '',
        emailId = '',
        mobileNo = '',
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
        formattedDate = '',
        to = '',
        from = '',
        inputValue = '',
        main_boarding_point_id = '',
        main_droping_point_id = '',
        booking_type
    } = location.state || {};
    const history = useHistory();

    const timerEnd = localStorage.getItem('timerEnd');

    const [timer, setTimer] = useState(timerEnd);



    useEffect(() => {
        const unblock = history.block((location, action) => {
            if (openPopupBoxConfirm) {
                if (action === 'POP') {
                    return "Are you sure you want to leave this page? Changes may not be saved.";
                }
                return false;
            }
        });

        return () => {
            unblock();
        };
    }, [history, openPopupBoxConfirm]);

    useEffect(() => {

        if (timer) {
            const remainingTime = timerEnd - Date.now();

            if (remainingTime > 0) {
                const minutes = Math.floor(remainingTime / 60000);
                const seconds = Math.floor((remainingTime % 60000) / 1000);
            } else if (remainingTime < 0) {
                toast.error('Time expired. Please try again.');
                localStorage.removeItem('timerEnd');
                history.push('/')
            }
        } else {
        }
    },)

    useEffect(() => {

    }, [bus_id])

    useEffect(() => {
        const data = localStorage.getItem('UserID');
        if (!data) {
            localStorage.setItem('redirectPath', location.pathname);
        }
        const handlePopState = (event) => {
            history.go(1);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [history, location]);


    const handleShowCoupon = () => {
        setCouponOpen(true)
    }
    const handleHideCoupon = () => {
        setCouponOpen(false)
    }

    // useEffect(() => {

    //     const x = totalPrice - discount  ;
    //     setFinalAmount(x);

    //     const y = finalAmount - walletAmount  ;
    //     console.log('finalAmount', GSTAmountApi, serviceChargeAPI,x,y)


    //     setFinalAmountApi(y);
    // }, [finalAmount,  finalAmountApi])

    useEffect(() => {
        couponList(bus_id)

    }, [bus_id])

    useEffect(() => {
        const data = localStorage.getItem('UserID');
        if (data !== null) {
            getWalletAmount();
        }
    }, [discount])


    useEffect(() => {
        const data = localStorage.getItem('UserID');

    }, [finalAmount, bus_id])


    const processToPayment = () => {
        const newErrors = {};
        const userID = localStorage.getItem('UserID');

        if (!userID) {

            newErrors.userID = 'Please Login First';

            const formData = {
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
            };
            localStorage.setItem('formData', JSON.stringify(formData));
            localStorage.setItem('redirectPath', location.pathname);
            toast.error('Please Login To Book Ticket');

            setTimeout(() => {
                history.push({
                    pathname: '/login',
                    state: {
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
                        inputValue,
                        main_boarding_point_id,
                        main_droping_point_id,
                    }
                });
            }, 2000);
            return;
        }

        if (!name) newErrors.name = 'Name is required';
        if (!mobileNo) newErrors.mobileNo = 'Mobile number is required';
        if (!selectedTotalSeat) newErrors.selectedTotalSeat = 'Please select the number of seats';
        if (!totalPrice) newErrors.totalPrice = 'Total price is missing';
        if (!selectedTotalSeatPrice) newErrors.selectedTotalSeatPrice = 'Seat price is missing';
        if (!bus_id) newErrors.bus_id = 'Bus ID is missing';
        if (!bus_name) newErrors.bus_name = 'Bus name is missing';
        if (!boarding_point_name) newErrors.boarding_point_name = 'Boarding point is required';
        if (!droping_point_name) newErrors.droping_point_name = 'Dropping point is required';
        if (!selectedboardingValue) newErrors.selectedboardingValue = 'Boarding value is required';
        if (!selecteddropingValue) newErrors.selecteddropingValue = 'Dropping value is required';
        if (!bus_ac) newErrors.bus_ac = 'Bus AC status is missing';
        if (!droping_time) newErrors.droping_time = 'Dropping time is missing';
        if (!boarding_time) newErrors.boarding_time = 'Boarding time is missing';
        if (!droping_date) newErrors.droping_date = 'Dropping date is required';
        if (!boarding_date) newErrors.boarding_date = 'Boarding date is required';
        if (!formattedDate) newErrors.formattedDate = 'Formatted date is missing';
        if (!to) newErrors.to = 'Destination is required';
        if (!from) newErrors.from = 'Origin is required';
        if (!main_boarding_point_id) newErrors.main_boarding_point_id = 'Main boarding point ID is required';
        if (!main_droping_point_id) newErrors.main_droping_point_id = 'Main dropping point ID is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log(newErrors);
            toast.error('Please fill in all the required fields before proceeding');
            return;
        }
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;

        if (isValid) {
            submitTicket();

        }
    };

    const Razor = async () => {
        let data = new FormData();
        let vData = new FormData();
        setLoading(true);
        try {
            const remainingTime = Math.floor((timer - Date.now()) / 1000);

            data.append('user_id', localStorage.getItem('UserID'))
            // data.append('coupon_amount', discount)
            data.append('total_main_price', finalAmountApi || finalAmount)
            // data.append('remaining_Time', 5)
            data.append('remaining_Time', remainingTime)
            data.append('name', name)
            data.append('contact', mobileNo)
            data.append('email', emailId)
            data.append('booking_date', formattedDate)


            const response = await axios.post("ticket_wallet_amount_data_pay", data);
            if (response.data.success) {
                const { orderId_data } = response.data.data;
                setFinalAmountApi(response.data.total_main_price)
                setOrderId(response.data.orderId);

                const decodedData = JSON.parse(orderId_data); // Decode JSON string
                let amountApi = decodedData.amount;
                let key = decodedData.key;

                let rzp;

                if (decodedData) {

                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';


                    decodedData.handler = async function (response) {
                        if (response.razorpay_payment_id) {
                            vData.append('booking_date', formattedDate);
                            vData.append('user_id', localStorage.getItem('UserID'));
                            vData.append('total_main_price', amountApi);

                            try {
                                const res = await axios.post("ticket_wallet_amount_data_pay_verify", vData);

                                if (res.data.success === true) {
                                    submitTicket(response.razorpay_payment_id);
                                } else {
                                    toast.error(res.data.message);
                                }
                            } catch (err) {
                                toast.error(err.message || "Verification failed.");
                            }
                        } else {
                            toast.error("Payment failed");
                        }
                    };

                    script.onload = () => {
                        if (!key) {
                            toast.error("Payment key not available");
                            return;
                        }

                        const rzp = new window.Razorpay(decodedData);
                        rzp.open();

                    };

                    decodedData.modal = {
                        // On modal close
                        ondismiss: function () {
                            if (rzp) {
                                rzp.close();
                            }
                        }
                    };
                    document.body.appendChild(script);

                } else {
                    toast.error(response.data.message || "Failed to fetch payment key");
                }
            } else {
                toast.error(response.data.message || "Failed to fetch data.");
            }
        } catch (error) {
            toast.error(error.message || "Error fetching data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {

            if (timer <= 0) {
                clearInterval(interval);
                toast.error('Time expired. Please try again.');
                history.push('/')

            } else {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);
    const submitTicket = async () => {
        setLoading(true);
        let data = new FormData();

        data.append('booking_type', booking_type);
        data.append('bus_id', bus_id || '');
        data.append('bus_name', bus_name || '');
        data.append('user_id', localStorage.getItem('UserID') || '');
        data.append('boarding_point_id', selectedboardingValue?.boarding_id || '');
        data.append('boarding_point_name', selectedboardingValue.boarding_sub_route_name);
        data.append('boarding_point_time', selectedboardingValue.boarding_time);
        data.append('droping_point_id', selecteddropingValue?.droping_id || '');
        data.append('droping_point_name', selecteddropingValue.droping_sub_route_name);
        data.append('droping_point_time', selecteddropingValue.droping_time);
        data.append('boarding_id', from?.city_id || '');
        data.append('droping_id', to?.city_id || '');
        data.append('booking_date', formattedDate);
        data.append('contact_name', name);
        data.append('contact_email_id', emailId);
        data.append('contact_details', mobileNo);
        data.append('sub_total', totalPrice);
        data.append('tax_amount', 0);
        data.append('discount', parseInt(discount));
        data.append('sarthibus_discount', finalSarthiDis);
        data.append('total_gst_amount', GSTAmountApi);
        data.append('total_service_charge', serviceChargeAPI);
        data.append('wallet', walletAmount);
        data.append('final_price', finalAmountApi);
        data.append('payment_method', '1');
        data.append('transaction_id', '');
        data.append('main_boarding_point_id', main_boarding_point_id);
        data.append('main_droping_point_id', main_droping_point_id);
        data.append('order_id', '');
        data.append('created_type', '2');
        data.append('booking_type', booking_type);

        for (let i = 0; i < selectedTotalSeat.length; i++) {
            data.append(`seat_number[${i}]`, selectedTotalSeat[i]);
        }

        for (let i = 0; i < selectedTotalSeatPrice.length; i++) {
            data.append(`seat_price[${i}]`, selectedTotalSeatPrice[i]);
        }

        for (let i = 0; i < passengerData.length; i++) {
            data.append(`name[${i}]`, passengerData[i]?.name);
            data.append(`age[${i}]`, passengerData[i]?.age);
            data.append(`gender[${i}]`, passengerData[i]?.gender);
        }

        try {
            const res = await axios.post("add_ticket_hold", data);

            if (res.data.success) {
                toast.success(res.data.message);
                setLoading(false);
                setOpenPopUpBoxConfirm(true);

                if (res.data.data) {
                    // Parse form and auto-submit
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = res.data.data;

                    const form = tempDiv.querySelector("form");
                    if (form) {
                        document.body.appendChild(form); // Append form to DOM
                        form.submit(); // Auto-submit the form
                    }
                }
            } else {
                toast.error(res.data.message || "Invalid Message");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            setLoading(false);
        }
    };

    // const submitTicket = async () => {
    //     setLoading(true)
    //     let data = new FormData();

    //     data.append('booking_type', booking_type)

    //     data.append('bus_id', bus_id || '')
    //     data.append('bus_name', bus_name || '')
    //     data.append('user_id', localStorage.getItem('UserID') || '')
    //     data.append('boarding_point_id', selectedboardingValue?.boarding_id || '')
    //     data.append('boarding_point_name', selectedboardingValue.boarding_sub_route_name)
    //     data.append('boarding_point_time', selectedboardingValue.boarding_time)
    //     data.append('droping_point_id', selecteddropingValue?.droping_id || '')
    //     data.append('droping_point_name', selecteddropingValue.droping_sub_route_name)
    //     data.append('droping_point_time', selecteddropingValue.droping_time)
    //     data.append('boarding_id', from?.city_id || '')
    //     data.append('droping_id', to?.city_id || '')
    //     data.append('booking_date', formattedDate)
    //     data.append('contact_name', name)
    //     data.append('contact_email_id', emailId)
    //     data.append('contact_details', mobileNo)


    //     data.append('sub_total', totalPrice)
    //     data.append('tax_amount', 0)
    //     data.append('discount', discount)
    //     data.append('sarthibus_discount', finalSarthiDis)
    //     data.append('wallet', walletAmount)
    //     data.append('final_price', finalAmountApi)
    //     data.append('payment_method', '1')
    //     data.append('transaction_id', '')
    //     data.append('main_boarding_point_id', main_boarding_point_id)
    //     data.append('main_droping_point_id', main_droping_point_id)
    //     data.append('order_id', '')
    //     data.append('created_type', '2')
    //     data.append('booking_type', booking_type)


    //     for (let i = 0; i < selectedTotalSeat.length; i++) {
    //         data.append(`seat_number[${i}]`, selectedTotalSeat[i]);
    //     }

    //     for (let i = 0; i < selectedTotalSeatPrice.length; i++) {
    //         data.append(`seat_price[${i}]`, selectedTotalSeatPrice[i]);
    //     }

    //     for (let i = 0; i < passengerData.length; i++) {
    //         data.append(`name[${i}]`, passengerData[i]?.name);
    //         data.append(`age[${i}]`, passengerData[i]?.age);
    //         data.append(`gender[${i}]`, passengerData[i]?.gender);
    //     }
    //     try {
    //         await axios.post("add_ticket_hold", data, {
    //         }).then((res) => {
    //             if (res.data.success == true) {
    //                 toast.success(res.data.message);
    //                 setLoading(false)
    //                 // history.push({
    //                 //     pathname: '/success-ticket', 
    //                 // });
    //                 setOpenPopUpBoxConfirm(true)
    //             } else {
    //                 toast.error(res.data.message || 'Invalid Message');
    //             }
    //         })
    //     }
    //     catch (res) {
    //         toast.error(res.data.message);
    //     }
    // }
    const resetAddDialogConfirm = () => {
        setOpenPopUpBoxConfirm(false)
    }
    const couponList = async (bus_id) => {
        let data = new FormData();
        data.append('bus_id', bus_id)
        const params = {
            bus_id: bus_id,
        }
        try {
            await axios.post("coupon_list", data, {
                params: params
            }).then((res) => {
                setCouponData(res.data.data)
            })
        }
        catch (error) {
            toast.error(error.data.message);
        }
    }

    const getWalletAmount = async () => {
        if (localStorage.getItem('UserID') != null) {
            let data = new FormData();

            data.append('user_id', localStorage.getItem('UserID'))
            data.append('coupon_amount', parseInt(discount))
            data.append('total_amount', totalPrice)
            data.append('booking_date', formattedDate)
            data.append('booking_type', booking_type)


            try {
                await axios.post("ticket_wallet_amount_data", data, {
                }).then((res) => {
                    setFinalAmountApi(res.data.data.total_main_price)
                    setWalletAmount(res.data.data.total_wallet)
                    setFinalSarthiDis(res.data.data.sarthi_discount)
                    setOrderId(res.data.data.orderId)
                    setServiceChargeAPI(res.data.data.total_service_charge)
                    setGSTAmountApi(res.data.data.total_gst_amount)
                })
            }
            catch (error) {
                toast.error(error.data.message);
            }
        } else {
            console.error('cant call  wallet ammount')
            return
        }

    }

    const handleApplyOffer = (dis, amount) => {
        if (amount <= totalPrice) {
            setDiscount(totalPrice * (dis / 100));
            const taxAmount = totalPrice * (dis / 100);
            const x = totalPrice - taxAmount;
            setFinalAmount(x);
            setIsCouponApplied(true);
            handleHideCoupon();
            toast.success('Apply Coupon successfully.')
        } else {
            setDiscount(0)
            const x = totalPrice - 0;
            setFinalAmount(x);
            toast.error(`can not Apply this Coupon.`)
        }
    }

    const handleRemoveOffer = () => {
        setDiscount(0);
        const x = totalPrice - walletAmount;
        setFinalAmount(x);
        setIsCouponApplied(false);
        handleHideCoupon();
        toast.success('Coupon removed successfully.');
    };

    return (

        <div>

            <div>
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
                    <div className="container container-md container-sm container-xl mt-5 passenger_payment_det">
                        <div className="align-items-center d-md-flex d-sm-block justify-content-between mb-4">
                            <div className="d-flex gap-3 align-items-center">
                                <div className="usericonpsnger d-flex align-items-center shadow-cust justify-content-center">
                                    <FontAwesomeIcon icon={faCreditCard} size="xl" color="rgb(121, 44, 143)" />
                                </div>
                                <h5 className="fw-semibold text-gray mb-0">Payment & Other Details</h5>
                            </div>
                            <h4 className="d-flex d-sm-flex justify-content-end text-danger">
                                Time remaining :
                                <span >
                                    {`${Math.floor((timerEnd - Date.now()) / 60000)
                                        .toString()
                                        .padStart(2, '0')}:${Math.floor(((timerEnd - Date.now()) % 60000) / 1000)
                                            .toString()
                                            .padStart(2, '0')} `}
                                </span>
                            </h4>


                        </div>
                        <div className="container container-md container-sm container-xl ">
                            <div className="row gap-2">
                                <div className="d-flex gap-5 flex-wrap">
                                    <div className="col-6 col-lg col-md col-12 col-lg-6">
                                        {/* {/ Bus Details /} */}
                                        <div className="mb-3 row buslist--card d-flex">
                                            <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                                <div className="d-flex justify-content-between align-items-center busnmflex">
                                                    <div className="busname--icons">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <img src={busIcon} alt="" style={{ height: '60px', width: '60px', borderRadius: '100%', border: '1px solid black' }} className="img-fluid" />
                                                            <div>
                                                                <h5 className="m-0 me-2 fw-semibold">{bus_name}</h5>
                                                                <p className="m-0 me-2 fw-semibold">{bus_ac} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="fw-medium m-0 tcktpricediv" style={{ color: 'rgb(108 42 127)' }}>{`₹ ${totalPrice}`}</h4>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="col-12 align-items-center">
                                                        <div>
                                                            <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                                <div className="bustimediv">
                                                                    <h6 className="fw-semibold mb-1">{boarding_point_name}</h6>
                                                                    <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px' }}>{boarding_time}</p>
                                                                    <p className="fw-medium m-0">{boarding_date}</p>
                                                                </div>
                                                                <div className="bustimediv flxbasissdiv">
                                                                    <span className="border--span"></span>
                                                                    <p className="bustotalhours fw-medium m-0">{time_different}</p>
                                                                </div>
                                                                <div className="bustimediv  d-flex flex-column align-items-end">
                                                                    <h6 className="fw-semibold mb-1">{droping_point_name}</h6>
                                                                    <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px' }}>{droping_time}</p>
                                                                    <p className="fw-medium m-0">{droping_date}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* {/ Contact Details /} */}
                                        <div className="mb-3 row buslist--card d-flex">
                                            <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                                <div className="d-flex justify-content-between align-items-center busnmflex">
                                                    <h5 className="m-0 me-2 fw-semibold">Contact Details</h5>
                                                </div>
                                                <div className="col-12 align-items-center">
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                            <div className="bustimediv">
                                                                <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Name</h6>
                                                                <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Phone No</h6>
                                                                <h6 className="fw-medium mb-2" style={{ color: 'gray' }}>Email</h6>

                                                            </div>
                                                            <div className="bustimediv  d-flex flex-column align-items-end">
                                                                <h6 className="fw-semibold mb-2">{name}</h6>
                                                                <h6 className="fw-semibold mb-2">{mobileNo}</h6>
                                                                <h6 className="fw-semibold mb-2">{emailId == '' ? "not available" : emailId}</h6>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* {/ Passengers Details /} */}
                                        <div className="mb-3 row buslist--card d-flex">
                                            <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                                <div className="d-flex justify-content-between align-items-center busnmflex">
                                                    <h5 className="m-0 me-2 fw-semibold">Passengers</h5>
                                                </div>
                                                <div className="col-12 align-items-center">
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                            <div className="bustimediv">
                                                                <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Name</h6>
                                                                {passengerData.map((passenger, index) =>
                                                                    <h6 className="fw-medium mb-2" key={index}>{`${passenger.name} (${passenger.gender})`}</h6>
                                                                )}
                                                            </div>
                                                            <div className="bustimediv  d-flex flex-column align-items-center">
                                                                <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Age</h6>
                                                                {passengerData.map((passenger, index) =>
                                                                    <h6 className="fw-medium mb-2" key={index}>{`${passenger.age}`}</h6>
                                                                )}
                                                            </div>
                                                            <div className="bustimediv  d-flex flex-column align-items-center">
                                                                <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Seat No</h6>
                                                                {passengerData.map((passenger, index) =>
                                                                    <h6 className="fw-medium mb-2" key={index}>{selectedTotalSeat[index]}</h6>
                                                                )}
                                                            </div>
                                                            <div className="bustimediv  d-flex flex-column align-items-end">
                                                                <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Seat Price</h6>
                                                                {passengerData.map((passenger, index) =>
                                                                    <h6 className="fw-medium mb-2" key={index}>{selectedTotalSeatPrice[index]}</h6>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-5 col-lg col-md col-12">
                                        {couponData?.coupon?.length > 0 && (
                                            <div className="mb-3 row buslist--card d-flex">
                                                <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                                    <div className="row col-12 align-items-center">
                                                        {isCouponApplied ? (
                                                            <div>
                                                                <div className="bustimediv d-flex justify-content-between" style={{ cursor: "default" }}>
                                                                    <div class="d-flex gap-3">
                                                                        <span className="">
                                                                            <FaCheckCircle className="text-success fs-3" />
                                                                        </span>
                                                                        <h5>Coupon Applied !</h5>
                                                                    </div>
                                                                    <a onClick={handleRemoveOffer} style={{ color: "red", cursor: "pointer" }}>
                                                                        Remove
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            couponOpen === false ? (
                                                                <a onClick={handleShowCoupon} style={{ minHeight: "10px" }}>
                                                                    <div className="bustimediv d-flex gap-2" style={{ cursor: "pointer" }}>
                                                                        <span className="mb-2">
                                                                            <RiDiscountPercentFill className="text-warning fs-3" />
                                                                        </span>
                                                                        <h5>Apply Coupon</h5>
                                                                        <MdOutlineKeyboardArrowDown className="fs-3" />
                                                                    </div>
                                                                </a>
                                                            ) : (
                                                                <a onClick={handleHideCoupon}>
                                                                    <div className="bustimediv d-flex gap-2" style={{ cursor: "pointer" }}>
                                                                        <span className="mb-2">
                                                                            <RiDiscountPercentFill className="text-warning fs-3" />
                                                                        </span>
                                                                        <h5>Apply Coupon</h5>
                                                                        <MdOutlineKeyboardArrowUp className="fs-3" />
                                                                    </div>
                                                                </a>
                                                            )
                                                        )}

                                                        {
                                                            couponOpen == true && (
                                                                <div className="">
                                                                    {
                                                                        couponData?.coupon?.map((coupon, index) => (
                                                                            <div>

                                                                                <div className="bustimediv d-flex gap-3 my-2 w-100 ">
                                                                                    <img src={busIconCoupon} alt="" style={{ height: '48px', width: '48px', background: "#f1ecec", borderRadius: "100%", padding: "9px" }} className="img-fluid" />
                                                                                    <div className="flex-grow-1">
                                                                                        <h6>{coupon.c_name}</h6>
                                                                                        <div className="d-flex gap-6">
                                                                                            <span className="col-6 col-md-4">
                                                                                                <div className="d-flex gap-2">
                                                                                                    <LuClock2 />
                                                                                                    <h6 style={{ fontSize: "0.75rem" }}>Valid Until</h6>
                                                                                                </div>
                                                                                                <span style={{ fontSize: "0.75rem" }}>{coupon.c_exp_date}</span>
                                                                                            </span>
                                                                                            <span className="col-6 col-md-4">
                                                                                                <div className="d-flex gap-2">
                                                                                                    <PiWalletBold />
                                                                                                    <h6 style={{ fontSize: "0.75rem" }}>Min Amount</h6>
                                                                                                </div>
                                                                                                <span style={{ fontSize: "0.75rem" }}>₹{coupon.min_total_amount}</span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ml-auto d-flex gap-2 align-items-center">
                                                                                        <Button variant="contained" onClick={() => handleApplyOffer(coupon.c_discount, coupon.min_total_amount)} style={{ backgroundColor: "rgb(121  44 143)" }}>
                                                                                            Apply
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="mb-3 row buslist--card d-flex">
                                            <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                                <div className="d-flex justify-content-between align-items-center busnmflex">
                                                    <h5 className="m-0 me-2 fw-semibold">Price Details</h5>
                                                </div>
                                                <div className="col-12 align-items-center">
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                            <div className="bustimediv">
                                                                <h6 className="fw-semibold mb-2" >Price</h6>
                                                                <h6 className="fw-semibold mb-2" >Discount</h6>
                                                                {finalSarthiDis && (finalSarthiDis !== "0" && finalSarthiDis !== null && finalSarthiDis !== "") && (
                                                                    <h6 className="fw-semibold mb-2">Sarthi Discount</h6>

                                                                )}
                                                                <h6 className="fw-semibold mb-2" >Wallet</h6>

                                                                {GSTAmountApi && (GSTAmountApi !== "0" && GSTAmountApi !== null && GSTAmountApi !== "") && (
                                                                    <h6 className="fw-semibold mb-2" >GST</h6>

                                                                )}
                                                                {serviceChargeAPI && (serviceChargeAPI !== "0" && serviceChargeAPI !== null && serviceChargeAPI !== "") && (
                                                                    <h6 className="fw-semibold mb-2" >Service Charge</h6>

                                                                )}

                                                                <h6 className="fw-semibold mb-2 fs-5" >Total Price</h6>
                                                            </div>
                                                            <div className="bustimediv  d-flex flex-column align-items-end">
                                                                <h6 className="fw-semibold mb-2">{totalPrice}</h6>
                                                                <h6 className="fw-semibold mb-2">-{parseInt(discount)}</h6>

                                                                {finalSarthiDis && (finalSarthiDis !== "0" && finalSarthiDis !== null && finalSarthiDis !== "") && (
                                                                    <h6 className="fw-semibold mb-2">-{finalSarthiDis}</h6>)}
                                                                <h6 className="fw-semibold mb-2">-{walletAmount}</h6>

                                                                {GSTAmountApi && (GSTAmountApi !== "0" && GSTAmountApi !== null && GSTAmountApi !== "") && (
                                                                    <h6 className="fw-semibold mb-2">+{GSTAmountApi}</h6>

                                                                )}
                                                                {serviceChargeAPI && (serviceChargeAPI !== "0" && serviceChargeAPI !== null && serviceChargeAPI !== "") && (
                                                                    <h6 className="fw-semibold mb-2">+{serviceChargeAPI}</h6>

                                                                )}

                                                                <h6 className="fw-semibold mb-2 fs-5 ">{finalAmountApi ? finalAmountApi : finalAmount}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 row buslist--card d-flex">
                                            <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                                <div className="col-12 align-items-center">
                                                    <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                        <div className="bustimediv">
                                                            <h5 className="fw-bold " >Total Payment : {finalAmountApi ? finalAmountApi : finalAmount}</h5>
                                                        </div>
                                                        <div className="bustimediv">
                                                            <Button variant="contained" onClick={processToPayment} style={{ backgroundColor: "rgb(121 44 143)" }}>Proceed</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />

                </div>
            </div>

            {loading && <Loader />}



        </div>
    )
}
export default PassengerView