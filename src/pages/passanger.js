import React, { useEffect, useState } from 'react';
import "../../src/pages/busList.css";
import { FaUser } from 'react-icons/fa';
import { IoMdWarning } from "react-icons/io";
import Header from '../components/header';
import Footer from '../components/footer';
import { Button, TextField } from '@mui/material';
import { PiPhoneCallFill } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

const PassengerDetails = () => {
    const location = useLocation();
    const [isChecked, setIsChecked] = useState(false);
    const [showCheckbox, setShowCheckbox] = useState(false);
    const history = useHistory()


    const {
        selectedUpperSeats,
        selectedLowerSeats,
        totalPrice,
        selectedUpperSeatPrice,
        selectedLowerSeatPrice,
        bus_id,
        bus_name,
        boarding_point_name,
        droping_point_name,
        droping_time,
        boarding_time,
        droping_date,
        boarding_date,
        selectedboardingValue,
        selecteddropingValue,
        bus_ac,
        busIcon,
        time_different,
        formattedDate,
        to,
        from,
        inputValue,
        main_boarding_point_id,
        main_droping_point_id,
        timerStart,
        booking_type
    } = location.state || {
        selectedUpperSeats: [],
        selectedLowerSeats: [],
        totalPrice: 0,
        selectedUpperSeatPrice: [],
        selectedLowerSeatPrice: [],
        bus_id: "",
        bus_name: '',
        boarding_point_name: '',
        droping_point_name: '',
        droping_time: '',
        boarding_time: '',
        droping_date: '',
        boarding_date: '',
        selectedboardingValue,
        selecteddropingValue,
        busIcon,
        bus_ac: '',
        time_different,
        formattedDate,
        to,
        from,
        inputValue: '',
        timerStart,
        main_boarding_point_id: '',
        main_droping_point_id: '',
    };
    const totalSeats = selectedUpperSeats.length + selectedLowerSeats.length;
    const selectedTotalSeat = selectedUpperSeats.concat(selectedLowerSeats)
    const selectedTotalSeatPrice = selectedUpperSeatPrice.concat(selectedLowerSeatPrice)
    const [passengerData, setPassengerData] = useState(
        Array.from({ length: totalSeats }, () => ({
            name: '',
            age: '',
            gender: '',
        })));
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [checkboxToggle, setCheckboxToggle] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [isCheckboxChecked]);



    useEffect(() => {
        const handlePopState = () => {
            history.push('/bus-list', { selectedUpperSeats, selectedLowerSeats, totalPrice });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [history, selectedUpperSeats, selectedLowerSeats, totalPrice]);

    const handleBack = () => {
        history.push('/bus-list', { selectedUpperSeats, selectedLowerSeats, totalPrice });
    };

    useEffect(() => {
        const x = JSON.parse(localStorage.getItem('passengerData'))
        if (localStorage.getItem('Name') && localStorage.getItem('Email') && localStorage.getItem('Mobile')) {

            const name = JSON.parse(localStorage.getItem('Name'))
            const email = JSON.parse(localStorage.getItem('Email'))
            const mob = JSON.parse(localStorage.getItem('Mobile'))
            if (x) {
                setPassengerData(x)
            }
            if (name) {
                setName(name)
            }
            if (email) {
                setEmailId(email)
            }
            if (mob) {
                setMobileNo(mob)
            }
        } else {
            getContactInfo()

        }
    }, []);

    const getContactInfo = async () => {
        const data = new FormData();
        data.append('user_id', localStorage.getItem('UserID'));
        try {
            const res = await axios.post("ticket_contact_info", data);

            setName(res.data.data.name);
            setMobileNo(res.data.data.mobile_number);
            setEmailId(res.data.data.email);

        } catch (error) {
            console.error(error.response ? error.response.data.message : "An error occurred");
        }
    };

    const handleTextChange = (index, field, value) => {

        if (index > 0) {
            setCheckboxToggle(true)
        }
        setPassengerData(prevData =>
            prevData.map((passenger, i) =>
                i === index ? { ...passenger, [field]: value } : passenger
            )
        );
        if (index === 0 && value) {
            setIsCheckboxChecked(true);
        }
    };

    const handleGenderChange = (index, value) => {
        setPassengerData(prevData =>
            prevData.map((passenger, i) =>
                i === index ? { ...passenger, gender: value } : passenger
            )
        );
    };
    const timerEnd = localStorage.getItem('timerEnd');

    const [timer, setTimer] = useState(timerEnd);

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

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsCheckboxChecked(checked);

        if (checked) {
            const firstPassenger = passengerData[0];
            const updatedPassengerData = passengerData.map((data, index) =>
                index !== 0 ? { ...data, ...firstPassenger } : data
            );
            setPassengerData(updatedPassengerData);
        } else {
            const updatedPassengerData = passengerData.map((data, index) =>
                index !== 0 ? { ...data, name: '', age: '', gender: '' } : data
            );
            setPassengerData(updatedPassengerData);
        }
    };

    const handleDetails = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        localStorage.setItem('passengerData', JSON.stringify(passengerData))
        localStorage.setItem("Name", JSON.stringify(name))
        localStorage.setItem("Email", JSON.stringify(emailId))
        localStorage.setItem("Mobile", JSON.stringify(mobileNo))

        passengerData.forEach((passenger, index) => {
            if (!passenger.name) {
                newErrors[`name-${index}`] = `Name is required for Passenger ${index + 1}`;
                toast.error(`Name is required for Passenger ${index + 1}`);
            } else if (!passenger.age) {
                newErrors[`age-${index}`] = `Age is required for Passenger ${index + 1}`;
                toast.error(`Age is required for Passenger ${index + 1}`);
            } else if (!/^\d+$/.test(passenger.age) || passenger.age <= 0) {
                newErrors[`age-${index}`] = `Enter a valid age for Passenger ${index + 1}`;
                toast.error(`Enter a valid age for Passenger ${index + 1}`);
            } else if (!passenger.gender) {
                newErrors[`gender-${index}`] = `Gender is required for Passenger ${index + 1}`;
                toast.error(`Gender is required for Passenger ${index + 1}`);
            }
        });

        if (!name) {
            newErrors.name = 'Name is required';
            toast.error('Name is required');
        }
        else if (!mobileNo) {
            newErrors.mobileNo = 'Mobile No is required';
            toast.error('Mobile No is required');
        } else if (!/^\d{10}$/.test(mobileNo)) {
            newErrors.mobileNo = 'Mobile number must be 10 digits';
            toast.error('Mobile number must be 10 digits');
        }
     
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
           
            history.push({
                pathname: '/passnger-detail-view',
                state: {
                    passengerData,
                    name,
                    mobileNo,
                    emailId,
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
                    remainingTime: timer,
                    main_boarding_point_id,
                    main_droping_point_id,
                    selectedUpperSeats,
                    selectedLowerSeats,
                    totalPrice,
                    selectedUpperSeatPrice,
                    selectedLowerSeatPrice,
                    inputValue,
                    booking_type


                }
            })
        }
    };

    return (
        <>
            <Header />
            <main>
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
                <div className="pasenger-det--page">
                    <div className="container container-md container-sm container-xl">
                        <div className="passengerpage--div mt-5">
                            <div className="passanger--infodiv mt-5">
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="usericonpsnger d-flex align-items-center shadow-cust justify-content-center">
                                        <PiPhoneCallFill className="text-blue fs-4" />
                                    </div>
                                    <h5 className="fw-semibold text-gray mb-0">Contact Information</h5>
                                </div>
                            </div>
                            <div className='d-flex gap-3 align-items-center '>
                                
                            </div>
                            <div className="passengerticktcard  rounded-4  ">
                                <div className="psngrdet--1 ">
                                    <div className="row passenger_det">
                                        <div className="col-md-4">
                                            <div className="my-3 form-group">
                                                <label htmlFor="name" className="form-label fs-6 fw-semibold text-capitalize">
                                                    Name
                                                </label>
                                                <TextField className="form-control" size='small'
                                                    placeholder='Name'
                                                    value={name}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                                        setName(value);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="my-3 form-group">
                                                <label htmlFor="mobile" className="form-label fs-6 fw-semibold text-capitalize">
                                                    Phone
                                                </label>
                                                <TextField className="form-control" size='small' placeholder='Phone'
                                                    type='number'
                                                    inputProps={{ maxLength: 10 }}
                                                    value={mobileNo}
                                                    onChange={(e) => setMobileNo(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="my-3 form-group">
                                                <label htmlFor="name" className="form-label fs-6 fw-semibold text-capitalize">
                                                    Email ID
                                                </label>
                                                <TextField className="form-control" size='small'
                                                    placeholder='Email ID'
                                                    value={emailId}
                                                    onChange={(e) => setEmailId(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="passanger--infodiv mt-5">
                                <div className="psngerinfotitle d-flex align-items-center justify-content-between">
                                    <div className="d-flex gap-3 align-items-center">
                                        <div className="usericonpsnger d-flex align-items-center shadow-cust justify-content-center">
                                            <FaUser className="text-blue fs-4" />
                                        </div>
                                        <h5 className="fw-semibold text-gray mb-0">Passenger Information</h5>
                                    </div>
                                    <div>

                                        {
                                            totalSeats > 1 && checkboxToggle ? (
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        className='fw-semibold'
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span className="fw-semibold text-gray">
                                                        {isCheckboxChecked
                                                            ? " Uncheck to clear other passenger's details"
                                                            : " Check to copy details to other passenger's"}
                                                    </span>
                                                </label>
                                            ) : null
                                        }
 
                                    </div>
                                </div>

                                <div className="pasngr--det--collectdiv mt-3">
                                    <form className="pasngerdet--colectform">
                                        {Array.from({ length: totalSeats }, (_, index) => (
                                            <div key={index} className="passengerticktcard bg-theme-opacity p-5 rounded-4 border-dashed-theme mb-4">
                                                <div className="numberpass--seatdet">
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-medium py-2 fs-18 text-capitalize border-right-2 pe-3">
                                                            Passenger {index + 1}
                                                        </div>
                                                        <div className="seat-numdiv d-flex gap-3 text-capitalize ps-3">
                                                            <strong>seat {selectedTotalSeat[index]}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="psngrdet--1 mt-4">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3 form-group">
                                                                <label htmlFor={`name-${index}`} className="form-label fs-6 fw-semibold text-capitalize">
                                                                    Name
                                                                </label>
                                                                <TextField
                                                                    className="form-control"
                                                                    size='small'
                                                                    placeholder='Name'
                                                                    id={`name-${index}`}
                                                                    value={passengerData[index]?.name || ''}
                                                                    onChange={(e) => handleTextChange(index, 'name', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3 form-group">
                                                                <label htmlFor={`age-${index}`} className="form-label fs-6 fw-semibold text-capitalize">
                                                                    Age
                                                                </label>
                                                                <TextField
                                                                    className="form-control"
                                                                    size='small'
                                                                    placeholder='Age'
                                                                    type='number'
                                                                    id={`age-${index}`}
                                                                    value={passengerData[index]?.age || ''}
                                                                    onChange={(e) => handleTextChange(index, 'age', e.target.value)}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === '+' || e.key === 'e') {
                                                                            e.preventDefault();  
                                                                        }
                                                                    }}
                                                                    inputProps={{ min: 0 }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="selectgemnddiv mt-2">
                                                    <div className="titlediv">
                                                        <h6 className="fw-semibold fs-6 text-capitalize">Select Gender</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-5">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name={`gender-${index}`}
                                                                id={`MALE-${index}`}
                                                                checked={passengerData[index]?.gender === 'MALE'}
                                                                onChange={() => handleGenderChange(index, 'MALE')}
                                                            />
                                                            <label className="form-check-label fs-16 fw-medium text-capitalize text-gray" htmlFor={`MALE-${index}`}>
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name={`gender-${index}`}
                                                                id={`FEMALE-${index}`}
                                                                checked={passengerData[index]?.gender === 'FEMALE'}
                                                                onChange={() => handleGenderChange(index, 'FEMALE')}
                                                            />
                                                            <label className="form-check-label fs-16 fw-medium text-capitalize text-gray" htmlFor={`FEMALE-${index}`}>
                                                                Female
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </form>
                                </div>
                            </div>

                            <div className="cnfirmsdvi mt-3">
                                <div className="warningmsg mb-4">
                                    
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="flx-item">
                                        <h3 className="total-amount fw-bolder mb-0">Total Amount : INR {totalPrice}</h3>
                                    </div>
                                    <div className="flx-item text-end">
                                        <Button variant="contained" onClick={handleDetails} style={{ backgroundColor: "rgb(121 44 143)" }}>Proceed To Book</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default PassengerDetails;