import axios from "axios";
import Footer from "../components/footer"
import Header from "../components/header"
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BlogPage = () => {
    const [blogData, setBlogData] = useState([])
    const userImg = process.env.PUBLIC_URL + 'assets/images/user.png';
    const history = useHistory()

    useEffect(() => {
        BlogList();
    }, [])
    const BlogList = async () => {
        let data = new FormData();
        try {
            const res = await axios.get("blog", data);
            setBlogData(res.data.data);
        } catch (error) {
        }
    };
    return (
        <>
            <div>
                <Header />
                <section className='w-100'>
                    <div className="about-banner">
                        <h1 className="text-white fs-3">BLOGS</h1>
                    </div>
                    <div className="container">
                        <div className="blogs--main">
                            <div className="blogs--div">
                                <div className="blogs--content mt-5">
                                    <div className="row justify-content-center">
                                        {blogData?.blog?.map((e, index) => (
                                            <div key={index} className="col-lg-4 col-md-6 col-12 mb-4" onClick={()=> history.push(`/single-blog/${e?.id}`)} >
                                                <div className="blogs_card shadow-lg smooth shadow-hover-none text-center card border-0 p-4">
                                                    <div className="blogs--icon">
                                                        <img src={blogData?.image_url + e?.image} alt="" className="img-fluid w-100" />
                                                    </div>
                                                    <div className="blogs--content mt-3">
                                                        <div className="blog--titlediv text-start">
                                                            <small className="small text-blue fw-bold text-capitalize mb-2 d-block fs-6">{e?.title}</small>
                                                            <div className="d-flex justify-content-between mb-3">
                                                                <h5 className="fw-bold">{e?.sub_title}</h5>
                                                            </div>
                                                            <p>{e?.short_description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}
export default BlogPage