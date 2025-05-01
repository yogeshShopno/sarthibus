import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Loader from "../components/loader";

const PaymentStatus = () => {
    const location = useLocation(); // Get the full query string
    const history = useHistory()

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        handleStatus(location)

    }, [location.search])

    const handleStatus = async (location) => {
        setLoading(true);

        if (location.search) {

            let data = new FormData();
            data.append("payment_check_json", location.search.startsWith('?paymentResponse=') ? location.search.slice(17) : ""); // Pass as-is

            try {

                const res = await axios.post("/payment_check", data); // Ensure correct API URL

                if (res.data.success) {
                    
                    setLoading(false);
                    history.push("/success-ticket", { "status": true });

                } else {
                    console.error("Payment Failed:", res.data.success || "Invalid Message");
                    setLoading(false);
                    history.push("/success-ticket", { "status": false });

                }
            } catch (error) {
                console.error("API Error:", error.response?.data?.message || "Something went wrong");
                setLoading(false);
                history.push("/success-ticket", { "status": false });

            }
        }
        else {
            return;
        }

    }

    return (
        <>

            {loading && <Loader />}

        </>
    );
};

export default PaymentStatus;
