import React from 'react';

import { MdOutlineShare } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Header from '../components/header';
import Footer from '../components/footer';

const TicketConfirmation = () => {
  return (
    <>
      <Header />
      <main>
        <div className="cnfirmedinfordiv mt-5 text-capitalize">
          <div className="container">
            <div className="confirmed--div text-center">
              <img
                src="assets/images/confirmed.svg"
                alt=""
                width="120px"
                height="120px"
                className="img-fluid"
              />
              <h4 className="fw-bold mt-3">ticket confirmed</h4>
            </div>
            <div className="ticketcnfrm--maintickt">
              <div className="tctconfirm--div">
                <div className="tcktshareconfirmt">
                  <div className="passanger--infodiv mt-5">
                    <div className="ticket-container">
                      <div className="align-items-center d-flex header justify-content-between px-4 py-2">
                        <h4 className="fs-3 fw-semibold mb-0">RAGHAV TRAVELS</h4>
                        <div className="d-flex gap-4">
                          <div className="download-icon">
                            <button className="btn tctshareicon" style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>
                              <MdOutlineShare className="fs-4 md hydrated" />
                            </button>
                          </div>
                          <div className="download-icon">
                            <button className="btn tctshareicon" style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>
                              <IoCloudDownloadOutline className="fs-4 md hydrated" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="body-content border-dashed-theme border-top-0 p-4 rounded-bottom-3 tctshare--content">
                        <div className="numberpass--seatdet d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="fw-medium py-1 fs-18 text-capitalize border-right-2 pe-3 text-body-tertiary">
                              passanger 1
                            </div>
                            <div className="seat-numdiv d-flex gap-3 text-capitalize ps-3">
                              <strong>seat 17c</strong>
                              <strong>seat 17c</strong>
                              <strong>seat 17c</strong>
                            </div>
                          </div>
                          <div className="bookdatdiv">
                            <div className="text-end">
                              <strong>Date:</strong> 14/6/2024
                            </div>
                          </div>
                        </div>
                        <div className="tctshr--rowdiv mt-4">
                          <div className="row">
                            <div className="col-md-4 ">
                              <div className="tct--col py-3 border-right-dashed-1">
                                <div className="frm-group mb-4">
                                  <h6 className="fw-semibold">Name</h6>
                                  <p className="fw-medium text-body-tertiary">chandler m bing</p>
                                </div>
                                <div className="frm-group mb-4">
                                  <h6 className="fw-semibold">mobile number</h6>
                                  <p className="fw-medium text-body-tertiary">+91 9988776655</p>
                                </div>
                                <div className="frm-group mb-4">
                                  <h6 className="fw-semibold">gander</h6>
                                  <p className="fw-medium text-body-tertiary">male</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="tct--col py-3">
                                <div className="row">
                                  <div className="col-md-6 frm-group mb-4">
                                    <h6 className="fw-semibold">boarding point</h6>
                                    <p className="fw-medium text-body-tertiary">
                                      Prime Arcade Kalupur Bank Glorious Hotel
                                    </p>
                                  </div>
                                  <div className="col-md-6 frm-group mb-4">
                                    <h6 className="fw-semibold">dropping point</h6>
                                    <p className="fw-medium text-body-tertiary">jetpur</p>
                                  </div>
                                </div>
                                <div className="frm-group mb-4">
                                  <h6 className="fw-semibold">bus number</h6>
                                  <p className="fw-medium text-body-tertiary">gj5 2299</p>
                                </div>
                                <div className="row">
                                  <div className="col-md-6 frm-group mb-4">
                                    <h6 className="fw-semibold">contact travel agent</h6>
                                    <p className="fw-medium text-body-tertiary">+91 95856685412</p>
                                  </div>
                                  <div className="col-md-6 frm-group mb-4">
                                    <h6 className="fw-semibold">mail us</h6>
                                    <p className="fw-medium text-body-tertiary">sarthi@gmail.com</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6 frm-group ">
                                    <h6 className="fw-semibold">fare</h6>
                                    <p className="fw-medium fw-bold mb-0 text-black fs-5">₹700 Paid</p>
                                  </div>
                                  <div className="col-md-6 frm-group">
                                    <div className="barcodeimg text-end">
                                      <img src="assets/images/barcode.gif" alt="" width="200px" className="img-fluid" />
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

export default TicketConfirmation;
