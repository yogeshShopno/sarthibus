import { Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast, ToastContainer } from 'react-toastify';

const ShowMyTicket = () => {

    const [value, setValue] = useState(0);
    const [ticketsData, setTicketsData] = useState([])
    const [userID, setUserID] = useState()
    const [ticketId, setTicketId] = useState()
    const history = useHistory()
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue == 1) {
            TicketsList(2)
        }
        else if (newValue == 0) {
            TicketsList(1)
        }
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
                style={{
                    overflowY: 'auto',
                    maxHeight: '800px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#1333a7 white',
                }}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    
    useEffect(() => {
        const storedUserID = localStorage.getItem('UserID');
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, []);

    useEffect(() => {
        if (userID) {
            TicketsList(1);
        }
    }, [userID]);

    const handleTicketClick = (type,ticketId) => {
        window.location.href = `/ticket-details-view/${type}/${ticketId}`;
    };

    const TicketsList = async (ticketType) => {
        let data = new FormData();
        data.append('user_id', userID)
        data.append('type', ticketType)
        const params = {
            'user_id': userID,
            'type': ticketType,
            id: ticketId,
        }
        try {
            await axios.post("ticket_list", data, {
                params: params
            }).then((res) => {
                setTicketsData(res.data.data)

            })
        }
        catch (error) {
            toast.error(error.data.message);
        }
    }

    return (
        <>
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
            <Tabs
                value={value}
                onChange={handleChange}
                className="nav boarddrop--anv nav-tabs text-capitalize gap-3 align-items-center justify-content-center"
                variant="fullWidth"
            >
                <Tab label="Upcomming Tickets" id="tab-1" aria-controls="tabpanel-0" />
                <Tab label="Completed Trips" id="tab-2" aria-controls="tabpanel-1" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className="prevbookdiv">
                    <div className="eidtproftitle titlediv my-3">
                        <h5 className="text-capitalize fw-semibold fs-4">Upcomming Tickets</h5>
                    </div>
                    {
                        ticketsData?.ticket_list?.map((ticket, index) => (

                            <div onClick={() => handleTicketClick( 1,ticket.id)}>
                                <div className="ticket-container mt-4">
                                    <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3"  >
                                        <div className="d-flex justify-content-between align-items-center busnmflex ">
                                            <div className="busname--icons">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img src={ticketsData?.image_url + ticket?.bus_image} alt="" className="img-fluid" style={{ height: '60px', width: '60px', borderRadius: '100%', border: '1px solid black' }} />
                                                    <div>
                                                        <h5 className="m-0 me-2 fw-semibold">{ticket.bus_name}</h5>
                                                        <p className="m-0 me-2">{ticket?.bus_ac} </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="fw-medium m-0 tcktpricediv" style={{ color: 'rgb(108 42 127)' }} >₹{ticket?.final_price}</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-12 align-items-center">
                                                <div >
                                                    <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-1">{ticket?.starting_point_name}</h6>
                                                            <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px',display:"flex",justifyContent:"end" }}>{ticket.bording_time}</p>
                                                        </div>
                                                        <div className="bustimediv flxbasissdiv">
                                                            <span className="border--span"></span>
                                                            <p className="bustotalhours fw-medium m-0">{ticket?.time_different}</p>
                                                        </div>
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-1">{ticket?.ending_point_name}</h6>
                                                            <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px',display:"flex",justifyContent:"end" }}>{ticket.droping_time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <div className="prevbookdiv">
                    <div className="eidtproftitle titlediv my-3">
                        <h5 className="text-capitalize fw-semibold fs-4">Completed Trips</h5>
                    </div>
                    {ticketsData?.ticket_list?.map((ticket, index) => (
                            // <div onClick={() => history.push(`/ticket-details-view/${ticket.id}`)}>
                            <div onClick={() => handleTicketClick( 2,ticket.id)}>
                                <div className="ticket-container mt-4">
                                    <div className="d-flex rounded-9 flex-column gap-4 buslist--card card shadow-hover border-hover-none p-3"  >
                                        <div className="d-flex justify-content-between align-items-center busnmflex ">
                                            <div className="busname--icons">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img src={ticketsData?.image_url + ticket?.bus_image} alt="" className="img-fluid" style={{ height: '60px', width: '60px', borderRadius: '100%', border: '1px solid black' }} />
                                                    <div>
                                                        <h5 className="m-0 me-2 fw-semibold">{ticket.bus_name}</h5>
                                                        <p className="m-0 me-2">{ticket?.bus_ac} </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="fw-medium m-0 tcktpricediv" style={{ color: 'rgb(108 42 127)' }} >₹{ticket?.final_price}</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-12 align-items-center">
                                                <div >
                                                    <div className="d-flex justify-content-between align-items-center bustimeflex">
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-1">{ticket?.starting_point_name}</h6>
                                                            <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px' ,display:"flex",justifyContent:"end"}}>{ticket.bording_time}</p>
                                                        </div>
                                                        <div className="bustimediv flxbasissdiv">
                                                            <span className="border--span"></span>
                                                            <p className="bustotalhours fw-medium m-0">{ticket?.time_different}</p>
                                                        </div>
                                                        <div className="bustimediv">
                                                            <h6 className="fw-semibold mb-1">{ticket?.ending_point_name}</h6>
                                                            <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px' ,display:"flex",justifyContent:"end"}}>{ticket.droping_time}</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </TabPanel>

        </>
    );
}

export default ShowMyTicket;
