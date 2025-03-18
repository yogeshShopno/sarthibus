import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Faq = () => {
    const [faqData, setFaqData] = useState([])
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        FaqList()
    }, [])
    const FaqList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("faq_list", data);
            setFaqData(res.data.data);
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
                <div>
                    <h1 className="fs-1">FAQ</h1>
                    <div className="accordion mt-4" id="accordionExample">
                        {
                            faqData?.faqs?.map((f, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`} >
                                            {f.question}
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {f.answer}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Faq