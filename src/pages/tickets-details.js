import Footer from "../components/footer"
import Header from "../components/header"
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Typography } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LiaStar } from "react-icons/lia";
import { LiaStarSolid } from "react-icons/lia";
import { Rating } from 'react-simple-star-rating'
import { PDFDocument, rgb } from 'pdf-lib';
const TicketsDetailsView = () => {
    const busIcon = process.env.PUBLIC_URL + 'assets/images/bus-partner-img.png';
    const [singleTicketsData, setsingleTicketsData] = useState()
    const [ticketCancelReasonData, setTicketCancelReasonData] = useState([])
    const [reviewData, setReviewData] = useState([])
    const { type, id, bus_id, user_id } = useParams();
    const [header, setHeader] = useState('');
    const [openPopupBox, setOpenPopUpBox] = useState(false)
    const [openPopupBoxReview, setOpenPopUpBoxReview] = useState(false)
    const [selectedValue, setSelectedvalue] = useState('')
    const [errors, setErrors] = useState({});
    const [customReason, setCustomReason] = useState('');
    const [reviewMsg, setReviewMsg] = useState('');
    const [rating, setRating] = useState(0)
    const [downloadTicket, setDownLoadTicket] = useState()
    const [toggleCancel, setToggleCancel] = useState('')
    const [toggleRating, setToggleRating] = useState('')
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const action = queryParams.get('action');
    const [sarthiDis, setSarthiDis] = useState(0);

    useEffect(() => {
        SingleTicketList();
        TicketCancelReason();
    }, [id]);
    const SingleTicketList = async () => {
        let data = new FormData();
        data.append("ticket_id", id);
        const params = {
            ticket_id: id,
        }
        try {
            await axios.post("single_ticket?", data, {
                params: params
            }).then((res) => {
                setsingleTicketsData(res.data.data)
                setDownLoadTicket(res.data.data.ticket_list.download_ticket_link)
                setToggleCancel(res.data.data.ticket_list.cancel_button)
                setToggleRating(res.data.data.ticket_list.is_rating)
                setSarthiDis(res?.data?.data?.ticket_list?.price_details_array?.sarthibus_discount)

            })
        }
        catch (error) {
            toast.error(error.data.message);
        }
    }
    const TicketCancelReason = async () => {
        let data = new FormData();

        try {
            await axios.get("ticket_cancle_reason", data, {
            }).then((res) => {
                setTicketCancelReasonData(res.data.data)

            })
        }
        catch (error) {
            toast.error(error.data.message);
        }
    }
    const handleOpen = () => {
        setOpenPopUpBox(true)
    }
    const resetAddDialog = () => {
        setOpenPopUpBox(false);
        setCustomReason('');
        setSelectedvalue('')
    }
    const resetAddDialogReview = () => {
        setOpenPopUpBoxReview(false)
    }
    const handleOpenReview = () => {
        setOpenPopUpBoxReview(true)
    }
    const handleRadio = (e) => {
        setSelectedvalue(e.target.value)
    }

    const handleCustomReasonChange = (event) => {
        setCustomReason(event.target.value);
    };


    const onPointerEnter = (user_id) => {
    };

    const onPointerLeave = () => {
    };

    const onPointerMove = (value, index) => {
    };

    const handleRating = (rate) => {
        setRating(rate);
    };
    const handelCancelTicket = () => {
        const newErrors = {};
        if (!selectedValue) {
            newErrors.selectedValue = 'Name is required';
            toast.error('Name is required');
        }

        if (selectedValue === 'Others' && customReason.trim() === '') {
            newErrors.customReason = 'Custom reason is required';
            toast.error('Please provide a reason in the input field for "Others"');
        }

        setErrors(newErrors);

        const isValid = Object.keys(newErrors).length === 0;
        if (isValid) {
            resonCancelAPI();
        }
    }


    const handleDownload = async () => {
        if (typeof downloadTicket === 'string') {
            const newWindow = window.open(downloadTicket, '_blank');
            if (newWindow) {
                newWindow.focus();
            }
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([600, 400]);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const downloadURL = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.download = 'ticket.pdf';  
            a.click();
        }
    };
    
    const resonCancelAPI = async () => {
        let data = new FormData();
        data.append('ticket_id', id)
        data.append('reason', selectedValue === 'Others' ? customReason : selectedValue)
        try {
            await axios.post("ticket_cancle", data, {
            }).then((res) => {
                if (res.data.success == true) {
                    setOpenPopUpBox(false);
                    toast.success(res.data.message);
                    setTimeout(() => {
                        history.push('/profile')
                    }, 2000);

                } else {
                    toast.error(res.data.message || 'Invalid Message');
                    setOpenPopUpBox(true);
                }
            })
        }
        catch (res) {
            toast.error(res.data.message);
        }
    }
    const addReviewAPI = async () => {
        let data = new FormData();
        data.append("ticket_id", id);
        data.append("bus_id", singleTicketsData?.ticket_list?.bus_id);
        data.append("user_id", localStorage.getItem('UserID'));
        data.append("rating", rating);
        data.append("msg", reviewMsg);
        const params = {
            ticket_id: id,
            bus_id: singleTicketsData?.ticket_list?.bus_id,
            user_id: localStorage.getItem('UserID'),
        }
        try {
            await axios.post("add_review?", data, {
                params: params
            }).then((res) => {
                setReviewData(res.data.data)
                setOpenPopUpBoxReview(false);
                toast.success("Review add successfully")
                SingleTicketList();
            })
        }
        catch (error) {
            toast.error(error.data.message);
        }
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
                <div className="container mt-5">
                    <h1>Ticket Details</h1>
                    <div className="container">
                        <div className="row gap-2">
                            <div className="d-flex gap-5 flex-wrap">
                                <div className="col-6">
                                    {/* Bus Details */}
                                    <div className="mb-3 row buslist--card d-flex">
                                        <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                            <div className="d-flex justify-content-between align-items-center busnmflex">
                                                <div className="busname--icons">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <img src={singleTicketsData?.image_url + singleTicketsData?.ticket_list?.bus_image} alt="" className="img-fluid" style={{ height: '60px', width: '60px', borderRadius: '100%', border: '1px solid black' }} />
                                                        <div>
                                                            <h5 className="m-0 me-2 fw-semibold">{singleTicketsData?.ticket_list?.bus_name}</h5>
                                                            <p className="m-0 me-2 fw-semibold">{singleTicketsData?.ticket_list?.bus_ac} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="fw-medium m-0 tcktpricediv" style={{ color: 'rgb(108 42 127)' }}>{`₹${singleTicketsData?.ticket_list?.final_price}`}</h4>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="col-12 align-items-center">
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                            <div className="bustimediv">
                                                                <h6 className="fw-semibold mb-1">{singleTicketsData?.ticket_list?.starting_point_name}</h6>
                                                                <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px' }}>{singleTicketsData?.ticket_list?.bording_time}</p>
                                                            </div>
                                                            <div className="bustimediv flxbasissdiv">
                                                                <span className="border--span"></span>
                                                                <p className="bustotalhours fw-medium m-0">{singleTicketsData?.ticket_list?.time_different}</p>
                                                            </div>
                                                            <div className="bustimediv">
                                                                <h6 className="fw-semibold mb-1" style={{ display: "flex", justifyContent: "end" }}>{singleTicketsData?.ticket_list?.ending_point_name}</h6>
                                                                <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px' }}>{singleTicketsData?.ticket_list?.droping_time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 row buslist--card d-flex">
                                        <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                            <div>
                                                <div className="col-12 align-items-center">
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-start w-100">
                                                            <div className="d-flex flex-column align-items-start flex-grow-1">
                                                                <h6 className="fw-semibold mb-1">
                                                                    {singleTicketsData?.ticket_list?.boarding_array?.boarding_name}
                                                                </h6>
                                                                <p className="fw-medium m-0">
                                                                    {singleTicketsData?.ticket_list?.boarding_array?.boarding_address}
                                                                </p>
                                                                <p
                                                                    className="fw-medium m-0"
                                                                    style={{ color: "rgb(108 42 127)", fontSize: "17px" }}
                                                                >
                                                                    {singleTicketsData?.ticket_list?.boarding_array?.b_time}
                                                                </p>
                                                            </div>

                                                            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                                                                <span className="w-25 border--span"></span>
                                                            </div>

                                                            <div className="d-flex flex-column justify-content-start align-items-end flex-grow-1 text-end">
                                                                <h6 className="fw-semibold mb-1">
                                                                    {singleTicketsData?.ticket_list?.boarding_array?.droping_name}
                                                                </h6>
                                                                <p className="fw-medium m-0">
                                                                    {singleTicketsData?.ticket_list?.boarding_array?.droping_address}
                                                                </p>
                                                                <p
                                                                    className="fw-medium m-0"
                                                                    style={{ color: "rgb(108 42 127)", fontSize: "17px" }}
                                                                >
                                                                    {singleTicketsData?.ticket_list?.boarding_array?.d_time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mb-3 row buslist--card d-flex">
                                        <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                            <div className="d-flex justify-content-between align-items-center busnmflex">
                                                <h5 className="m-0 me-2 fw-semibold">Payment Details</h5>
                                            </div>
                                            <div className="col-12 align-items-center">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-2">Booking Date</h6>
                                                            <h6 className="fw-medium mb-2">Payment Method</h6>
                                                            <h6 className="fw-semibold mb-2">Transactions Id</h6>
                                                            <h6 className="fw-semibold mb-2">Ticket Id</h6>
                                                        </div>
                                                        <div className="bustimediv">

                                                            <div className="bustimediv  d-flex flex-column align-items-end">
                                                                <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.bus_details?.booking_date}</h6>
                                                                <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.bus_details?.payment_method}</h6>
                                                                <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.bus_details?.transaction_id}</h6>
                                                                <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.bus_details?.ticket_id}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 row buslist--card d-flex">
                                        <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                            <div className="d-flex justify-content-between align-items-center busnmflex">
                                                <h5 className="m-0 me-2 fw-semibold">Price Details</h5>
                                            </div>
                                            <div className="col-12 align-items-center">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                        <div className="bustimediv d-flex flex-column align-items-start">

                                                            <h6 className="fw-semibold mb-2" >Price</h6>
                                                            <h6 className="fw-semibold mb-2" >Discount</h6>
                                                            {sarthiDis && (sarthiDis !== "0" && sarthiDis !== null && sarthiDis !== "") && (
                                                                <h6 className="fw-semibold mb-2">Sarthi Discount</h6>
                                                            )}
                                                            <h6 className="fw-semibold mb-2" >Wallet</h6>

                                                            <h6 className="fw-semibold mb-2" >Total Price</h6>


                                                        </div>
                                                        <div className="bustimediv d-flex flex-column align-items-end">
                                                            <h6 style={{ color: '#3F7135' }} className="fw-semibold mb-2">&nbsp;₹{singleTicketsData?.ticket_list?.price_details_array?.price}</h6>
                                                            <h6 style={{ color: '#3F7135' }} className="fw-semibold mb-2">-₹{singleTicketsData?.ticket_list?.price_details_array?.discount}</h6>
                                                            {sarthiDis && (sarthiDis !== "0" && sarthiDis !== null && sarthiDis !== "") && (
                                                                <h6 style={{ color: '#3F7135' }} className="fw-semibold mb-2">-{sarthiDis}</h6>
                                                            )}
                                                            <h6 style={{ color: '#3F7135' }} className="fw-semibold mb-2">-₹{singleTicketsData?.ticket_list?.price_details_array?.wallet}</h6>


                                                            <h6 className="fw-semibold mb-2">&nbsp;₹{singleTicketsData?.ticket_list?.price_details_array?.total_price}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-5">
                                    {/* Passengers Details */}
                                    <div className="mb-3 row buslist--card d-flex">
                                        <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                            <div className="d-flex justify-content-between align-items-center busnmflex">
                                                <h5 className="m-0 me-2 fw-semibold">Passenger(s)</h5>
                                            </div>
                                            <div className="col-12 align-items-center">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-end bustimeflex">
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Name</h6>
                                                            {singleTicketsData?.ticket_list?.passenger?.map((passenger, index) =>
                                                                <h6 className="fw-medium mb-2" key={index}>{`${passenger.name} (${passenger.gender})`}</h6>
                                                            )}
                                                        </div>
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Age</h6>
                                                            {singleTicketsData?.ticket_list?.passenger?.map((passenger, index) =>
                                                                <h6 className="fw-medium mb-2" key={index}>{`${passenger.age}`}</h6>
                                                            )}
                                                        </div>
                                                        <div className="bustimediv  d-flex flex-column align-items-end">
                                                            <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Seat No</h6>
                                                            {singleTicketsData?.ticket_list?.passenger?.map((passenger, index) =>
                                                                <h6 className="fw-medium mb-2" key={index}>{`${passenger.seat_number}`}</h6>
                                                            )}
                                                        </div>
                                                        <div className="bustimediv d-flex flex-column align-items-end">
                                                            <h6 className="fw-semibold mb-2" style={{ color: 'gray' }}>Seat Price</h6>
                                                            {singleTicketsData?.ticket_list?.passenger?.map((passenger, index) =>
                                                                <h6 className="fw-medium mb-2" key={index}>{`${passenger.seat_price}`}</h6>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Contact Details */}
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
                                                        <div className="bustimediv  d-flex flex-column align-items-end" style={{
                                                            wordBreak: "break-word",
                                                            overflowWrap: "break-word",
                                                            whiteSpace: "normal",
                                                            width: "75%"
                                                        }}>
                                                            <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.contact_details?.contact_name}</h6>
                                                            <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.contact_details?.phone_number}</h6>
                                                            <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.contact_details?.contact_email_id || "Not available"}  </h6>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 row buslist--card d-flex">
                                        <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                            <div className="d-flex justify-content-between align-items-center busnmflex">
                                                <h5 className="m-0 me-2 fw-semibold">Driver Details</h5>
                                            </div>
                                            <div className="col-12 align-items-center">
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-2" >Driver Name</h6>
                                                            <h6 className="fw-medium mb-2" >Driver Number</h6>
                                                            <h6 className="fw-semibold mb-2" >Bus Number</h6>
                                                        </div>
                                                        <div className="bustimediv  d-flex flex-column align-items-end">
                                                            <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.driver_array?.driver_name}</h6>
                                                            <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.driver_array?.driver_number}</h6>
                                                            <h6 className="fw-semibold mb-2">{singleTicketsData?.ticket_list?.driver_array?.bus_number}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 row buslist--card d-flex">
                                        <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3">
                                            <div className="row col-12 align-items-center">
                                                <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                    <div className="bustimediv">
                                                        <h5 className="fw-bold" >Total Payment : {singleTicketsData?.ticket_list?.final_price}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
 
                                    <div className="bustimediv  d-flex gap-3">
                                        {action !== 'cancel' && (
                                            <Button variant="contained" onClick={handleDownload} disabled={!downloadTicket} style={{ width: "32%", backgroundColor: "rgb(121 44 143)" }}>Download Ticket</Button>
                                        )}
                                        {
                                            toggleCancel == "1" ? <Button variant="outlined" color="error" onClick={handleOpen} style={{ width: "32%", border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Cancel Ticket</Button> : <></>

                                        }
                                        {action !== 'cancel' && (
                                            toggleRating == "0" ? <Button variant="contained" onClick={handleOpenReview} style={{ width: "32%", border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Review</Button> : <></>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* cancel ticket */}
                <Dialog open={openPopupBox}
                    sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "30%",
                                maxWidth: "1500px",   
                            },
                        },
                    }}
                >
                    <DialogTitle id="alert-dialog-title" className="sky_text">
                        {header}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={resetAddDialog}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <h3 className="mt-2">Select Reason</h3>
                            <div className="fs-5 mt-3 mb-2 text-black">
                                <span>Please Select the Reason for cancellation:</span>
                            </div>
                            {/* <div className="d-flex"> */}
                            {
                                ticketCancelReasonData?.ticket_cancle_reason?.map((e, index) => (
                                    <div key={index}>
                                        <RadioGroup value={selectedValue} onChange={handleRadio}>
                                            <FormControlLabel value={e.msg} control={<Radio />} label={
                                                <Typography style={{ color: "black" }}>
                                                    {e.msg}
                                                </Typography>
                                            } />
                                        </RadioGroup>
                                        {e.msg == 'Others' && selectedValue == 'Others' && <TextField size="small" sx={{ maxWidth: 500, width: '100%' }} value={customReason} onChange={handleCustomReasonChange} />}
                                    </div>
                                ))
                            }
                            {/* </div> */}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="mb-3" style={{ padding: "20px 24px" }}>
                        <Button autoFocus variant="contained" color="error" onClick={resetAddDialog} style={{ width: "30%", border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>
                            Cancel
                        </Button>
                        <Button autoFocus variant="contained" color="success" onClick={handelCancelTicket} style={{ width: "30%", backgroundColor: "rgb(121 44 143)" }}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* review  */}
                <Dialog open={openPopupBoxReview}
                    sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "60%",
                            },
                        },
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={resetAddDialogReview}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div className="fs-5 text-black text-center">
                                <div>
                                    <img src={singleTicketsData?.image_url + singleTicketsData?.ticket_list?.bus_image} alt="" className="img-fluid" style={{ height: '60px', width: '60px', borderRadius: '100%', border: '1px solid black' }} />
                                </div>
                                <span>{singleTicketsData?.ticket_list?.bus_name}</span>
                                <div className="fs-1">
                                    {/* <LiaStar /> */}
                                    <Rating
                                        onClick={handleRating}
                                        onPointerEnter={onPointerEnter}
                                        onPointerLeave={onPointerLeave}
                                        onPointerMove={onPointerMove}
                                    />

                                </div>
                                <div className="fs-1">
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Enter your FeedBack"
                                        sx={{ width: 550 }}
                                        value={reviewMsg}
                                        onChange={(e) => setReviewMsg(e.target.value)}
                                        multiline
                                        rows={5}
                                        InputProps={{
                                            sx: {
                                                paddingY: '10px',  
                                                margin: "10px"
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="mb-3" sx={{ display: "flex", justifyContent: "center" }}>
                        <Button autoFocus variant="contained" color="success" onClick={addReviewAPI} style={{ width: "30%", border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>
                            Give Review
                        </Button>

                    </DialogActions>
                </Dialog>
                <Footer />
            </div>
        </>
    )
}
export default TicketsDetailsView