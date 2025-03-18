import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from "react-toastify";

const Blogs = (props) => {
    const bloglist = props.user;
    const history = useHistory()
    return (
        <section className="mt-100 blogs--sec">
            <div className="container">
                <div className="blogs--main">
                    <div className="blogs--div">
                        <div className="titlediv mb-3 mb-lg-5">
                            <h4>{props.image_url}</h4> 
                        </div>
                        <div className="blogs--content mt-5">
                            <div className="row justify-content-center">
                                {bloglist?.blog?.map((e, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 col-12 mb-4" onClick={()=> history.push(`/single-blog/${e?.id}`)} >
                                        <div className="blogs_card shadow-lg smooth shadow-hover-none text-center card border-0 p-4" style={{ cursor: "pointer" }}>
                                            <div className="blogs--icon">
                                                <img src={bloglist?.image_url + e?.image} alt="" className="img-fluid w-100" />
                                            </div>
                                            <div className="blogs--content mt-3">
                                                <div className="blog--titlediv text-start">
                                                    <small className="small text-blue fw-bold text-capitalize mb-2 d-block fs-6">{e?.title}</small>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h5 className="fw-bold">{e?.sub_title}</h5>
                                                    </div>
                                                    <p>{e?.short_description}</p>
                                                    <Button variant="outlined" onClick={()=> history.push(`/single-blog/${e?.id}` )} style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Read More !</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blogs;
