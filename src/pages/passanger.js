import React, { useCallback, useEffect, useState } from 'react';
import "../../src/pages/busList.css";
import { FaUser } from 'react-icons/fa';
import { IoMdWarning } from "react-icons/io";
import Header from '../components/header';
import Footer from '../components/footer';
import { Autocomplete, Button, TextField } from '@mui/material';
import { PiPhoneCallFill } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import debounce from "lodash.debounce";


const PassengerDetails = () => {
    const location = useLocation();
    const [isChecked, setIsChecked] = useState(false);
    const [showCheckbox, setShowCheckbox] = useState(false);
    const history = useHistory()
    const [fromCity, setFromCity] = useState("");
    const [busInputValue, setBusInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        selectedUpperSeat,
        selectedLowerSeat,
        selectedUpperSeats,
        selectedLowerSeats,
        totalPrice,
        serviceTax,
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
        selectedUpperSeat: [],
        selectedLowerSeat: [],
        selectedUpperSeats: [],
        selectedLowerSeats: [],
        totalPrice: 0,
        serviceTax: [],
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

    const [cities, setCities] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [isCheckboxChecked]);



    useEffect(() => {
        const handlePopState = () => {
            history.push('/bus-list', { selectedUpperSeats, selectedLowerSeats, totalPrice, serviceTax });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [history, selectedUpperSeats, selectedLowerSeats, totalPrice, serviceTax]);

    const handleBack = () => {
        history.push('/bus-list', { selectedUpperSeats, selectedLowerSeats, totalPrice, serviceTax });
    };

    useEffect(() => {
        if (localStorage.getItem('Name') && localStorage.getItem('Email') && localStorage.getItem('Mobile') && localStorage.getItem('passengerData')) {

            const name = JSON.parse(localStorage.getItem('Name'))
            const email = JSON.parse(localStorage.getItem('Email'))
            const mob = JSON.parse(localStorage.getItem('Mobile'))
            const passengerData = JSON.parse(localStorage.getItem('passengerData'))


            if (passengerData) {
                setPassengerData(passengerData)
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


    const fetchCityListInstant = async () => {
        await cityList("");
    };
    const debouncedCityList = useCallback(
        debounce((searchTerm) => {
            setCities([]);
            cityList(searchTerm, 0);
        }, 300),
        []
    );

    const handleInputChange = (newInputValue) => {

        setBusInputValue(newInputValue);
        if (newInputValue) {
            debouncedCityList(newInputValue);
        }


    }


    const cityList = async (searchTerm = "", start = 0) => {
        if (loading) return;

        const data = new FormData();
        data.append("city_name", searchTerm);
        data.append("start", start);
        data.append("limit", 50);
        data.append("calling_type", 1);

        try {
            const res = await axios.post("city_list", data);
            const allCities = res.data.data.all_city || [];

            const newCities = allCities.slice(0, 50);

            if (start === 0) {
                setCities(newCities);
            } else {
                setCities((prevCities) => [...prevCities, ...newCities]);
            }
        } catch (error) {
            console.error("Error fetching city list:", error);
        } finally {
        }
    };


    const getContactInfo = async () => {
        const data = new FormData();
        data.append('user_id', localStorage.getItem('UserID'));
        try {
            const res = await axios.post("ticket_contact_info", data);

            setName(res.data.data.name);
            setMobileNo(res.data.data.mobile_number);
            setEmailId(res.data.data.email);
            setPassengerData(prevData => {
                const updated = [...prevData];
                updated[0] = { ...updated[0], name: res.data.data.name, age: '', gender: '' };
                return updated;
            });

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

        setCheckboxToggle(true)

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

        // Passenger validations
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

        // Main user validations
        if (!name) {
            newErrors.name = 'Name is required';
            toast.error('Name is required');
        } else if (!mobileNo) {
            newErrors.mobileNo = 'Mobile No is required';
            toast.error('Mobile No is required');
        } else if (!/^\d{10}$/.test(mobileNo)) {
            newErrors.mobileNo = 'Mobile number must be 10 digits';
            toast.error('Mobile number must be 10 digits');
        }

        // ✅ City validation
        if (!fromCity || !fromCity.city_id) {
            newErrors.fromCity = 'City is required';
            toast.error('City is required');
        }

        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;

        if (isValid) {
            const submittedData = {
                passengerData,
                name,
                mobileNo,
                emailId,
                fromCity,
                to,
                from,
                selectedTotalSeat,
                totalPrice,
                serviceTax,
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
                remainingTime: timer,
                main_boarding_point_id,
                main_droping_point_id,
                selectedUpperSeats,
                selectedLowerSeats,
                selectedUpperSeatPrice,
                selectedLowerSeatPrice,
                inputValue,
                booking_type,
            };

            history.push({
                pathname: '/passenger-detail-view',
                state: submittedData
            });
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
                                                <label htmlFor="city" className="form-label fs-6 fw-semibold text-capitalize">
                                                    City
                                                </label>

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
                                                    style={{
                                                        padding: "0rem",
                                                        color: "#666",
                                                    }}
                                                    value={fromCity}
                                                    onChange={(event, newValue) => {
                                                        setFromCity(newValue);
                                                    }}
                                                    onInputChange={(event, newInputValue) => {
                                                        handleInputChange(newInputValue);
                                                    }}
                                                    onFocus={() => {
                                                        if (cities.length === 0) cityList("", 0);
                                                        fetchCityListInstant("");
                                                    }}
                                                    onKeyDown={(event) => {
                                                        if (
                                                            event.key === "ArrowDown" ||
                                                            event.key === "Enter"
                                                        ) {
                                                            const selectedOption = cities.find(
                                                                (city) =>
                                                                    city.city_name === busInputValue
                                                            );
                                                            if (selectedOption) {
                                                                setFromCity(selectedOption);
                                                            }
                                                        }
                                                    }}

                                                    renderOption={(props, option, state) => (
                                                        <>
                                                            <li
                                                                {...props}
                                                                style={{
                                                                    display: "grid",
                                                                    padding: "8px",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => setFromCity(option)}
                                                            >
                                                                <span
                                                                    style={{
                                                                        fontSize: "1rem",
                                                                        fontWeight: "bold",
                                                                    }}
                                                                >
                                                                    {option.city_name}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        fontSize: "0.7rem",
                                                                        color: "#666",
                                                                    }}
                                                                >
                                                                    {[
                                                                        option.taluka_name,
                                                                        option.jilla_name,
                                                                        option.state_name,
                                                                    ]
                                                                        .filter(Boolean)
                                                                        .join(", ")}
                                                                </span>
                                                            </li>


                                                        </>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            size="small"
                                                            variant="outlined"

                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    padding: '0 !important',
                                                                    '& input': {
                                                                        padding: '8px 12px !important',
                                                                    },
                                                                    '& .MuiAutocomplete-endAdornment': {
                                                                        right: '8px !important',
                                                                    }
                                                                },
                                                                '& .MuiInputBase-root': {
                                                                    padding: '0 !important',
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />

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
                                                                    value={passengerData[index]?.name || ""}
                                                                    onChange={(e) => handleTextChange(index, 'name', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
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
                                                        <div className="col-md-3">

                                                            <label htmlFor={`age-${index}`} className="form-label fs-6 ml-15 fw-semibold text-capitalize">
                                                                Select Gender
                                                            </label>


                                                            <div className="d-flex align-items-start gap-5">
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name={`gender-${index}`}
                                                                        id={`MALE-${index}`}
                                                                        checked={passengerData[index]?.gender === 'MALE'}
                                                                        onChange={() => handleGenderChange(index, 'MALE')}
                                                                        style={{ border: "2px solid  #792C8F" }}
                                                                    />
                                                                    <img src='assets/images/male.png' style={{ height: "14px", marginInline: "5px" }} />

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
                                                                        style={{ border: "2px solid  #792C8F" }}

                                                                    />
                                                                    <img src='assets/images/female.png' style={{ height: "14px", marginInline: "5px" }} />

                                                                    <label className="form-check-label fs-16 fw-medium text-capitalize text-gray" htmlFor={`FEMALE-${index}`}>
                                                                        Female
                                                                    </label>

                                                                </div>
                                                            </div>
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