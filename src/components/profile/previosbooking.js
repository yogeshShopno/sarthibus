import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PreviousBooking = () => {
    const [ticketsData, setTicketsData] = useState([])
    const [userID, setUserID] = useState()

    useEffect(() => {
        const storedUserID = localStorage.getItem('UserID');
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (userID) {
            TicketsList();
        }
    }, [userID]);

    const TicketsList = async () => {
        let data = new FormData();
        data.append('user_id', localStorage.getItem('UserID'))
        data.append('type', 3)
        const params = {
            'user_id': localStorage.getItem('UserID'),
            'type': 3,
        }
        try {
            await axios.post("home", data, {
                params: params
            }).then((res) => {
                setTicketsData(res.data.data)
            })
        }
        catch (error) {
        }
    }
    const handleTicketClick = (ticketId, type) => {
        window.location.href = `/ticket-details-view/${type}/${ticketId}`;
    };
    return (

        <div className="prevbookdiv card-border">
            <div className="eidtproftitle titlediv my-3">
                <h5 className="text-capitalize fw-semibold fs-4">Your Previous Bookings</h5>
            </div>

            {
                ticketsData?.recent_booking?.map((ticket, index) => (
                    <div
                        onClick={() => handleTicketClick(ticket.id, 2)}
                    >
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
                                            <div>

                                                <p className="m-0 me-2 fw-medium">Bus No :- {ticket?.bus_number} </p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center bustimeflex">

                                                <div className="bustimediv">
                                                    <h6 className="fw-semibold mb-1">{ticket?.starting_point_name}</h6>
                                                    <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px', display: "flex", justifyContent: "end" }}>{ticket.bording_time}</p>
                                                </div>
                                                <div className="bustimediv flxbasissdiv">
                                                    <span className="border--span"></span>
                                                    <p className="bustotalhours fw-medium m-0">{ticket?.time_different}</p>
                                                </div>
                                                <div className="bustimediv">
                                                    <h6 className="fw-semibold mb-1">{ticket?.ending_point_name}</h6>
                                                    <p className="fw-medium m-0" style={{ color: 'rgb(108 42 127)', fontSize: '17px', display: "flex", justifyContent: "end" }}>{ticket.droping_time}</p>
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
    );
};

export default PreviousBooking;
