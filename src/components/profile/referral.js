import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import referAndEarn from "./referAndEarn.json";
import Lottie from "lottie-react";

const Referral = () => {

    const [referralCode, setReferralCode] = useState("");
    const [referralData, setReferralData] = useState({});
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getReferralData()

    }, []);

    const getReferralData = async () => {
        let data = new FormData();
        data.append('user_id', localStorage.getItem('UserID'))

        try {
            await axios.post("refer_data", data, {

            }).then((res) => {
                setReferralData(res.data.data)
                setTransactionHistory(res.data.data.wallet_list || [])
                setReferralCode(res.data.data.referral_code ? res.data.data.referral_code : "Not Found")
            })
        } catch (error) {
            toast.error(error.response?.data?.message || 'API is not working'); // Safely accessing the error message
        }
    };

    const handleCopy = () => {

        navigator.clipboard.writeText(referralCode)
        setReferralCode("Text Copied !")

        setTimeout(() => {
            getReferralData();
        }, 500);

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
                    <div className="container my-5 card-border">
                        <div className="card shadow ">
                            <div className="card-body">
                                <div className="d-flex gap-2 flex-wrap flex-md-nowrap justify-content-between align-items-center" >
                                    <Lottie className="w-30 " animationData={referAndEarn} loop={true} />
                                    <div>
                                        <h3 className="mb-5">{referralData.title}

                                        </h3>
                                        <ul style={{ listStyle: 'none', margin: '0px', padding: '0px', }} >

                                            {referralData?.points?.map((point) => (
                                                <li key={point.id}>  <img style={{ cursor: 'pointer', width: '20px', marginBlock: '5px', paddingBottom: '4px', }} src="/assets/icons/front-bus.png" alt="copy icon" /> {point.title}</li>
                                            ))}
                                        </ul>
                                        <p className="my-3 fs-6" >
                                            <span className="border px-2 py-2 text-bolder   fs-5" >
                                                {referralCode}
                                            </span>
                                            <img style={{ cursor: 'pointer', width: '30px', margin: '10px', paddingBottom: '4px', color: "#6c2a7f" }} src="/assets/icons/copying.png" alt="copy icon" onClick={handleCopy} />
                                        </p>
                                        <span style={{ backgroundColor: "#44164c" }} className="text-bold rounded text-white fs-6 py-1 pb-2 px-3">Referral A Friend!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5 card-border">
                    <div className="card shadow history-card">
                        <div className="card-body">
                            <h4 className="fs-2 text-bold   my-3 ">
                                
                                Transaction History
                            </h4>
                             <div>
                                <div>
                                  
                                    {transactionHistory.length > 0 ? (
                                        <ul style={{ listStyle: "none", margin: "0px", padding: "0px", color: "#6c2a7f" }}>
                                            {transactionHistory.map((transaction) => (
                                                <li
                                                    key={transaction.id}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        borderBottom: "1px solid #e0e0e0",
                                                        padding: "10px 0",
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
                                                                justifyContent: "center",
                                                                backgroundColor: '#f5d1cf',
                                                                width: "35px",
                                                                height: "35px",
                                                                borderRadius: '50px',
                                                                marginRight: "10px",

                                                            }} >   <img
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        width: "15px",
                                                                        padding: "0px",
                                                                        filter: "invert(26%) sepia(90%) saturate(3000%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                                                                        overflow: "hidden",
                                                                        display: "block",
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
                                                                    backgroundColor: '#D3E7D4',
                                                                    width: "35px",
                                                                    height: "35px",
                                                                    borderRadius: '50px',
                                                                    marginRight: "10px",
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
                                                                    alt="transaction icon" />
                                                            </div>
                                                        )}

                                                        {transaction.payment_type == 2 ? (
                                                            <span
                                                                style={{
                                                                    fontSize: "16px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                <p style={{ margin: 0 }}> {transaction.msg}</p>

                                                                <p style={{ color: "#B4B4B4", margin: 0 }}>
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
                                                                <p style={{ margin: 0 }}> {transaction.msg}</p>
                                                                <p style={{ color: "#B4B4B4", margin: 0 }}>
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
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{ textAlign: "center", color: "#FF2020" }}>Transaction History Not Found</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Referral