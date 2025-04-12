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
          <div className="container my-3">
            <div
              className="card rounded-4 shadow-sm position-relative overflow-hidden shadow"
              style={{
                background: "#ffffff",
                color: "#333",
                borderColor: "rgb(121, 44, 143)"
              }}
            >
              {/* Decorative soft circle */}
              <div
                className="position-absolute top-0 end-0 translate-middle"
                style={{
                  width: "250px",
                  height: "250px",
                  background: "radial-gradient(circle, rgba(121, 44, 143, 0.1), transparent 70%)",
                  borderRadius: "50%",
                  filter: "blur(80px)",
                  zIndex: 1,
                }}
              ></div>

              <div className="card-body py-5 px-4 position-relative" style={{ zIndex: 2 }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
                  {/* Left Side: User Info */}
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-person-circle fs-3 me-2 text-secondary"></i>
                      <p className="fs-4 fw-semibold mb-0">{localStorage.getItem("UserName")}</p>
                    </div>
                    <p className="text-capitilize text-muted mb-1">Wallet Balance</p>
                    <h1 className="fw-bold mb-0 display-5" style={{ color: "#792C8F" }}>
                      ₹ {transactionHistory.total_wallet}
                    </h1>
                  </div>

                  {/* Right Side: Wallet Icon Box */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "#f3e7f7",
                      border: "1px solid #e6d5ef",
                      boxShadow: "0 5px 15px rgba(121, 44, 143, 0.1)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <img
                      src="/assets/icons/wallet.png"
                      alt="Wallet"
                      style={{
                        width: "38px",
                        filter:
                          "invert(18%) sepia(60%) saturate(750%) hue-rotate(275deg) brightness(90%) contrast(95%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container my-1">
            <div className="card shadow rounded-4" style={{ background: "#ffffff", borderColor: "rgb(121, 44, 143)" }}>
              <h4 className="fw-bold text-white"
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  backgroundColor: "#44164c",
                  color: "#fff !important",
                  padding: "13px",
                  marginTop: "0px !important",
                  borderRadius: "15px 15px 0px 0px",
                }}>Transaction History</h4>
              <div className="card-body p-4">
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
                            {transactionHistory.wallet_list.map((transaction) => (
                              <li
                                key={transaction.id}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  borderBottom: "1px solid #e0e0e0",
                                  padding: "12px 0",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  {transaction.payment_type == 2 ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#ffe2e2",
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        marginRight: "12px",
                                      }}
                                    >
                                      <img
                                        style={{
                                          cursor: "pointer",
                                          width: "18px",
                                          filter:
                                            "invert(30%) sepia(90%) saturate(3000%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                                        }}
                                        src="/assets/icons/wallet.png"
                                        alt="transaction icon"
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#d6f5e5",
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        marginRight: "12px",
                                      }}
                                    >
                                      <img
                                        style={{
                                          cursor: "pointer",
                                          width: "18px",
                                          filter:
                                            "invert(55%) sepia(85%) saturate(5000%) hue-rotate(90deg) brightness(90%) contrast(100%)",
                                        }}
                                        src="/assets/icons/wallet.png"
                                        alt="transaction icon"
                                      />
                                    </div>
                                  )}

                                  {transaction.payment_type == 2 ? (
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                      <span
                                        style={{
                                          fontSize: "15px",
                                          fontWeight: "600",
                                          color: "#2c2c2c",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                        {transaction.msg}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "13px",
                                          color: "#dc3545", // a soft red
                                          fontWeight: "500",
                                        }}
                                      >
                                        Debit
                                      </span>
                                    </div>
                                  ) : (
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                      <span
                                        style={{
                                          fontSize: "15px",
                                          fontWeight: "600",
                                          color: "#2c2c2c",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                        {transaction.msg}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "13px",
                                          color: "#28a745", // a fresh green
                                          fontWeight: "500",
                                        }}
                                      >
                                        Credit
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {transaction.payment_type == 2 ? (
                                  <div
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "600",
                                      color: "#FF3C3C",
                                    }}
                                  >
                                    -₹{transaction.amount}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "600",
                                      color: "#28a745",
                                    }}
                                  >
                                    +₹{transaction.amount}
                                  </div>
                                )}
                              </li>
                            ))}
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
                              <img
                                src="/assets/images/wallet-transaction.png"
                                alt="No Transactions"
                                style={{ maxWidth: "300px", marginBottom: "20px" }}
                              />
                              <div>Transaction History Not Found</div>
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
