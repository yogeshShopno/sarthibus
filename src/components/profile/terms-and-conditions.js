import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../header";

const TermsConditions = () => {
    const [termsConditionsData, setTermsConditionsdata] = useState({})

    useEffect(() => {
        TermsConditionsList()
    }, [])
    const TermsConditionsList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("terms_and_conditions", data);
            setTermsConditionsdata(res.data.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <>
            <div className="container">
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
                    <span dangerouslySetInnerHTML={{ __html: termsConditionsData?.terms_and_conditions }} />
                </div>
            </div>
        </>
    )
}
export default TermsConditions