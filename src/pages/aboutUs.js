import { useEffect, useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

const AboutUs = () => {
    const [aboutUsData, setAboutUsData] = useState({})

    useEffect(() => {
        AboutUsList()
    }, [])
    const AboutUsList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("about_us", data);
            setAboutUsData(res.data.data.about_us);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <>
            <div>
                <Header />
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
                <section className='w-100'>
                    <div className="about-banner">
                        <h1 className="text-white fs-3">ABOUT US</h1>
                    </div>
                    <div className="container-md container-sm container-xl mt-5">
                        <div className="row">
                            <div className="col">
                                <span dangerouslySetInnerHTML={{ __html: aboutUsData?.full_about_us_web }} />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}
export default AboutUs