import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import Header from "../header"
import Loader from "../loader"


const CancelPolicy = () => {

    const [cancelPolicyData, setCancelPolicyData] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        CancelPolicyList()
    }, [])
    const CancelPolicyList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("cancle_policy", data);
            setCancelPolicyData(res.data.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <>
            <div className="card-border">
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
                <div className="cancellation-policy p-4 card">
                    <span  dangerouslySetInnerHTML={{ __html: cancelPolicyData?.cancle_policy }} />
                </div>
            </div>
        </>
    )
}
export default CancelPolicy