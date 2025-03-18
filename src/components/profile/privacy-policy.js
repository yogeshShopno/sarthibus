import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../header";

const PrivacyPolicy = () => {
    const [privacyPolicyData, setPrivacyPolicyData] = useState({})

    useEffect(() => {
        PrivacyPolicyList()
    }, [])
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const PrivacyPolicyList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("privacy_policy", data);
            setPrivacyPolicyData(res.data.data);
        } catch (error) {
            toast.error(error.response.data.message);
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
                <div className="p-4">
                    <span dangerouslySetInnerHTML={{ __html: privacyPolicyData?.privacy_policy }} />
                </div>
            </div>
        </>
    )
}
export default PrivacyPolicy