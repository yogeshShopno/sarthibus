import React, { useCallback, useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { MdLocationOn, MdOutlineArrowForwardIos, MdOutlineKeyboardArrowUp, } from "react-icons/md";
import { FaAngleDoubleDown, FaAngleLeft, FaAngleRight, FaBusAlt, FaChevronRight, FaFilter, } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import { GiSteeringWheel } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Tooltip from "@mui/material/Tooltip";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  selectClasses,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineReviews } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Slider,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "../../src/pages/busList.css";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import Loader from "../components/loader";
import debounce from "lodash.debounce";
import {
  Container,
  Dropdown,
  Modal,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineSwap } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import SeatType from "../components/SeatTypes";
import SeatLayout2 from "./seatLayout2";
import SeatLayout1 from "./seatLayout1";
import LoginPopup from "../components/LoginPopup";

const BusList = (seat) => {
  const firstInputRef = useRef("");
  const location = useLocation();
  const [cities, setCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [busShowModal, setBusShowModal] = useState(false);
  const [busPhotos, setBusPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const handleBusPhotosShow = () => setBusShowModal(true);
  // const handleBusPhotosClose = () => setBusShowModal(false);
  const handleBusPhotosShow = (id) => {
    setSelectedBusId(id);
    setBusShowModal(true);

    // const selectedBus = busPhotos.find((bus) => bus.id === id);
    const selectedBus = busList?.bus_array?.find((bus) => bus.id === id);

    // If the bus is found, update the state with its image_array
    if (selectedBus && selectedBus.image_array) {
      setBusPhotos(selectedBus.image_array);
      setCurrentIndex(0);
    } else {
      setBusPhotos([]); // Reset to an empty array if no images are found
    }
  };

  const handleNextImage = () => {
    if (currentIndex < busPhotos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBusPhotosClose = () => {
    setSelectedBusId(null);
    setBusShowModal(false);
  };
  // const [filteredCities, setFilteredCities] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    // setFrom(displayFrom);
    // setTo(displayTo);

    setShowModal(true);
    handleHideBusSeat();
  };
  const handleCloseModal = () => {

    setShowModal(false);
  };

  const {
    from: initialFrom,
    to: initialTo,
    formattedDate,
    inputValue: intialInputValue,
  } = location.state || { to: "", from: "", formattedDate: "", inputValue: "" };
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [displayFrom, setDisplayFrom] = useState(initialFrom);
  const [displayTo, setDisplayTo] = useState(initialTo);


  const [inputValue, setInputValue] = useState(intialInputValue);
  const [busInputValue, setBusInputValue] = useState("");
  const [busInputToValue, setBusInputToValue] = useState("");
  const dirIcon = process.env.PUBLIC_URL + "assets/images/direction.png";
  const [selectedDate, setSelectedDate] = useState(formattedDate);

  const [selectedboardingValue, setSelectedBoardingValue] = useState({});
  const [selecteddropingValue, setSelectedDropingValue] = useState({});
  const [gender, setGender] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [timer, setTimer] = useState(600); // 600 seconds = 10 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [busWisePickupDropPoints, setBusWisePickupDropPoints] = useState([]);
  const [selectedUpperSeats, setSelectedUpperSeats] = useState([]);
  const [selectedLowerSeats, setSelectedLowerSeats] = useState([]);
  const [busList, setBusList] = useState([]);
  const [imageSrcLower, setImageSrcLower] = useState({});
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [bookingPolicies, setBookingPolicies] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [busTypeID, setBusTypeID] = useState();
  const [busID, setBusID] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [serviceTax, setServiceTax] = useState(0);

  const [imageSrcUpper, setImageSrcUpper] = useState({});
  const [departureTime, setDepartureTime] = useState([
    "Before 6 am",
    "6 am to 12 pm",
    "12 pm to 6 pm",
    "After 6 pm",
  ]);
  // const [busType, setBusType] = useState(['AC', 'NON-AC', 'AC seater', 'AC sleeper', 'AC semi-sleeper'])
  // const [pickUpTime, setPickUpTime] = useState(['Morning', 'Afernoon', 'Evening', 'Night'])
  // const [dropofTime, setDropofTime] = useState(['Morning', 'Afernoon', 'Evening', 'Night'])
  const [operatorRating, setOperatorrating] = useState([5, 4, 3, 2, 1]);
  const seatEmpty =
    process.env.PUBLIC_URL + "assets/images/imgpsh_fullsize_anim (3).png";
  const seatBlack = process.env.PUBLIC_URL + "assets/images/seat-black.png";
  const seatPink = process.env.PUBLIC_URL + "assets/images/seat-pink.png";
  const seatBlue = process.env.PUBLIC_URL + "assets/images/seat purpule.png";
  const history = useHistory();
  const [showSeats, setShowSeats] = useState(false);
  const [value, setValue] = useState(0);
  const [selectedSeatLayout2, setSelectedSeatLayout2] = useState([])
  const [selectedSeatLayout1, setSelectedSeatLayout1] = useState([])


  const [selectedLowerSeat, setSelectedLowerSeat] = useState([]);
  const [selectedLowerSeatPrice, setSelectedLowerSeatPrice] = useState([]);
  const [selectedUpperSeat, setSelectedUpperSeat] = useState([]);
  const [selectedUpperSeatPrice, setSelectedUpperSeatPrice] = useState([]);
  const [selectedAmenitiesBusId, setSelectedAmenitiesBusId] = useState(null);
  const [selectedReviewBusId, setSelectedReviewBusId] = useState(null);
  const [selectedPoliciesBusId, setSelectedPoliciesBusId] = useState(null);
  const [selectedSeatBusId, setSelectedSeatBusId] = useState(null);
  const [busTypeImages, setBusTypeImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedAmenitiesId, setSelectedAmenitiesId] = useState([]);

  const [selectedBusTypeAc, setSelectedBusTypeAc] = useState([]);
  const [selectedBusType, setSelectedBusType] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);

  const [busAcType, setBusActype] = useState([]);
  const [busType, setBusType] = useState([]);
  const [price, setPrice] = useState([]);
  const [time, setTime] = useState([]);

  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [tempDate, setTempDate] = useState(formattedDate);

  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [bookingType, setBookingType] = useState("");

  const [filterSearch, setFilterSearch] = useState(false);

  const [openLogin, setOpenLogin] = useState(false)
  const [pendingBusItem, setPendingBusItem] = useState(null);

  const resetAddDialogReview = () => {
    setOpen(false);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    debouncedCityList();
    debouncedToCityList();
    localStorage.removeItem("passengerData");
  }, []);

  useEffect(() => {
    const upperSeats = selectedSeatLayout2
      .filter(seat => seat.UpLowBerth === 'UB')
      .map(seat => seat.SeatNo);

    const lowerSeats = selectedSeatLayout2
      .filter(seat => seat.UpLowBerth === 'LB')
      .map(seat => seat.SeatNo);

    const total = selectedSeatLayout2.reduce((sum, seat) => {
      return sum + (parseInt(seat.seat_price) || 0);
    }, 0);

    setSelectedUpperSeat(upperSeats);
    setSelectedLowerSeat(lowerSeats);
    setTotalPrice(total);
  }, [selectedSeatLayout2]);

  const handleSelectBoardingPoint = (event) => {
    const selectedPoint = busWisePickupDropPoints?.boarding_array?.find(
      (point) => point.boarding_id === event.target.value
    );
    localStorage.setItem(
      "SelectedBoardingValue",
      JSON.stringify(selectedPoint)
    );
    setSelectedBoardingValue(selectedPoint);
    setValue(1);
  };

  const handleSelectDropingPoint = (event) => {
    const selectedPoint = busWisePickupDropPoints?.droping_array?.find(
      (point) => point.droping_id === event.target.value
    );
    localStorage.setItem("SelectedDropingValue", JSON.stringify(selectedPoint));

    setSelectedDropingValue(selectedPoint);
  };

  useEffect(() => {
    const init = async () => {
      localStorage.setItem("redirectPath", location.pathname);

      busFilterData();
      await ResetFilter(formattedDate);
    };

    init();
  }, []);


  useEffect(() => {
    const userID = (localStorage.getItem("UserID"));
    const localBusType = JSON.parse(localStorage.getItem("bus_type"));
    const localBusId = JSON.parse(localStorage.getItem("bus_id"));
    const localMainBoardingPointId = JSON.parse(localStorage.getItem("main_boarding_point_id"));
    const localMainDropingPointId = JSON.parse(localStorage.getItem("main_droping_point_id"));
    const localBookingType = JSON.parse(localStorage.getItem("booking_type"));
    const localMainBoardingPointIdArr = JSON.parse(localStorage.getItem("main_boarding_point_id_arr"));
    const localMainDropingPointIdArr = JSON.parse(localStorage.getItem("main_droping_point_id_arr"));
    const SelectedDroping = JSON.parse(localStorage.getItem("SelectedDropingValue"));
    const SelectedBoarding = JSON.parse(localStorage.getItem("SelectedBoardingValue"));
    // const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    // const servicetax = JSON.parse(localStorage.getItem("serviceTax"));
    const selectedUpperSeats = JSON.parse(localStorage.getItem("selectedUpperSeats"));
    const totalPriceLocal = localStorage.getItem("totalPrice");
    // setSelectedLowerSeat(selectedSeats);
    // setSelectedUpperSeat(selectedUpperSeats);
    // setSelectedLowerSeats(selectedSeats);
    // setSelectedUpperSeats(selectedUpperSeats);
    if (
      userID &&
      localBusType &&
      localBusId &&
      localMainBoardingPointId &&
      localMainDropingPointId &&
      localBookingType &&
      localMainBoardingPointIdArr &&
      localMainDropingPointIdArr

    ) {
      handleShowBusSeat(
        localBusType,
        localBusId,
        localMainBoardingPointId,
        localMainDropingPointId,
        localBookingType,
        localMainBoardingPointIdArr,
        localMainDropingPointIdArr
      );
      setSelectedDropingValue(SelectedDroping);
      setSelectedBoardingValue(SelectedBoarding);
      setTotalPrice(totalPriceLocal);
      // setSelectedLowerSeat(selectedSeats);
      // setSelectedUpperSeat(selectedUpperSeats);
      // setSelectedLowerSeats(selectedSeats);
      // setSelectedUpperSeats(selectedUpperSeats);
      // setServiceTax(servicetax);
    } else {
      console.error(
        "Some parameters are missing in local storage. Skipping API call."
      );
    }
  }, []);

  useEffect(() => { }, [
    from?.id,
    to?.id,
    formattedDate,
    selectedUpperSeat,
    selectedLowerSeat,
    priceRange,
    fromTime,
    toTime,
    selectedBusType,
    selectedPrice,
    selectedTime,
    selectedBusTypeAc,
    selectedAmenities,
    selectedAmenitiesId,
  ]);

  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <input ref={ref} value={value} onClick={onClick} readOnly />
  ));

  const isBookedLower = (seat) => {
    const localSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    const isSelf = localSeats?.includes(seat.seat_number);
    return seat.is_booked && !isSelf;
  };

  const isBookedUpper = (seat) => {
    const localSeats = JSON.parse(localStorage.getItem("selectedUpperSeats"));
    const isSelf = localSeats?.includes(seat.seat_number);
    return seat.is_booked && !isSelf;
  };
  // Function to compare boarding date and time with current date and time
  const isBoardingTimePassed = (boardingTime) => {
  if (!selectedDate || !boardingTime) return false;

  try {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const boardingDateObj = new Date(year, month - 1, day);

    const now = new Date();

    // If the boarding date is in the future → not passed
    if (boardingDateObj.toDateString() !== now.toDateString()) {
      return false;
    }

    // Parse time (e.g. "6:30 PM")
    const [time, meridian] = boardingTime.trim().split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

    // Build today's boarding datetime
    const boardingTimeToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute
    );

    return boardingTimeToday < now; // true if time already passed today
  } catch (err) {
    console.error("Invalid boardingTime:", boardingTime, err);
    return false;
  }
};

  useEffect(() => {
    if (formattedDate) {
      if (filterSearch == true) {
        searchwisebusList(formattedDate);
      }
    }
  }, [selectedBusTypeAc, selectedBusType, selectedPrice, selectedTime, formattedDate]);

  const searchwisebusList = async (formattedDate) => {
    setLoading(true);

    let data = new FormData();
    const amenitiesJSON = JSON.stringify(selectedAmenitiesId);

    data.append("boarding_point", from?.city_id);
    data.append("infinity_boarding_point", from?.infinity_id);
    data.append("droping_point", to?.city_id);
    data.append("infinity_droping_point", to?.infinity_id);
    data.append("date", formattedDate);
    data.append("bus_name", inputValue ? inputValue : "");
    data.append(
      "bus_ac_types",
      selectedBusTypeAc.length === 0
        ? ""
        : selectedBusTypeAc[0] === "AC"
          ? 1
          : selectedBusTypeAc[0] === "NON-AC"
            ? 2
            : ""
    );
    data.append(
      "bus_types",
      selectedBusType.length === 0
        ? ""
        : selectedBusType[0] === "Sleeper"
          ? 1
          : selectedBusType[0] === "Seater"
            ? 3
            : ""
    );
    data.append(
      "price_range_type",
      selectedPrice.length === 0
        ? ""
        : selectedPrice[0] === "Low To High"
          ? 1
          : selectedPrice[0] === "High To Low"
            ? 2
            : ""
    );

    const timeMapping = {
      "Before 6 AM": 1,
      "6 AM to 12 PM": 2,
      "12 PM to 6 PM": 3,
      "After 6 PM": 4,
    };

    const arrivalTime =
      selectedTime.length === 0 ? "" : timeMapping[selectedTime[0]] || "";

    data.append("arrival_time", arrivalTime);

    data.append("from_price", "");
    data.append("to_price", "");
    data.append(
      "from_time",
      fromTime ? dayjs(fromTime).format("HH:mm:ss") : ""
    );
    data.append("to_time", toTime ? dayjs(toTime).format("HH:mm:ss") : "");
    data.append("amenities", amenitiesJSON);

    try {
      await axios.post("search_bus", data, {}).then((res) => {
        setBusList(res.data.data);
        setOpenDialog(false);
        setLoading(false);

        firstInputRef.current?.focus();
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const intialBus = async (formattedDate) => {
    setFilterSearch(false)
    setLoading(true);
    let data = new FormData();
    const amenitiesJSON = JSON.stringify(selectedAmenitiesId);
    data.append("boarding_point", from?.city_id);
    data.append("infinity_boarding_point", from?.infinity_id);
    data.append("droping_point", to?.city_id);
    data.append("infinity_droping_point", to?.infinity_id);
    data.append("date", formattedDate);
    data.append("bus_name", inputValue ? inputValue : "");

    try {
      await axios.post("search_bus", data, {}).then((res) => {
        setBusList(res.data.data);
        setOpenDialog(false);

        setSelectedBusTypeAc([]);
        setBusPhotos(res.data.data.bus_array);
        setSelectedBusType([]);
        setSelectedPrice([]);
        setSelectedTime([]);
        setFromTime();
        setToTime();
        setSelectedBusTypeAc("");
        setSelectedBusType("");
        setPriceRange([500, 5000]);
        setSelectedAmenities([]);
        setSelectedAmenitiesId([]);
        firstInputRef.current?.focus();
      });
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const ResetFilter = async (formattedDate) => {
    setFilterSearch(false)
    setLoading(true);
    let data = new FormData();
    const amenitiesJSON = JSON.stringify(selectedAmenitiesId);
    data.append("boarding_point", from?.city_id);
    data.append("infinity_boarding_point", from?.infinity_id);
    data.append("droping_point", to?.city_id);
    data.append("infinity_droping_point", to?.infinity_id);
    data.append("date", formattedDate);
    data.append("bus_name", inputValue ? inputValue : "");

    try {
      await axios.post("search_bus", data, {}).then((res) => {
        setBusList(res.data.data);
        setOpenDialog(false);

        setSelectedBusTypeAc([]);
        setBusPhotos(res.data.data.bus_array);
        setSelectedBusType([]);
        setSelectedPrice([]);
        setSelectedTime([]);
        setFromTime();
        setToTime();
        setSelectedBusTypeAc("");
        setSelectedBusType("");
        setPriceRange([500, 5000]);
        setSelectedAmenities([]);
        setSelectedAmenitiesId([]);
        firstInputRef.current?.focus();
      });
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const busLayoutAPI = async (busId, booking_type) => {
    let data = new FormData();
    data.append("bus_id", busId);
    data.append("booking_date", selectedDate);
    data.append("calling_type", 1);
    data.append("booking_type", booking_type);

    setLoading(true);

    let url = "";
    if (booking_type === "2") {
      url = "bus_layout_new";
    } else if (booking_type === "1") {
      url = "bus_layout_old";
    } else {
      console.error("Error in selecting booking type layout");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(url, data);
      if (res.data.success) {
        if (booking_type === "2") {
          setBusLayoutData(res.data.data);
          const secondRes = await axios.post("bus_layout", data);
          if (secondRes.data.success) {
            setBusLayoutData2(secondRes.data.data);

          } else {
            toast.error(secondRes.data.message || "Invalid second layout message");
          }
        } else if (booking_type === "1") {
          const layoutData = res.data.data.BusLayoutData[0].layout; // Ensure that layout data exists
          setBusLayoutData(layoutData)
          const secondRes = await axios.post("bus_layout", data);
          if (secondRes.data.success) {
            setBusLayoutData2(secondRes.data.data);

          } else {
            toast.error(secondRes.data.message || "Invalid second layout message");
          }


        }
      } else {
        toast.error(res.data.message || "Invalid Message");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const BusWiseBoardingDroppingPoints = async (
    busId,
    main_boarding_point_id,
    main_droping_point_id,
    booking_type,
    main_boarding_point_id_arr,
    main_droping_point_id_arr
  ) => {
    setLoading(true);

    let data = new FormData();
    data.append("bus_id", busId);
    data.append("boarding_point_id", main_boarding_point_id);
    data.append("droping_point_id", main_droping_point_id);
    data.append("booking_type", booking_type);
    data.append("boarding_point_id_arr", main_boarding_point_id_arr);
    data.append("droping_point_id_arr", main_droping_point_id_arr);
    data.append("calling_type", 1);
    try {
      await axios.post("boarding_dropping_points", data, {}).then((res) => {
        if (res.data.success == true) {
          setBusWisePickupDropPoints(res.data.data);
        } else {
          toast.error(res.data.message || "Invalid Message");
        }
      });
      setLoading(false);
    } catch (res) {
      toast.error(res.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const busFilterData = async () => {
    let data = new FormData();

    try {
      await axios.post("bus_filter_list", data, {}).then((res) => {
        setAmenities(res.data.data?.amenities);
        setBusActype(res.data.data?.bus_ac_types);
        setBusType(res.data.data?.bus_types);
        setPrice(res.data.data?.price_range_type);
        setTime(res.data.data?.arrival_time);
      });
    } catch (error) {
      toast.error(error.data.message);
    } finally {
    }
  };

  const opratorRatingImages = [
    "assets/icons/star icon.svg",
    "assets/icons/star icon.svg",
    "assets/icons/star icon.svg",
    "assets/icons/star icon.svg",
    "assets/icons/star icon.svg",
  ];

  const updateTotalPrice = (newSelectedSeats) => {
    const newTotalPrice = newSelectedSeats.reduce((acc, seatNumber) => {
      const seat = findSeatByNumber(seatNumber);
      return parseFloat(acc) + parseFloat(seat ? seat.seat_price : 0);
    }, 0);
    setTotalPrice(newTotalPrice);
    localStorage.setItem("totalPrice", newTotalPrice);
  };

  const findSeatByNumber = (seatNumber) => {
    const combinedLayouts = [
      ...busLayoutData.BusLayoutData[0].lower_layout,
      ...busLayoutData.BusLayoutData[0].upper_layout,
    ];

    for (let row of combinedLayouts) {
      for (let seat of row) {
        if (seat.seat_number === seatNumber) {
          return seat;
        }
      }
    }
    return null;
  };

  const getLowwerSeatPrices = (selectedSeats) => {
    const seatPrices = selectedSeats.map((seatNumber) => {
      for (const row of busLayoutData?.BusLayoutData[0].lower_layout) {
        const seat = row.find((seat) => seat.seat_number === seatNumber);
        if (seat) {
          return parseInt(seat.seat_price, 10);
        }
      }
      return 0;
    });
    return seatPrices;
  };

  const getUpperSeatPrices = (selectedSeats) => {
    const seatPrices = selectedSeats.map((seatNumber) => {
      for (const row of busLayoutData?.BusLayoutData[0].upper_layout) {
        const seat = row.find((seat) => seat.seat_number === seatNumber);
        if (seat) {
          return parseInt(seat.seat_price, 10);
        }
      }
      return 0;
    });
    return seatPrices;
  };

  const handleClickLowerSeat = (seatNumber) => {
    setSelectedLowerSeats((prevSelectedSeats) => {
      const isSelected = prevSelectedSeats.includes(seatNumber);
      const newSelectedSeats = isSelected
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber];
      const allSelectedSeats = [...newSelectedSeats, ...selectedUpperSeats];
      setSelectedLowerSeat(newSelectedSeats);


      updateTotalPrice(allSelectedSeats);

      setImageSrcLower((prevImageSrc) => ({
        ...prevImageSrc,
        [seatNumber]: isSelected ? seatEmpty : seatBlue,
      }));

      const seatPrices = getLowwerSeatPrices(newSelectedSeats);
      setSelectedLowerSeatPrice(seatPrices);
      return newSelectedSeats;
    });
  };

  const handleClickUpperSeat = (seatNumber) => {

    setSelectedUpperSeats((prevSelectedSeats) => {
      const isSelected = prevSelectedSeats.includes(seatNumber);
      const newSelectedSeats = isSelected
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber];
      const allSelectedSeats = [...selectedLowerSeats, ...newSelectedSeats];
      setSelectedUpperSeat(newSelectedSeats);
      updateTotalPrice(allSelectedSeats);

      setImageSrcUpper((prevImageSrc) => ({
        ...prevImageSrc,
        [seatNumber]: isSelected ? seatEmpty : seatBlue,
      }));

      const seatPrices = getUpperSeatPrices(newSelectedSeats);
      setSelectedUpperSeatPrice(seatPrices);

      return newSelectedSeats;
    });
  };

  const [busLayoutData, setBusLayoutData] = useState([]);
  const [busLayoutData2, setBusLayoutData2] = useState([]);




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const savedRedirectPath = localStorage.getItem("redirectPath");

    if (savedRedirectPath === "/login") {
      setFrom(initialFrom);
      setTo(initialTo);
      setSelectedDate(formattedDate);
      localStorage.removeItem("redirectPath");
    }
  }, [location.state]);

  const handleShowBusSeat = (

    busType,
    busId,
    main_boarding_point_id,
    main_droping_point_id,
    booking_type,
    main_boarding_point_id_arr,
    main_droping_point_id_arr
  ) => {





    localStorage.setItem("bus_type", JSON.stringify(busType));
    localStorage.setItem("main_boarding_point_id", JSON.stringify(main_boarding_point_id));
    localStorage.setItem("main_droping_point_id", JSON.stringify(main_droping_point_id));
    localStorage.setItem("booking_type", JSON.stringify(booking_type));
    localStorage.setItem("main_boarding_point_id_arr", JSON.stringify(main_boarding_point_id_arr));
    localStorage.setItem("main_droping_point_id_arr", JSON.stringify(main_droping_point_id_arr));

    const localBusId = localStorage.getItem("bus_id");
    // const localSeat = localStorage.getItem("selectedSeats");
    // const localUpperSeat = localStorage.getItem("selectedUpperSeats");

    // if (selectedBusId !== busId) {
    setSelectedLowerSeats([]);
    setSelectedSeatBusId(busId);
    setSelectedUpperSeats([]);
    setSelectedLowerSeatPrice([]);
    setSelectedUpperSeatPrice([]);
    setSelectedUpperSeat([]);
    setSelectedLowerSeat([]);
    setImageSrcLower({});
    setImageSrcUpper({});
    setSelectedDropingValue({});
    setSelectedBoardingValue({});
    setTotalPrice(0);

    // if (busId == JSON.parse(localBusId) && localSeat) {
    //   setSelectedLowerSeats(JSON.parse(localSeat));
    // }

    // if (busId == JSON.parse(localBusId) && localUpperSeat) {
    //   setSelectedUpperSeats(JSON.parse(localUpperSeat));
    // }
    // }

    setSelectedBusId(busId);
    setBusTypeID(busType);
    setShowSeats(true);
    setReviewOpen(false);
    setBookingPolicies(false);
    setAmenitiesOpen(false);
    setBusID(busId);
    setBookingType(booking_type);
    busLayoutAPI(busId, booking_type);
    BusWiseBoardingDroppingPoints(
      busId,
      main_boarding_point_id,
      main_droping_point_id,
      booking_type,
      main_boarding_point_id_arr,
      main_droping_point_id_arr
    );

  };

  const handleHideBusSeat = () => {
    setOpen(false);
    setSelectedSeatBusId(null);
    setSelectedLowerSeats([]);
    setSelectedBusId(null);
    setSelectedSeatBusId(null);
    setSelectedPoliciesBusId(null);
    setSelectedReviewBusId(null);
    setSelectedAmenitiesBusId(null);
    setShowSeats(false);
    setTotalPrice(0);
    setSelectedUpperSeat([]);
    setSelectedLowerSeat([]);
    setSelectedDropingValue({});
    setSelectedBoardingValue({});
  };

  const handleShowBookingPolicies = (busId) => {
    setReviewOpen(false);
    setAmenitiesOpen(false);
    setShowSeats(false);
    setBookingPolicies(true);
    setSelectedBusId(busId);
    setSelectedPoliciesBusId(busId);
  };

  const handleHideBookingPolicies = (busId) => {
    setBookingPolicies(false);
    setSelectedBusId(busId);
    setSelectedPoliciesBusId(null);
  };
  const [filters, setFilters] = useState({
    departureTime: {
      before6am: false,
      sixAmTo12pm: false,
      twelvePmTo6pm: false,
      after6pm: false,
    },
    busTypes: {
      ac: false,
      nonAc: false,
      acSeater: false,
      acSleeper: false,
      acSemiSleeper: false,
    },
    pickupTimeSurat: {
      earlyMorning: false,
      morning: false,
    },
    dropoffTimeJetpur: {
      earlyMorning: false,
      morning: false,
    },
  });

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

  const cityToList = async (searchTerm, start = 0) => {
    let data = new FormData();
    data.append("city_name", searchTerm);
    data.append("start", start);
    data.append("limit", 50);
    data.append("calling_type", 1);
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
      console.error("Error fetching filtered city list:", error);
    } finally {
    }
  };

  const loadMoreCities = () => {
    setStart((prevStart) => {
      const newStart = prevStart + 50;
      cityList("", newStart);
      cityToList("", newStart);
      return newStart;
    });
  };

  const handleScroll = (event) => {
    const target = event.target;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;

    if (bottom && !loading) {
      cityList("", start);
      cityToList("", start);
    }
    loadMoreCities();
  };

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && location.state) {
      const {
        from: initialFrom,
        to: initialTo,
        formattedDate,
        inputValue: intialInputValue,
      } = location.state;

      setFrom(initialFrom);
      setTo(initialTo);
      setDisplayFrom(initialFrom);
      setDisplayTo(initialTo);
      setSelectedDate(formattedDate);
      setInputValue(intialInputValue);

      isFirstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    cityList("", 0);
    cityToList("", 0);
  }, []);

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
    await cityList("");
  };

  const fetchToCityListInstant = async () => {
    await cityToList("");
  };

  const handleCheckboxChange = (facilityName, facilityId) => {
    setSelectedAmenities((prevSelected) => {
      if (prevSelected.includes(facilityName)) {
        return prevSelected.filter((item) => item !== facilityName);
      } else {
        return [...prevSelected, facilityName];
      }
    });

    setSelectedAmenitiesId((prevSelected) => {
      if (prevSelected.some((item) => item.id === facilityId)) {
        return prevSelected.filter((item) => item.id !== facilityId);
      } else {
        return [...prevSelected, { id: facilityId }];
      }
    });
  };

  const handleCheckboxBusTypeAc = (type) => {
    setSelectedBusTypeAc((prev) =>
      prev.includes(type) ? [] : [type]
    );
  };

  const handleCheckboxBusType = (type) => {
    setSelectedBusType((prev) =>
      prev.includes(type) ? [] : [type]
    );
  };

  const handleCheckboxPriceType = (type) => {
    setSelectedPrice((prev) =>
      prev.includes(type) ? [] : [type]
    );
  };

  const handleCheckboxTimeType = (type) => {
    setSelectedTime((prev) =>
      prev.includes(type) ? [] : [type]
    );
  };

  const seatHoldAPI = async (item) => {
    setLoading(true);
    const selectedTotalSeat = selectedUpperSeats.concat(selectedLowerSeats);
    let data = new FormData();
    data.append("user_id", localStorage.getItem("UserID"));
    data.append("bus_id", item?.id);
    data.append("booking_type", item?.booking_type);
    data.append("booking_date", formattedDate);
    data.append("boarding_point_id", selectedboardingValue.boarding_id);
    data.append("booking_date", formattedDate);

    // localStorage.setItem("selectedSeats", JSON.stringify(selectedLowerSeats));
    // localStorage.setItem(
    //   "selectedUpperSeats",
    //   JSON.stringify(selectedUpperSeats)
    // );

    localStorage.setItem("bus_id", JSON.stringify(item?.id));
    const tempServiceTaxArray = [];

    for (let i = 0; i < selectedTotalSeat.length; i++) {
      const seatNumber = selectedTotalSeat[i];
      const seatPrice = findSeatPriceByNumber1(seatNumber);
      const serviceTax = findServiceTaxByNumber1(seatNumber);
      tempServiceTaxArray.push(serviceTax);
      data.append(`seat_number[${i}]`, seatNumber);
      data.append(`seat_price[${i}]`, seatPrice);
      data.append(`service_tax[${i}]`, serviceTax);
    }
    setServiceTax(tempServiceTaxArray);

    try {
      await axios.post("ticket_booking_hold_data", data, {}).then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          if (res.data.message == "Successfully hold.") {
            const endTime = Date.now() + 300000;

            localStorage.setItem("timerEnd", endTime);

            history.push({
              pathname: "/passange-details",
              state: {
                selectedUpperSeat,
                selectedLowerSeat,
                selectedUpperSeats,
                selectedLowerSeats,
                totalPrice,
                serviceTax: tempServiceTaxArray,
                selectedUpperSeatPrice,
                selectedLowerSeatPrice,
                bus_id: item?.id,
                bus_name: item?.bus_name,
                bus_ac: item?.bus_ac,
                selectedboardingValue,
                selecteddropingValue,
                droping_time: item?.droping_time,
                boarding_time: item?.boarding_time,
                droping_date: item?.droping_date,
                boarding_date: item?.boarding_date,
                boarding_point_name: item?.boarding_point_name,
                droping_point_name: item?.droping_point_name,
                busIcon: busList?.image_url + item?.bus_image,
                time_different: item?.time_different,
                formattedDate,
                to,
                from,
                inputValue,
                main_boarding_point_id: item?.main_boarding_point_id,
                main_droping_point_id: item?.main_droping_point_id,
                booking_type: item?.booking_type,
                main_boarding_point_id_arr: item?.main_boarding_point_id_arr,
                main_droping_point_id_arr: item?.main_droping_point_id_arr,
              },
            });
          } else {
            toast.success(res.data.message);
          }
        } else {
          toast.error(res.data.message || "Invalid Message");
        }
      });
    } catch (res) {
      toast.error(res.data.message);
    } finally {
      setLoading(false);
    }
  };

  const findSeatPriceByNumber1 = (seatNumber) => {
    if (bookingType === "2") {
      const lowerSeat = busLayoutData2.BusLayoutData[0].lower_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);
      const upperSeat = busLayoutData2.BusLayoutData[0].upper_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);

      if (lowerSeat) {
        return lowerSeat.seat_price;
      } else if (upperSeat) {
        return upperSeat.seat_price;
      }

      return 0;
    } else if (bookingType === "1") {
      const lowerSeat = busLayoutData2.BusLayoutData[0].lower_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);
      const upperSeat = busLayoutData2.BusLayoutData[0].upper_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);

      if (lowerSeat) {
        return lowerSeat.seat_price;
      } else if (upperSeat) {
        return upperSeat.seat_price;
      }

      return 0;
    }

  };


  const findServiceTaxByNumber1 = (seatNumber) => {
    if (bookingType === "2") {
      const lowerSeat = busLayoutData2.BusLayoutData[0].lower_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);
      const upperSeat = busLayoutData2.BusLayoutData[0].upper_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);

      if (lowerSeat) {
        return lowerSeat.service_tax;
      } else if (upperSeat) {
        return upperSeat.service_tax;
      }

      return 0;
    }
    else if (bookingType === "1") {
      const lowerSeat = busLayoutData2.BusLayoutData[0].lower_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);
      const upperSeat = busLayoutData2.BusLayoutData[0].upper_layout
        .flat()
        .find((seat) => seat.seat_number === seatNumber);

      if (lowerSeat) {
        return lowerSeat.service_tax;
      } else if (upperSeat) {
        return upperSeat.service_tax;
      }

      return 0;
    }
  };
  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleConfirmSeat = (item) => {

    const newErrors = {};


    const userID = localStorage.getItem("UserID");
    if (!userID) {
      toast.error("Please Login To Book Ticket");
      newErrors.selectedLowerSeats = "Select any Seat";
      setPendingBusItem(item);
      setOpenLogin(true)
      return; // stop here until login
    }
    if (selectedLowerSeats.length == 0 && selectedUpperSeats.length == 0 && selectedSeatLayout2.length == 0) {
      newErrors.selectedLowerSeats = "Select any Seat";
      toast.error("Select any Seat");
    } else if (!selectedboardingValue?.boarding_id) {
      newErrors.selectedboardingValue = "Select any Boarding Points";
      toast.error("Select any Boarding Points");
    } else if (!selecteddropingValue?.droping_id) {
      newErrors.selecteddropingValue = "Select any Droping Points";
      toast.error("Select any Droping Points");
    } else if (totalPrice < 1) {
      newErrors.totalPrice = "Select ";
      toast.error("Select any Seat");
    }


    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      seatHoldAPI(item);
    }
  };

  const selectedBus = busList?.bus_array?.find(
    (bus) => bus.id === selectedBusId
  );

  const handleSearch = () => {

    const newErrors = {};

    if (!from) {
      newErrors.from = "From city is required";
      toast.error("From city is required");
    }
    if (!to) {
      newErrors.to = "To city is required";
      toast.error("To city is required");
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      // setDisplayFrom(from);
      // setDisplayTo(to);
      setFilterSearch(false)
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setTempDate(formattedDate);
      setSelectedDate(formattedDate);
      busFilterData();
      setOpenDialog(false);
      ResetFilter(formattedDate);
      localStorage.removeItem("selectedSeats");
      localStorage.removeItem("selectedUpperSeats");
      handleCloseModal();
    }
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
        <div className="breadcrumbs--div">
          <div className="container">
            <div className="breadcrumb flex-sm-nowrap justify-content-between align-items-center my-3 text-capitalize" style={{ gap: "30px" }}>
              <div className="datedestination flex-fill">
                <span>{format(tempDate, "d MMM yyyy")}</span>
                <h5><ul
                  className="list-unstyled d-flex gap-2 align-items-center m-0"
                  ref={firstInputRef}
                  tabIndex={-1}
                  style={{ outline: "none" }}
                >
                  <li style={{ whiteSpace: "nowrap" }}>
                    {displayFrom?.city_name}
                  </li>
                  <li>
                    <MdOutlineArrowForwardIos />
                  </li>
                  <li style={{ whiteSpace: "nowrap" }}>
                    {displayTo?.city_name}
                  </li>
                </ul>
                </h5>
              </div>

              <div className="d-flex gap-3 flex-fill justify-content-end">
                <div className="d-md-none d-sm-block flex-fill">
                  <Navbar
                    expand="lg"
                    className="justify-content-center p-0 w-100"
                  >
                    <div className="w-100">
                      <div className="w-100">
                        <Button
                          className="px-4 py-1 w-100 gap-2"
                          variant="contained"
                          onClick={handleShow}
                          sx={{
                            paddingInline: "50px",
                          }}
                          style={{
                            border: "2px solid rgb(121 44 143)",
                            backgroundColor: "white",
                            color: "rgb(121 44 143)",
                          }}
                        >
                          <FaFilter /> Filter
                        </Button>
                      </div>
                    </div>
                  </Navbar>
                </div>
                <div className="flex-md-grow-0 flex-fill">
                  <Button
                    variant="contained"
                    onClick={handleShowModal}
                    style={{ backgroundColor: "rgb(121 44 143)" }}
                    data-toggle="modal"
                    data-target="#exampleModal"
                    className="h-100 px-4 py-1 w-100 gap-2"
                  >
                    <FontAwesomeIcon icon={faPenNib} /> Modify
                  </Button>
                </div>
                {showModal && (
                  <div
                    className="modal fade show filter_modal_bus_list "
                    style={{
                      display: "block",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                    tabIndex="-1"
                    role="dialog"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-body">
                          <div class="d-flex justify-content-end">
                            <IoMdClose onClick={handleCloseModal} size={20} />
                          </div>
                          <div className="p-3">
                            <div className="align-items-center d-flex flex-column flex-sm-row justify-content-center">
                              <div className="form-group w-100">
                                <label
                                  htmlFor="from"
                                  className="fw-semibold text-gray fs-6 mb-3"
                                >
                                  <FaBusAlt /> From City
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
                                  value={from}
                                  onChange={(event, newValue) => {
                                    setFrom(newValue);
                                  }}
                                  onInputChange={(event, newInputValue) => {
                                    handleInputChange(newInputValue);
                                  }}
                                  onFocus={() => {
                                    if (cities.length === 0) cityList("", 0);
                                    fetchCityListInstant("");
                                  }}
                                  onScroll={handleScroll}
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
                                        setFrom(selectedOption);
                                      }
                                    }
                                  }}
                                  ListboxProps={{
                                    onScroll: handleScroll,
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
                                        onClick={() => setFrom(option)}
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

                                      {loading &&
                                        state.index === cities.length - 1 && (
                                          <div
                                            style={{
                                              textAlign: "center",
                                              padding: "8px",
                                            }}
                                          >
                                            <CircularProgress size={24} />
                                          </div>
                                        )}
                                    </>
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      size="small"
                                      variant="standard"
                                    />
                                  )}
                                />
                              </div>
                              <div className="directimg-g text-opacity-50 fs-2 text-dark">
                                <AiOutlineSwap onClick={swapLocations} />
                              </div>
                              <div className="form-group w-100">
                                <label
                                  htmlFor="to"
                                  className="fw-semibold text-gray fs-6 mb-3"
                                >
                                  <MdLocationOn /> To City
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
                                  onInputChange={(event, newInputValue) => {
                                    handleInputToChange(newInputValue);
                                  }}
                                  onFocus={() => {
                                    if (toCities.length === 0)
                                      cityToList("", 0);
                                    fetchToCityListInstant("");
                                  }}
                                  onScroll={handleScroll}
                                  onKeyDown={(event) => {
                                    if (
                                      event.key === "ArrowDown" ||
                                      event.key === "Enter"
                                    ) {
                                      const selectedOption = toCities.find(
                                        (city) =>
                                          city.city_name === busInputToValue
                                      );
                                      if (selectedOption) {
                                        setTo(selectedOption);
                                      }
                                    }
                                  }}
                                  ListboxProps={{
                                    onScroll: handleScroll,
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
                                        onClick={() => setTo(option)}
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

                                      {loading &&
                                        state.index === toCities.length - 1 && (
                                          <div
                                            style={{
                                              textAlign: "center",
                                              padding: "8px",
                                            }}
                                          >
                                            <CircularProgress size={24} />
                                          </div>
                                        )}
                                    </>
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      size="small"
                                      variant="standard"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <div className="align-items-center d-flex gap-5 justify-content-center mt-5 flex-column flex-sm-row">
                              <div className="form-group w-100">
                                <label
                                  htmlFor="date"
                                  className="fw-semibold text-gray mb-3"
                                >
                                  <FaCalendarDays /> Date
                                </label>
                                <div style={{ borderBottom: "1px solid #cfcfcf" }}>
                                  <DatePicker
                                    selected={selectedDate}
                                    onChange={setSelectedDate}
                                    className="custom-date-input"
                                    dateFormat="d MMM yyyy"
                                    minDate={new Date()}
                                  />
                                </div>
                              </div>
                              <div className="form-group w-100">
                                <label
                                  htmlFor="Bus"
                                  className="fw-semibold text-gray mb-3"
                                >
                                  <FaBusAlt /> Bus Name (Optional)
                                </label>
                                <TextField
                                  id="Bus"
                                  variant="standard"
                                  value={inputValue}
                                  fullWidth
                                  onChange={(e) =>
                                    setInputValue(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer gap-2 d-flex mt-3">
                          <Button
                            onClick={handleCloseModal}
                            style={{
                              width: "40%",
                              border: "2px solid rgb(121 44 143)",
                              color: "rgb(121 44 143)",
                            }}
                          >
                            Close
                          </Button>
                          <Button
                            variant="contained"
                            style={{
                              width: "40%",
                              backgroundColor: "rgb(121 44 143)",
                            }}
                            onClick={handleSearch}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="searchpage--main mt-2 card-border">
          <div className="searchpagediv">
            <div className="container-fluid container-xl">
              <div className="serchpagerow m-auto">
                <div className="row">
                  <div
                    className="col-lg-3 col-md-4 col-xl-3 border-right d-md-block d-sm-none d-none"
                    style={{
                      borderRight: "1px solid gainsboro",
                    }}
                  >
                    <div
                      className="serchpage--filterdiv"
                      style={{ position: "sticky", top: "15px" }}
                    >
                      <div className="srcfh-filter">
                        <div className="titlediv">
                          <h5 className="fw-bolder text-capitalize">filters</h5>
                        </div>
                        <div className="filter--main">


                          <div className="fltrtitle my-4">
                            <h5 className="text-capitalize fw-semibold d-flex">
                              bus ac
                              <p style={{
                                fontSize: "medium",
                                paddingLeft: "8px",
                              }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row align-items-center">
                              {busAcType.map((label, index) => (
                                <li
                                  className="fltrli mb-2 col-md-6 p-2 pt-0"
                                  key={index}
                                >
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`bustype-ac-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedBusTypeAc.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxBusTypeAc(label.type)
                                        setFilterSearch(true)
                                      }
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`bustype-ac-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #dfdfdf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        justifyContent: "space-between", // push cross to right
                                        width: "100%", // make full width
                                      }}
                                    >
                                      {/* Left section: image + text */}
                                      <div className="d-flex align-items-center gap-2">
                                        {label.image && (
                                          <img
                                            src={label?.image}
                                            alt={label.type}
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                              objectFit: "cover",
                                              background: "white",
                                              padding: "1px",
                                              border: "2px solid white",
                                              borderRadius: "2px",
                                            }}
                                          />
                                        )}
                                        <span
                                          style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          {label.type}
                                        </span>
                                      </div>

                                      {/* Right section: cross */}
                                      {selectedBusTypeAc.includes(label.type) && (
                                        <span
                                          style={{
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                            marginLeft: "auto", // ensure push right
                                          }}
                                        >
                                          <ImCross
                                            style={{
                                              color: "white",
                                              marginBottom: "2px",
                                            }}
                                          />
                                        </span>
                                      )}
                                    </label>

                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="fltrtitle my-4">
                            <h5 className="text-capitalize fw-semibold d-flex">
                              bus type
                              <p
                                style={{
                                  fontSize: "medium",
                                  paddingLeft: "8px",
                                }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row align-items-center">
                              {busType.map((label, index) => (
                                <li
                                  className="fltrli mb-2 col-md-6 p-2 pt-0"
                                  key={index}
                                >
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`bustype-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedBusType.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxBusType(label.type)
                                        setFilterSearch(true)
                                      }}
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`bustype-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        // justifyContent: "center"
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}
                                      <span style={{ fontSize: "13px" }}>
                                        {label.type}
                                      </span>
                                      {selectedBusType.includes(label.type) && (
                                        <span

                                          style={{
                                            cursor: "pointer",
                                            color: "#888",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                            marginLeft: "auto", // ensure push right
                                          }}
                                        >
                                          <ImCross style={{
                                            color: "white",
                                            marginBottom: "2px",
                                          }} />
                                        </span>
                                      )}

                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="fltrtitle my-4">
                            <h5 className="text-capitalize fw-semibold d-flex">
                              Sort By Price
                              <p
                                style={{
                                  fontSize: "medium",
                                  paddingLeft: "8px",
                                }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row align-items-center">
                              {price.map((label, index) => (
                                <li
                                  className="fltrli mb-2 col-md-6 p-2 pt-0"
                                  key={index}
                                >
                                  <div >
                                    <input
                                      type="checkbox"
                                      id={`price-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedPrice.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxPriceType(label.type)
                                        setFilterSearch(true)
                                      }
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`price-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        // justifyContent: "center"
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}

                                      <span style={{ fontSize: "13px" }}>
                                        {label.type}
                                      </span>
                                      {selectedPrice.includes(label.type) && (
                                        <span

                                          style={{
                                            cursor: "pointer",
                                            color: "#888",
                                            fontWeight: "bold",
                                            fontSize: "14px",

                                          }}
                                        >
                                          <ImCross style={{
                                            color: "white",
                                            marginBottom: "2px",
                                          }} />

                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="fltrtitle my-4">
                            <h5 className="text-capitalize fw-semibold d-flex">
                              Arrival Time
                              <p
                                style={{
                                  fontSize: "medium",
                                  paddingLeft: "8px",
                                }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row align-items-center">
                              {time.map((label, index) => (
                                <li
                                  className="fltrli mb-2 col-md-6 p-2 pt-0"
                                  key={index}
                                >
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`time-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedTime.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxTimeType(label.type)
                                        setFilterSearch(true)

                                      }
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`time-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        // justifyContent: "center"
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}

                                      <span style={{ fontSize: "12px" }}>
                                        {label.type}
                                      </span>
                                      {selectedTime.includes(label.type) && (
                                        <span

                                          style={{
                                            cursor: "pointer",
                                            color: "#888",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                          }}
                                        >
                                          <ImCross style={{
                                            color: "white",
                                            marginBottom: "2px",
                                          }} />

                                        </span>
                                      )}
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div
                            className="gap-2"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              columnGap: "2%",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                ResetFilter(formattedDate);
                              }}
                              sx={{
                                paddingInline: "50px",
                              }}
                              style={{
                                border: "2px solid rgb(121 44 143)",
                                width: "100%",
                                backgroundColor: "white",
                                color: "rgb(121 44 143)",
                              }}
                            >
                              Reset
                            </Button>

                            {/* <Button
                              variant="contained"
                              onClick={() => {
                                searchwisebusList(formattedDate);
                              }}
                              sx={{
                                paddingInline: "50px",
                              }}
                              style={{
                                backgroundColor: "rgb(121 44 143)",
                                width: "100%",
                              }}
                            >
                              Apply
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Offcanvas
                    show={show}
                    onHide={handleClose}
                    className="menu--offcanvas text-capitalize fw-semibold p-5 w-fitcontent"
                  >
                    <Offcanvas.Header closeButton>
                      <h5 className="fw-bolder text-capitalize">filters</h5>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="navbar-nav m-auto mb-2 mb-lg-0">
                        <div className="filter--main">
                          <div className="fltrtitle my-4">
                            <h5 className="text-capitalize mb-4 fw-semibold">
                              Amenities
                            </h5>
                            <ul className="filterul list-unstyled d-flex flex-wrap column-gap-3 align-items-center">
                              {amenities.map((label, index) => (
                                <li className="fltrli mb-2" key={index}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`amenity-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedAmenities.includes(
                                        label.facility_name
                                      )}
                                      onChange={() => {
                                        handleCheckboxChange(
                                          label.facility_name,
                                          label.id
                                        )
                                        setFilterSearch(true)
                                      }
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`amenity-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}
                                      <span style={{ fontSize: "16px" }}>
                                        {label.facility_name}
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="fltrtitle my-4">
                            <h5
                              className="text-capitalize mb-2 fw-semibold d-flex"
                              style={{ alignItems: "baseline" }}
                            >
                              bus ac
                              <p
                                style={{
                                  fontSize: "medium",
                                  paddingLeft: "8px",
                                }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row">
                              {busAcType.map((label, index) => (
                                <li className="fltrli mb-2 col-6" key={index}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`bustype-ac-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedBusTypeAc.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxBusTypeAc(label.type)
                                        setFilterSearch(true)
                                      }

                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`bustype-ac-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}
                                      <span style={{ fontSize: "16px" }}>
                                        {label.type}
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="fltrtitle my-4">
                            <h5
                              className="text-capitalize mb-2 fw-semibold d-flex"
                              style={{ alignItems: "baseline" }}
                            >
                              bus type
                              <p
                                style={{
                                  fontSize: "medium",
                                  paddingLeft: "8px",
                                }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row align-items-center">
                              {busType.map((label, index) => (
                                <li className="fltrli mb-2 col-6" key={index}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`bustype-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedBusType.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxBusType(label.type)
                                        setFilterSearch(true)
                                      }
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`bustype-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}
                                      <span style={{ fontSize: "16px" }}>
                                        {label.type}
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="fltrtitle my-4">
                            <h5
                              className="text-capitalize mb-2 fw-semibold d-flex"
                              style={{ alignItems: "baseline" }}
                            >
                              Sort By Price
                              <p
                                style={{
                                  fontSize: "medium",
                                  paddingLeft: "8px",
                                }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row align-items-center">
                              {price.map((label, index) => (
                                <li className="fltrli mb-2 col-6" key={index}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`bustype-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedPrice.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxPriceType(label.type)
                                        setFilterSearch(true)
                                      }
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`price-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}
                                      <span style={{ fontSize: "16px" }}>
                                        {label.type}
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="fltrtitle my-4">
                            <h5
                              className="text-capitalize mb-2 fw-semibold d-flex"
                              style={{ alignItems: "baseline" }}
                            >
                              Arrival Time
                              <p
                                style={{
                                  fontSize: "medium",
                                  paddingLeft: "8px",
                                }}
                              ></p>
                            </h5>
                            <ul className="filterul list-unstyled row align-items-center">
                              {time.map((label, index) => (
                                <li className="fltrli mb-2 col-6" key={index}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={`bustype-${index}`}
                                      className="btn-check"
                                      autoComplete="off"
                                      checked={selectedTime.includes(
                                        label.type
                                      )}
                                      onChange={() => {
                                        handleCheckboxTimeType(label.type)
                                        setFilterSearch(true)
                                      }
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <label
                                      htmlFor={`time-${index}`}
                                      className="btn-group d-flex gap-2 btn btn-Link"
                                      style={{
                                        border: "1px solid #cfcfcf",
                                        cursor: "pointer",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {label.image && (
                                        <img
                                          src={label?.image}
                                          alt={label.type}
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            padding: "0px",
                                            margin: "0px",
                                            background: "white",
                                            padding: "1px",
                                            border: "2px solid white",
                                            borderRadius: "2px"
                                          }}
                                        />
                                      )}
                                      <span style={{ fontSize: "16px" }}>
                                        {label.type}
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div
                            className="gap-2"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              columnGap: "2%",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                ResetFilter(formattedDate);
                              }}
                              sx={{
                                paddingInline: "50px",
                              }}
                              style={{
                                border: "2px solid rgb(121 44 143)",
                                width: "100%",
                                backgroundColor: "white",
                                color: "rgb(121 44 143)",
                              }}
                            >
                              Reset
                            </Button>

                            {/* <Button
                              variant="contained"
                              onClick={() => {
                                handleClose();
                                searchwisebusList(formattedDate);
                              }}
                              sx={{
                                paddingInline: "50px",
                              }}
                              style={{
                                backgroundColor: "rgb(121 44 143)",
                                width: "100%",
                              }}
                            >
                              Apply
                            </Button> */}
                          </div>
                        </div>
                      </Nav>
                    </Offcanvas.Body>
                  </Offcanvas>

                  <Dialog
                    open={open}
                    sx={{
                      "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper ": {
                        width: "100%",
                      },
                    }}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <IconButton
                      aria-label="close"
                      onClick={resetAddDialogReview}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogTitle
                      style={{ color: "rgb(121 44 143)", fontSize: "x-large" }}
                      className="text-center mt-5"
                    >
                      {"Logout"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText
                        id="alert-dialog-slide-description"
                        className="text-center mt-4"
                      >
                        Are you sure you want to Log Out ?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions className="text-center justify-content-center mb-5 mt-2">
                      <div
                        className="gap-2"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          columnGap: "2%",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => {
                            ResetFilter(formattedDate);
                          }}
                          sx={{
                            paddingInline: "50px",
                          }}
                          style={{
                            border: "2px solid rgb(121 44 143)",
                            width: "100%",
                            backgroundColor: "white",
                            color: "rgb(121 44 143)",
                          }}
                        >
                          Reset
                        </Button>

                        {/* <Button
                          variant="contained"
                          onClick={() => {
                            searchwisebusList(formattedDate);
                          }}
                          sx={{
                            paddingInline: "50px",
                          }}
                          style={{
                            backgroundColor: "rgb(121 44 143)",
                            width: "100%",
                          }}
                        >
                          Apply
                        </Button> */}
                      </div>
                    </DialogActions>
                  </Dialog>

                  {busList?.bus_array?.length == 0 ? (
                    <div className="col-md-8 col-lg mt-lg-0 mt-md-0">
                      <div className="bus-list-div">
                        <div className="buslisttitle mb-4">
                          <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            <h5 className="text-capitalize">
                              As of now this route is offline.
                            </h5>
                            <h5 className="text-capitalize d-flex gap-2 align-items-baseline">
                              For booking, request to call on{" "}
                              <h4 className="fw-bold text-black">9930031000</h4>
                            </h5>
                          </Alert>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-8 col-lg col-lg-9 mt-lg-0 mt-md-0">
                      <div className="bus-list-div">
                        {busList?.bus_array?.map((item, index) => (
                          <div className="busrcrd--rows d-flex flex-column mt-4 row-gap-4">
                            <div className="buslist--card card shadow-hover border-hover-none pt-3">
                              <div className="d-flex flex-column gap-2">
                                <div className="d-flex justify-content-between align-items-center busnmflex px-4 flex-wrap flex-lg-nowrap row-gap-2">
                                  <div className="busname--icons">
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={
                                          busList?.image_url + item?.bus_image
                                        }
                                        alt=""
                                        className="bus_img_list"
                                      />
                                      <div>
                                        <h5 className="m-0 me-2 fw-semibold bus_list_name">
                                          {item?.bus_name}
                                        </h5>
                                        <p
                                          className="m-0 me-2 fw-semibold mt-1 bus_list_type"
                                          style={{ fontSize: "14px" }}
                                        >
                                          {item?.bus_ac} /
                                          {item?.bus_type == 0
                                            ? "Seater"
                                            : item?.bus_type == 1
                                              ? "Sleeper"
                                              : "Seater / Sleeper"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="d-flex flex-wrap justify-content-center mt-1 rating_but_list"
                                    style={{ whiteSpace: "pre" }}
                                  >
                                    <p
                                      style={{
                                        borderRight: "1px solid #cfcfcf",
                                        paddingRight: "10px",
                                        marginRight: "10px",
                                        cursor: "pointer",
                                        color: "rgb(108, 42, 127)",
                                      }}
                                      onClick={() =>
                                        handleBusPhotosShow(item.id)
                                      }
                                    >
                                      Bus Photos
                                    </p>
                                    <p
                                      style={{
                                        borderRight: "1px solid #cfcfcf",
                                        paddingRight: "10px",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <MdOutlineReviews
                                        style={{ color: "rgb(108, 42, 127)" }}
                                      />
                                      {item.review_summary.total_reviews}
                                    </p>
                                    <span style={{ display: "flex" }}>
                                      <IoStarSharp
                                        style={{
                                          color: "rgb(108, 42, 127)",
                                          fontSize: "20px",
                                        }}
                                      />
                                      <p
                                        style={{
                                          borderRight: "1px solid #cfcfcf",
                                          paddingRight: "10px",
                                          paddingLeft: "3px",
                                        }}
                                      >
                                        {item.review_summary.average_rating}
                                      </p>
                                    </span>
                                    <div className=" px-2">
                                      <p
                                        className="fw-medium m-0"
                                        style={{
                                          backgroundColor: item?.total_seat === "0" ? "red" : "rgb(108 42 127)",
                                          color: item?.total_seat === "0" ? "white" : "white",
                                          paddingInline: "5px",
                                          borderRadius: "5px"
                                        }}
                                      >
                                        {item?.total_seat} Seats Available
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row px-4 align-items-center row-gap-3">
                                  <div className="col-lg-12 mt-md-2 boarding_point_bus">
                                    <div className="d-flex justify-content-between align-items-center bustimeflex">
                                      <div className="bustimediv boarding_txt_point_name">
                                        <h6 className="fw-semibold mb-1 boarding_txt_point_name">
                                          {item?.boarding_time}
                                        </h6>
                                        <p
                                          className="fw-medium m-0 boarding_txt_point_name"
                                          style={{
                                            color: "rgb(108 42 127)",
                                          }}
                                        >
                                          {item?.boarding_point_name}
                                        </p>
                                        <p
                                          className="fw-medium m-0"
                                          style={{ whiteSpace: "pre" }}
                                        >
                                          {item?.boarding_date}
                                        </p>
                                      </div>
                                      <div className="bustimediv flxbasissdiv">
                                        <span className="border--span"></span>
                                        <p className="bustotalhours fw-medium m-0 boarding_txt_point_name">
                                          {item?.time_different}
                                        </p>
                                      </div>
                                      <div className="bustimediv align-items-end d-flex flex-column boarding_txt_point_name">
                                        <h6 className="fw-semibold mb-1 boarding_txt_point_name">
                                          {item?.droping_time}
                                        </h6>
                                        <p
                                          className="fw-medium m-0 boarding_txt_point_name"
                                          style={{
                                            color: "rgb(108 42 127)",
                                          }}
                                        >
                                          {item?.droping_point_name}
                                        </p>
                                        <p
                                          className="fw-medium m-0"
                                          style={{ whiteSpace: "pre" }}
                                        >
                                          {item?.droping_date}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                <div className="features--div">
                                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap mt-2">
                                    <div className="d-flex flex-wrap gap-2 px-3 w-100 pb-3">
                                      {item?.amenities?.map((ami, index) => (
                                        <div
                                          key={index}
                                          style={{ whiteSpace: "pre" }}
                                          className="d-flex gap-2 align-items-center"
                                        >
                                          <Tooltip title={ami?.ameniti_name}>
                                            <div
                                              style={{
                                                border: "1.5px solid purple",
                                                padding: "5px",
                                                borderRadius: "50%",
                                              }}
                                            >
                                              <img
                                                src={
                                                  busList?.image_url +
                                                  ami?.image
                                                }
                                                alt=""
                                                className="img-fluid filter_icon_bus"
                                                style={{
                                                  width: "16px",
                                                  height: "16px",
                                                  objectFit: "contain",
                                                  marginInline: "5px",
                                                }}
                                              />
                                            </div>
                                          </Tooltip>
                                          {/* <h5 className="d-md-block d-none d-sm-none m-0 me-4 amenities_filter_bus_list">
                                              {ami?.ameniti_name}
                                            </h5> */}
                                        </div>
                                      ))}
                                    </div>
                                    <ul
                                      className="align-items-lg-center capitalize d-flex row-gap-2 featurenav flex-lg-row flex-md-column justify-content-end text-end list-unstyled px-3 text- w-100 bus_cancellation_view"
                                      style={{
                                        whiteSpace: "pre",
                                        margin: "0px",
                                      }}
                                    >
                                      <li
                                        className="nav-item cancellation_policy_bus"
                                        style={{
                                          cursor: "pointer",
                                          color: "rgb(108, 42, 127)",
                                        }}
                                      >
                                        <h4
                                          className="fw-bold bus_list_price mx-3 my-2"
                                          style={{ color: "black" }}
                                        >
                                          ₹{item?.bus_price}
                                        </h4>
                                      </li>

                                      <li className="d-flex justify-content-end nav-item ">
                                        {selectedSeatBusId !== item.id ? (
                                          <Button
                                            onClick={() =>
                                              handleShowBusSeat(
                                                item.bus_type,
                                                item.id,
                                                item.main_boarding_point_id,
                                                item.main_droping_point_id,
                                                item.booking_type,
                                                item.main_boarding_point_id_arr,
                                                item.main_droping_point_id_arr
                                              )
                                            }
                                            variant="contained"
                                            style={{
                                              backgroundColor:
                                                "rgb(121 44 143)",
                                              textTransform: "capitalize",
                                            }}
                                            className="seat_view_bus_list_txt h-100 w-100 m-0"
                                          >
                                            View Seats
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={handleHideBusSeat}
                                            variant="contained"
                                            style={{ backgroundColor: "gray" }}
                                            className="seat_view_bus_list_txt h-100 w-100 m-0"
                                          >
                                            Hide Seats
                                          </Button>
                                        )}
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    className="nav-item cancellation_policy_bus d-flex justify-content-end"
                                    style={{
                                      cursor: "pointer",
                                      color: "rgb(108, 42, 127)",
                                      padding: "0px 10px 5px 10px",
                                    }}
                                  >
                                    {bookingPolicies &&
                                      selectedPoliciesBusId === item.id ? (
                                      <a
                                        onClick={() =>
                                          handleHideBookingPolicies(item.id)
                                        }
                                      >
                                        Cancellation Policy
                                        <MdOutlineKeyboardArrowUp className="fs-3" />
                                      </a>
                                    ) : (
                                      <a
                                        onClick={() =>
                                          handleShowBookingPolicies(item.id)
                                        }
                                        style={{ minHeight: "10px" }}
                                      >
                                        Cancellation Policy
                                        <MdOutlineKeyboardArrowDown className="fs-3" />
                                      </a>
                                    )}
                                  </div>
                                  {selectedPoliciesBusId === item.id &&
                                    bookingPolicies &&
                                    item.cancellation_policy && (
                                      <div className="amenities-tab p-3 d-flex border-top">
                                        <div key={index}>
                                          <div className="d-flex gap-2 align-items-center">
                                            <span
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  selectedBus?.cancellation_policy,
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  {/*==================================================================== layout ====================================================================*/}

                                  <div className="tab-content">
                                    {selectedBusId === item.id &&
                                      showSeats && (
                                        <>
                                          <div className="mt-4 py-4 px-2 px-xl-4">
                                            <div>
                                              <div className="roww">
                                                <div className="column11">
                                                  {bookingType === "1" ?
                                                    <SeatLayout1
                                                      busLayoutData={busLayoutData}
                                                      selectedSeatsFromParent={selectedSeatLayout1} // <-- pass it

                                                      onSeatsChange={(seats) => {

                                                        setSelectedSeatLayout1(seats);

                                                        const upperSeats = seats
                                                          .filter(seat => seat.seat_type === 'UB')
                                                          .map(seat => seat.seat_number);

                                                        const lowerSeats = seats
                                                          .filter(seat => seat.seat_type === 'LB')
                                                          .map(seat => seat.seat_number);


                                                        const upperSeatPrices = seats
                                                          .filter(seat => seat.seat_type === 'UB')
                                                          .map(seat => parseInt(seat.seat_price) || 0);

                                                        const lowerSeatPrices = seats
                                                          .filter(seat => seat.seat_type === 'LB')
                                                          .map(seat => parseInt(seat.seat_price) || 0);

                                                        const totalPrice = seats.reduce((total, seat) => {
                                                          return total + (parseInt(seat.seat_price) || 0);
                                                        }, 0);

                                                        setSelectedUpperSeat(upperSeats);
                                                        setSelectedUpperSeats(upperSeats)
                                                        setSelectedLowerSeat(lowerSeats);
                                                        setSelectedLowerSeats(lowerSeats);
                                                        setSelectedUpperSeatPrice(upperSeatPrices);
                                                        setSelectedLowerSeatPrice(lowerSeatPrices);
                                                        setTotalPrice(totalPrice);
                                                      }}



                                                    />
                                                    : <SeatLayout2
                                                      busLayoutData={busLayoutData}
                                                      selectedSeatsFromParent={selectedSeatLayout2} // <-- pass it

                                                      onSeatsChange={(seats) => {

                                                        setSelectedSeatLayout2(seats);

                                                        const upperSeats = seats
                                                          .filter(seat => seat.UpLowBerth === 'UB')
                                                          .map(seat => seat.SeatNo);

                                                        const lowerSeats = seats
                                                          .filter(seat => seat.UpLowBerth === 'LB')
                                                          .map(seat => seat.SeatNo);


                                                        const upperSeatPrices = seats
                                                          .filter(seat => seat.UpLowBerth === 'UB')
                                                          .map(seat => parseInt(seat.seat_price) || 0);

                                                        const lowerSeatPrices = seats
                                                          .filter(seat => seat.UpLowBerth === 'LB')
                                                          .map(seat => parseInt(seat.seat_price) || 0);

                                                        const totalPrice = seats.reduce((total, seat) => {
                                                          return total + (parseInt(seat.seat_price) || 0);
                                                        }, 0);

                                                        setSelectedUpperSeat(upperSeats);
                                                        setSelectedUpperSeats(upperSeats)
                                                        setSelectedLowerSeat(lowerSeats);
                                                        setSelectedLowerSeats(lowerSeats);
                                                        setSelectedUpperSeatPrice(upperSeatPrices);
                                                        setSelectedLowerSeatPrice(lowerSeatPrices);
                                                        setTotalPrice(totalPrice);
                                                      }}
                                                    />

                                                  }

                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row ">
                                            <Box className="board-droppagerow">
                                              <Box className="borddrop--div">
                                                <div className="d-flex justify-content-around rounded-4 border-theme-opacity flex-lg-row w-100 flex-column">
                                                  <div className="w-100 main_bording_dropping">
                                                    <div
                                                      value={value}
                                                      onChange={handleChange}
                                                      className="nav boarddrop--anv nav-tabs text-capitalize gap-3 c d-flex ps-md-3 ps-sm-4 p-2 p-md-1 boarding_point_fld"
                                                    >
                                                      <span
                                                        style={{
                                                          fontWeight: "bold",
                                                          fontSize: "18px",
                                                          color: "#3A3A3A",
                                                          marginBottom: "5px",
                                                        }}
                                                      >
                                                        Pickup Point
                                                      </span>
                                                    </div>
                                                    <Box
                                                      className="borddrop--content boarding_txt bg-white p-4 p-md-2 ps-md-3 p-lg-4 w-100 d-flex justify-content-between "
                                                      value={value}
                                                      index={0}
                                                    >
                                                      <RadioGroup
                                                        value={
                                                          selectedboardingValue?.boarding_id
                                                        }
                                                        onChange={
                                                          handleSelectBoardingPoint
                                                        }
                                                        className="d-block"
                                                        style={{
                                                          whiteSpace: "pre",
                                                        }}
                                                      >
                                                        {busWisePickupDropPoints?.boarding_array?.map(
                                                          (point, index) => {
                                                            const isDisabled =
                                                              isBoardingTimePassed(
                                                                point?.boarding_time
                                                              );
                                                            return (
                                                              <Box
                                                                key={index}
                                                                className="bpdplist_item mb-2 d-flex justify-content-between"
                                                              >
                                                                <FormControlLabel
                                                                  value={
                                                                    point?.boarding_id
                                                                  }
                                                                  control={
                                                                    <Radio
                                                                      className="form-radio-input"
                                                                      disabled={
                                                                        isDisabled
                                                                      }
                                                                    />
                                                                  }
                                                                  label={
                                                                    <Box className="fw-medium form-checkk fs-20 d-flex justify-content-between align-items-center">
                                                                      <Box className="me-4">
                                                                        <strong className="fs-6 time">
                                                                          {
                                                                            point?.boarding_time
                                                                          }
                                                                        </strong>
                                                                      </Box>
                                                                      <Box className="pointnm mt-1">
                                                                        <Typography className="text-wrap fw-semibold">
                                                                          {
                                                                            point?.boarding_sub_route_name
                                                                          }
                                                                        </Typography>
                                                                      </Box>
                                                                    </Box>
                                                                  }
                                                                />
                                                              </Box>
                                                            );
                                                          }
                                                        )}
                                                      </RadioGroup>
                                                    </Box>
                                                  </div>

                                                  <div className="w-100 main_bording_dropping">
                                                    <div
                                                      value={value}
                                                      onChange={handleChange}
                                                      className="nav boarddrop--anv nav-tabs text-capitalize gap-3 c d-flex ps-md-3 ps-sm-4 p-2 p-md-1 boarding_point_fld"
                                                    >
                                                      <span
                                                        style={{
                                                          fontWeight: "bold",
                                                          fontSize: "18px",
                                                          color: "#3A3A3A",
                                                          marginBottom: "5px",
                                                        }}
                                                      >
                                                        Drop Point
                                                      </span>
                                                    </div>
                                                    <Box
                                                      className="borddrop--content 
                                                      boarding_txt bg-white  p-4 p-md-2  ps-md-3 w-100 d-flex justify-content-between"
                                                      value={value}
                                                      index={0}
                                                    >
                                                      <RadioGroup
                                                        value={
                                                          selecteddropingValue?.droping_id
                                                        }
                                                        onChange={
                                                          handleSelectDropingPoint
                                                        }
                                                        className="d-block"
                                                        style={{
                                                          whiteSpace: "pre",
                                                        }}
                                                      >
                                                        {busWisePickupDropPoints?.droping_array?.map(
                                                          (point, index) => (
                                                            <Box
                                                              key={index}
                                                              className="bpdplist_item  mb-2 d-flex justify-content-between "
                                                            >
                                                              <FormControlLabel
                                                                value={
                                                                  point?.droping_id
                                                                }
                                                                control={
                                                                  <Radio className="form-radio-input" />
                                                                }
                                                                label={
                                                                  <Box className="fw-medium form-checkk fs-20 d-flex justify-content-between align-items-center">
                                                                    <Box className="me-4">
                                                                      <strong className="fs-6 time me-4">
                                                                        {
                                                                          point?.droping_time
                                                                        }
                                                                      </strong>
                                                                    </Box>
                                                                    <Box
                                                                      clapointnm
                                                                      ssName="pointnm"
                                                                      className="mt-1"
                                                                    >
                                                                      <Typography className=" text-wrap fw-semibold ">
                                                                        {
                                                                          point?.droping_sub_route_name
                                                                        }
                                                                      </Typography>
                                                                      <Typography className="fs-16 fw-medium mb-0">
                                                                        {
                                                                          point?.droping_address
                                                                        }
                                                                      </Typography>
                                                                    </Box>
                                                                  </Box>
                                                                }
                                                              />
                                                            </Box>
                                                          )
                                                        )}
                                                      </RadioGroup>
                                                    </Box>
                                                  </div>
                                                </div>
                                              </Box>
                                            </Box>

                                            <Box>
                                              <Paper
                                                elevation={3}
                                                className="prcdtobookdiv px-3 px-lg-4 py-2"
                                                sx={{
                                                  boxShadow: "none",
                                                  background:
                                                    "rgb(246 240 248)",
                                                }}
                                              >
                                                <Box className="titlediv mb-3 mb-lg-4"></Box>
                                                <Box className="prcdtobook--content">
                                                  <Box className="d-flex flex-md-row gap-4 justify-content-between">
                                                    <Box className="pointnm">
                                                      <Typography className="fs-4 fw-bold">
                                                        Pickup
                                                      </Typography>

                                                      <Typography className="loc text-gray fw-semibold">
                                                        {
                                                          selectedboardingValue?.boarding_address
                                                        }
                                                      </Typography>
                                                      <Typography className="fs-16 text-body-tertiary fw-medium mb-0">
                                                        {
                                                          selectedboardingValue?.boarding_sub_route_name
                                                        }
                                                      </Typography>
                                                      <Typography className="time text-gray fw-semibold">
                                                        {
                                                          selectedboardingValue?.boarding_time
                                                        }
                                                      </Typography>
                                                    </Box>

                                                    <Box className="pointnm">
                                                      <Typography className="fs-4 fw-bold">
                                                        Dropping
                                                      </Typography>

                                                      <Typography className="loc text-gray fw-semibold">
                                                        {
                                                          selecteddropingValue?.droping_address
                                                        }
                                                      </Typography>
                                                      <Typography className="fs-16 text-body-tertiary fw-medium mb-0">
                                                        {
                                                          selecteddropingValue?.droping_sub_route_name
                                                        }
                                                      </Typography>
                                                      <Typography className="time text-gray fw-semibold">
                                                        {
                                                          selecteddropingValue?.droping_time
                                                        }
                                                      </Typography>
                                                    </Box>
                                                  </Box>

                                                  <Box className="slcdtotldiv mt-4">
                                                    <Box className="d-flex flex-column flex-lg-row justify-content-start justify-content-lg-between row-gap-3">
                                                      <Box className="slctdstcountdiv">
                                                        <Typography
                                                          className="fw-bold fs-5"
                                                          style={{
                                                            color:
                                                              "rgb(108, 42, 127)",
                                                          }}
                                                        >
                                                          Selected Seat
                                                        </Typography>
                                                        <ul className="d-flex gap-2 list-unstyled mt-3">
                                                          <p className="mb-0">
                                                            Lower Seat{" "}
                                                            <strong>
                                                              {`(${selectedLowerSeat?.length ||
                                                                0
                                                                })`}
                                                            </strong>
                                                          </p>
                                                          {(
                                                            selectedLowerSeat ||
                                                            []
                                                          ).map(
                                                            (seat, index) => (
                                                              <li
                                                                key={index}
                                                                className="border-left-1 ps-2"
                                                              >
                                                                <strong>
                                                                  {seat}
                                                                </strong>
                                                              </li>
                                                            )
                                                          )}
                                                        </ul>

                                                        <ul className="d-flex gap-2 list-unstyled mt-3">
                                                          <p className="mb-0">
                                                            Upper Seat{" "}
                                                            <strong>
                                                              {`(${selectedUpperSeat?.length ||
                                                                0
                                                                })`}
                                                            </strong>
                                                          </p>
                                                          {(
                                                            selectedUpperSeat ||
                                                            []
                                                          ).map(
                                                            (seat, index) => (
                                                              <li
                                                                key={index}
                                                                className="border-left-1 ps-2"
                                                              >
                                                                <strong>
                                                                  {seat}
                                                                </strong>
                                                              </li>
                                                            )
                                                          )}
                                                        </ul>
                                                      </Box>
                                                      <Box className="ttolpricdiv text-end border-top border-bottom py-3">
                                                        <Typography
                                                          className="fw-bold total_price_ticket"
                                                          variant="h4"
                                                        >
                                                          INR {totalPrice}
                                                        </Typography>
                                                      </Box>
                                                    </Box>
                                                  </Box>
                                                </Box>
                                                <div className="btndivv mt-4 text-center pb-4">
                                                  <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                      handleConfirmSeat(item)
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        "rgb(121 44 143)",
                                                    }}
                                                  >
                                                    Confirm Seat
                                                  </Button>
                                                </div>
                                              </Paper>
                                            </Box>
                                          </div>
                                        </>
                                      )}
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {openLogin && (
          <LoginPopup
            onClose={() => setOpenLogin(false)}
            onLoginSuccess={() => {
              setOpenLogin(false);
              if (pendingBusItem) {
                handleConfirmSeat(pendingBusItem);
                setPendingBusItem(null);
              }
            }}
          />
        )}

        <Footer />
      </div>

      <Modal
        show={busShowModal}
        onHide={handleBusPhotosClose}
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Bus Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {busPhotos.length > 0 && (
            <div>
              <img
                src={busPhotos[currentIndex]}
                alt={`Bus Photo ${currentIndex + 1}`}
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "8px",
                  objectFit: "contain",
                }}
              />

              {busPhotos.length > 1 && (
                <Button
                  variant="link"
                  onClick={handlePrevImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "22px",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    color: "white",
                    backgroundColor: "#8080802e",
                    border: "none",
                    fontSize: "2rem",
                  }}
                  disabled={currentIndex === 0}
                >
                  <FaAngleLeft />
                </Button>
              )}

              {busPhotos.length > 1 && (
                <Button
                  variant="link"
                  onClick={handleNextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "22px",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    color: "white",
                    backgroundColor: "#8080802e",
                    border: "none",
                    fontSize: "2rem",
                  }}
                  disabled={currentIndex === busPhotos.length - 1}
                >
                  <FaAngleRight />
                </Button>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBusPhotosClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {loading && <Loader />}
    </>
  );
};

export default BusList;
