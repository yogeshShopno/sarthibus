import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import Header from "../header";
import { TextField } from "@mui/material";
import { FaCopy } from "react-icons/fa";
import referAndEarn from "./referAndEarn.json";
import Lottie from "lottie-react";

const Wallet = () => {
  const [transactionHistory, setTransactionHistory] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    getWalletlData();
  }, []);

  const getWalletlData = async () => {
    let data = new FormData();
    data.append("user_id", localStorage.getItem("UserID"));

    try {
      await axios.post("wallet_list", data, {}).then((res) => {
        setTransactionHistory(res.data.data);
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "API is not working"); // Safely accessing the error message
    }
  };

  return (
    <>
      <div>
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
        <div>
          <div className="container my-5  ">
            <div style={{ backgroundColor: "#44164C" }} className="card shadow">
              <div className="card-body">
                <div className="px-5 d-flex flex-column  gap-2 flex-wrap flex-md-nowrap justify-content-between align-items-md-start align-items-sm-center">
                  <p className="text-white fs-5 my-4 ">
                    {localStorage.getItem("UserName")}
                  </p>
                  <p className="text-white fs-5 my-1">Your Balance </p>
                  <h3 className="text-white  my-1">
                    ₹ {transactionHistory.total_wallet}{" "}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="container my-5 ">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="fs-2 text-bold   my-3 ">
                  {" "}
                  Transaction History{" "}
                </h4>
                <div>
                  <div>
                    {transactionHistory && transactionHistory.wallet_list ? (
                      transactionHistory.wallet_list.length > 0 ? (
                        <div>
                          <ul
                            style={{
                              listStyle: "none",
                              margin: "0px",
                              padding: "0px",
                              color: "#6c2a7f",
                            }}
                          >
                            {transactionHistory.wallet_list.map(
                              (transaction) => (
                                <li
                                  key={transaction.id}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: "1px solid #e0e0e0",
                                    padding: '10px 0'
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    
                                    }}
                                  >
                                    {transaction.payment_type == 2 ? (
                                   <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:"center",
                                    backgroundColor: '#f5d1cf',
                                    width: "35px",
                                    height:"35px",
                                    borderRadius: '50px',     
                                      marginRight:"10px",

                                  }} >   <img
                                        style={{
                                          cursor: "pointer",
                                          width: "15px",
                                          padding: "0px",
                                          filter:"invert(26%) sepia(90%) saturate(3000%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                                          overflow: "hidden", 
                                          display: "block", 
                                        }}
                                        src="/assets/icons/wallet.png"
                                        alt="transaction icon"
                                      />   </div>
                                    ) : (
                                        <div 

                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent:"center",
                                            backgroundColor: '#D3E7D4',
                                            width: "35px",
                                            height:"35px",
                                            borderRadius: '50px',     
                                              marginRight:"10px",
                                          }}>

                                      <img
                                        style={{
                                            cursor: "pointer",
                                            width: "15px",
                                            padding: "0px",
                                            filter: 'invert(55%) sepia(85%) saturate(5000%) hue-rotate(90deg) brightness(90%) contrast(100%)',
                                            overflow: "hidden", 
                                            display: "block", 
                                        }}
                                        src="/assets/icons/wallet.png"
                                        alt="transaction icon"/>   
                                      </div>
                                    )}
                                    
                                    {transaction.payment_type == 2 ? (
                                      <span
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <p  style={{margin:0 }}> {transaction.msg}</p>
                                       
                                        <p style={{ color: "#B4B4B4" ,margin:0 }}>
                                          Debit
                                        </p>
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "500",
                                        }}
                                      >
                                         <p  style={{margin:0 }}> {transaction.msg}</p>
                                        <p style={{ color: "#B4B4B4",margin:0 }}>
                                          Credit
                                        </p>
                                      </span>
                                    )}
                                  </div>
                                  {transaction.payment_type == 2 ? (
                                    <div
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#FF2020",
                                      }}
                                    >
                                      -₹{transaction.amount}
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#3F7135",
                                      }}
                                    >
                                      +₹{transaction.amount}
                                    </div>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div>
                          <ul
                            style={{
                              listStyle: "none",
                              margin: "0px",
                              padding: "0px",
                              color: "#6c2a7f",
                            }}
                          >
                            <li
                              style={{
                                padding: "100px 10px",
                                textAlign: "center",
                                color: "#FF2020",
                              }}
                            >
                              Transaction History Not Found{" "}
                            </li>
                          </ul>
                        </div>
                      )
                    ) : (
                      <p>
                        <p>Loading transaction history...</p>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Wallet;
