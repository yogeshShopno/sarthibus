import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { PartnersSection } from '../components/partner';
import BusBookingDiscountOffers from '../components/offer';
import TicketStepsSection from '../components/ticketStep';
import ChooseUs from '../components/chooseUs';
import AboutUs from '../components/aboutUsHome';
import Blogs from '../components/blogs';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaBusAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Autocomplete, Button, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import { format, addDays } from 'date-fns';
import Slider from 'react-slick';
import { FaCalendarDays } from "react-icons/fa6";
import { AiOutlineSwap } from "react-icons/ai";
import AboutUsHome from '../components/aboutUsHome';
import { toast, ToastContainer } from 'react-toastify';
import { IoChevronBack, IoChevronForwardSharp } from 'react-icons/io5';
import debounce from 'lodash.debounce';
import SathiBanner from '../components/sarthiBanner';


const Home = () => {

    const [errors, setErrors] = useState({});
    const [cities, setCities] = useState([]);
    const [toCities, setToCities] = useState([]);
    const [citiesName, setCitiesName] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [start, setStart] = useState(0);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const [bannerMainImg, setBannerMainImg] = useState([])
    const [selectedReturnDate, setSelectedReturnDate] = useState('');
    const busIcon = process.env.PUBLIC_URL + 'assets/images/bus-icon.svg';
    const dirIcon = process.env.PUBLIC_URL + 'assets/images/direction.png';
    const bannerImage = process.env.PUBLIC_URL + 'assets/images/banner1.png';

    const restoreCity = (cityName) => {

        return cities.find(city => city.city_name === cityName) || null;

    };
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [busInputValue, setBusInputValue] = useState('');
    const [busInputToValue, setBusInputToValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());  
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : localStorage.getItem('formattedDate') || '';

    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const busState = JSON.parse(localStorage.getItem('busState'));

        if (busState) {
            setFrom(busState.from);
            setTo(busState.to);
            setSelectedDate(busState.formattedDate);
            setInputValue(busState.inputValue);
        }
    }, []);


    useEffect(() => {
        localStorage.removeItem("selectedSeats")
        localStorage.removeItem("selectedUpperSeats")
        localStorage.removeItem("main_boarding_point_id")
        localStorage.removeItem("main_droping_point_id")
    }, [])

    useEffect(() => {
        bannerMainList();
        debouncedCityList();
        debouncedToCityList();
    }, [])

    const swapLocations = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };


    const aboutSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        nextArrow: <IoChevronForwardSharp />,
        prevArrow: <IoChevronBack />,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <IoChevronForwardSharp />,
        prevArrow: <IoChevronBack />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleBusShow = () => {
        const newErrors = {};

        if (!from) {
            newErrors.from = 'Please enter the Boarding point';
            toast.error('Please enter the Boarding point');
        } else if (!to) {
            newErrors.to = 'Please enter the Drop Point';
            toast.error('Please enter the Drop Point');
        } else if (from == to) {
            newErrors.to = 'Please enter different Boarding and Dropping point';
            toast.error('Please enter different Boarding and Dropping point');
        }

        setErrors(newErrors);

        const isValid = Object.keys(newErrors).length === 0;



        if (isValid) {

            localStorage.setItem('busState', JSON.stringify({ from, to, formattedDate, inputValue }));

            setTimeout(history.push({
                pathname: '/bus-list',
                state: { to, from, formattedDate, inputValue }
            }), 1000)

        }
    };

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

    const cityToList = async (searchTerm, start = 0) => {
        if (loading) return; // Prevent multiple simultaneous API calls
       
        let data = new FormData();
        data.append('city_name', searchTerm);
        data.append('start', start);
        data.append('limit', 50); // This ensures the server is requested to return a maximum of 50 items
        data.append('calling_type', 1);
        try {
            const res = await axios.post("city_list", data);
            const filteredCities = res.data.data.all_city || [];

            const newCities = filteredCities.slice(0, 50);

            if (start === 0) {
                setToCities(newCities);
            } else {
                setToCities((prevCities) => [...prevCities, ...newCities]);
            }
        } catch (error) {
            console.error('Error fetching filtered city list:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const loadMoreCities = () => {
        setStart((prevStart) => {
            const newStart = prevStart + 50;
            cityList('', newStart); // Load next 50 cities
            cityToList('', newStart); // Load next 50 cities
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
            cityToList('', start);
        }
        loadMoreCities();
    };


    // const cityList = async (searchTerm) => {
    //     // if (!searchTerm) return;
    //     let data = new FormData();
    //     data.append('city_name', searchTerm || '');
    //     try {
    //         const res = await axios.post("city_list", data);
    //         const filteredCities = res.data.data.all_city || [];
    //         setCities(filteredCities);
    //     } catch (error) {
    //         console.error('Error fetching filtered city list:', error);
    //     }
    // };



    useEffect(() => {
        cityList('', 0);
        cityToList('', 0);
    }, []);

    // const cityToList = async (searchTerm) => {
    //     // if (!searchTerm) return;
    //     let data = new FormData();
    //     data.append('city_name', searchTerm || '');
    //     try {
    //         const res = await axios.post("city_list", data);
    //         const filteredCities = res.data.data.all_city || [];
    //         setToCities(filteredCities);
    //     } catch (error) {
    //         console.error('Error fetching filtered city list:', error);
    //     }
    // };

    const debouncedCityList = useCallback(
        debounce((searchTerm) => {
            setCities([]);
            cityList(searchTerm, 0);
        }, 300),
        []
    );

    const debouncedToCityList = useCallback(
        debounce((searchTerm) => {
            setToCities([]);
            cityToList(searchTerm, 0);
        }, 300),
        []
    );

    const handleInputChange = (newInputValue) => {
        setBusInputValue(newInputValue);
        if (newInputValue) {
            debouncedCityList(newInputValue);
        }
    };

    const handleInputToChange = (newInputValue) => {
        setBusInputToValue(newInputValue);
        if (newInputValue) {
            debouncedToCityList(newInputValue);
        }
    };

    const fetchCityListInstant = async () => {
        await cityList('');
    };

    const fetchToCityListInstant = async () => {
        await cityToList('');
    };

    const bannerMainList = async () => {
        let data = new FormData();
        try {
            const res = await axios.post("home", data);
            setBannerMainImg(res.data.data);
        } catch (error) {
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? date.toLocaleDateString('en-GB') : '';
    };
    const handlereturnDateChange = (date) => {
        setSelectedReturnDate(date);
        const formattedDate = date ? date.toLocaleDateString('en-GB') : '';
    };
    const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
        <input
            ref={ref}
            value={value}
            onClick={onClick}
            readOnly
        />
    ));
    <style jsx>{`
        .bookdiscoubnt--section {
            overflow-x: hidden;
        }
        .bookdiscoubntslider--div {
            width: 100%;
            overflow: hidden;
        }
        .swiper.bookdiscoubnt_slider {
            padding: 0 100px;
            box-sizing: border-box;
        }
    `}</style>

    return (
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
            <section className="herosection">
                <div className="heromain--div py-2">
                    <div className="container">
                        <div className="py-5 hero--content">
                            <div className="hero--contentdiv py-2">
                                <div className="herotitlediv text-center">
                                    <h2 className="fw-bolder mb-4 text-danger" style={{fontSize:'2.6rem'}}>
                                        Call now Book now 99300 31000
                                    </h2>
                                    <h1 className="fw-bolder fs-1a mb-4 text-capitalize">
                                        welcome to <span style={{ color: "#6c2a7f" }}>sarthi bus</span> booking
                                    </h1>
                                    <h5 className="text-gray text-capitalize">
                                        Your journey to seamless and convenient bus travel starts here.
                                    </h5>
                                </div>
                                <div className="runningbus mt-5">
                                    <div className="runningbusanim">
                                        <img src={busIcon} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="herofrom-to--div p-5 bg-white shadow rounded-4 ">
                                    <div className="fromtodiv text-capitalize">
                                        <form className="fromtoform">
                                            <div className="mainfromtoform--div">
                                                <div className="align-items-end d-flex dircetions flex-wrap flex-xl-nowrap gap-4 justify-content-between">
                                                    <div className="align-items-center d-flex flex-column flex-sm-row gap-3 routeselectdiv w-100">
                                                        <div className="col-12 col-sm-5 flex-grow-1 form-group">
                                                            <label style={{ marginBottom: "12px" }} htmlFor="from" className="fw-semibold text-gray fs-6">
                                                                <FaBusAlt />   From City
                                                            </label>

                                                            <Autocomplete
                                                                id="from-city"
                                                                options={cities}
                                                                // getOptionLabel={(option) =>
                                                                //     `${option.city_name}, ${option.taluka_name}, ${option.jilla_name}, ${option.state_name}`
                                                                // }
                                                                getOptionLabel={(option) => {
                                                                    // Filter out empty values and join the remaining values with commas
                                                                    const labels = [
                                                                        option.city_name,
                                                                        option.taluka_name,
                                                                        option.jilla_name,
                                                                        option.state_name,
                                                                    ].filter(Boolean);

                                                                    return labels.join(", ");
                                                                }}

                                                                value={from}

                                                                onChange={(event, newValue) => { setFrom(newValue); }}
                                                                // onInputChange={(event, newInputValue) => {
                                                                //     handleInputChange(newInputValue)

                                                                // }}
                                                                // onFocus={() => {
                                                                //     fetchCityListInstant(''); // Load default cities on focus if needed
                                                                // }}

                                                                onInputChange={(event, newInputValue) => { handleInputChange(newInputValue); }}
                                                                onFocus={() => { if (cities.length === 0) cityList('', 0); fetchCityListInstant(''); }} // Fetch cities when focused
                                                                onScroll={handleScroll}

                                                                onKeyDown={(event) => {
                                                                    if (event.key === 'ArrowDown' || event.key === 'Enter') {
                                                                        const selectedOption = cities.find(
                                                                            (city) => city.city_name === busInputValue
                                                                        );
                                                                        if (selectedOption) {
                                                                            setFrom(selectedOption);
                                                                        }
                                                                    }
                                                                }}

                                                                ListboxProps={{
                                                                    onScroll: handleScroll
                                                                }}

                                                                renderOption={(props, option, state) => (
                                                                    <>
                                                                        <li
                                                                            {...props}
                                                                            style={{
                                                                                display: 'grid',
                                                                                padding: '8px',
                                                                                cursor: 'pointer',
                                                                            }}
                                                                            onClick={() => setFrom(option)}
                                                                        >
                                                                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                                                                {option.city_name}
                                                                            </span>
                                                                            <span style={{ fontSize: '0.7rem', color: '#666' }}>
                                                                                {[option.taluka_name, option.jilla_name, option.state_name]
                                                                                    .filter(Boolean)
                                                                                    .join(", ")}
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
                                                                    <TextField {...params} size="small" variant="standard" />
                                                                )}
                                                            />

                                                        </div>
                                                        <div className="directimg-g text-opacity-50 fs-2 text-dark">
                                                            
                                                            <AiOutlineSwap onClick={swapLocations} />

                                                        </div>
                                                        <div className="col-12 col-sm-5 flex-grow-1 form-group">
                                                            <label style={{ marginBottom: "12px" }} htmlFor="to" className="fw-semibold text-gray fs-6 ">
                                                                <MdLocationOn />  To City
                                                            </label>

                                                            <Autocomplete
                                                                id="from-city"
                                                                options={toCities}
                                                                 
                                                                getOptionLabel={(option) => {
                                                                    const labels = [
                                                                        option.city_name,
                                                                        option.taluka_name,
                                                                        option.jilla_name,
                                                                        option.state_name,
                                                                    ].filter(Boolean);

                                                                    return labels.join(", ");
                                                                }}

                                                                value={to}

                                                                onChange={(event, newValue) => {
                                                                    setTo(newValue);
                                                                }}
                                                                
                                                                onInputChange={(event, newInputValue) => { handleInputToChange(newInputValue); }}
                                                                onFocus={() => { if (toCities.length === 0) cityToList('', 0); fetchToCityListInstant(''); }}
                                                                onScroll={handleScroll}
                                                                onKeyDown={(event) => {
                                                                    if (event.key === 'ArrowDown' || event.key === 'Enter') {
                                                                        const selectedOption = toCities.find(
                                                                            (city) => city.city_name === busInputToValue
                                                                        );
                                                                        if (selectedOption) {
                                                                            setTo(selectedOption);
                                                                        }
                                                                    }
                                                                }}

                                                                ListboxProps={{
                                                                    onScroll: handleScroll
                                                                }}

                                                                renderOption={(props, option, state) => (
                                                                    <>
                                                                        <li
                                                                            {...props}
                                                                            style={{
                                                                                display: 'grid',
                                                                                padding: '8px',
                                                                                cursor: 'pointer',
                                                                            }}
                                                                            onClick={() => setTo(option)}
                                                                        >
                                                                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                                                                {option.city_name}
                                                                            </span>
                                                                            <span style={{ fontSize: '0.7rem', color: '#666' }}>
                                                                                {[option.taluka_name, option.jilla_name, option.state_name]
                                                                                    .filter(Boolean) 
                                                                                    .join(", ")}
                                                                            </span>
                                                                        </li>
                                                                        {loading && state.index === toCities.length - 1 && (
                                                                            <div style={{ textAlign: 'center', padding: '8px' }}>
                                                                                <CircularProgress size={24} />

                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} size="small" variant="standard" />
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="align-items-end justify-content-center d-flex datesekect-div flex-md-nowrap flex-wrap gap-3 w-100">
                                                        <div className="d-flex gap-3 w-100 flex-wrap flex-sm-nowrap">

                                                            <div className="form-group flex-grow-1">
                                                                <label htmlFor="date" className="fw-semibold text-gray fs-6" style={{ marginBottom: "4%" }}>
                                                                    <FaCalendarDays />   date
                                                                </label>
                                                                <div style={{ borderBottom: ' 1px solid gray' }}>
                                                                    <DatePicker
                                                                        selected={selectedDate}
                                                                        onChange={handleDateChange}
                                                                        dateFormat="dd MMM yyyy"
                                                                        className="custom-date-input"
                                                                        minDate={new Date()}
                                                                    />

                                                                </div>
                                                            </div>


                                                            <div className="form-group flex-grow-1">
                                                                <label htmlFor="Bus" className="fw-semibold text-gray fs-6" style={{ marginBottom: "4%" }}>
                                                                    <FaBusAlt />   Bus Name (Optional)
                                                                </label>


                                                                <TextField
                                                                    id="Bus"
                                                                    variant="standard"
                                                                    value={inputValue}
                                                                    fullWidth
                                                                    onChange={(e) => setInputValue(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="btndivv mt-4 text-center">

                                                            <Button variant="contained" onClick={handleBusShow} style={{ backgroundColor: "rgb(121 44 143)" }}>
                                                                Search
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

            <PartnersSection />

            <BusBookingDiscountOffers offer={bannerMainImg} />

            <SathiBanner />

            <TicketStepsSection />

            <section className="mt-100 banner--sec">
                <div className="bnner--main">
                    <div>
                        <img src={bannerMainImg?.home_page_full_image} alt="" className="img-fluid w-100" />
                    </div>
                </div>
            </section>
            <ChooseUs />
            <Footer />
        </div>

    );
};

export default Home;