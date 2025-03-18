import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../header";

const ShippingPolicy = () => {
    const [shippingPolicyData, setShippingPolicyData] = useState({})

    useEffect(() => {
        ShippingPolicyList()
    }, [])
    const ShippingPolicyList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("shipping_refund_policy", data);
            setShippingPolicyData(res.data.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
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
                <div className="p-4">
                    <span dangerouslySetInnerHTML={{ __html: shippingPolicyData?.shipping_refund_policy }} />
                </div>
            </div>
        </>
    )
}
export default ShippingPolicy