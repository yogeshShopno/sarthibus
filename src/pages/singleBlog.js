import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "../components/footer"
import Header from "../components/header"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const SingleBlog = () => {
    const blogImage = process.env.PUBLIC_URL + 'assets/images/Bus-travel.jpg';
    const { id } = useParams();
    const [singleBlogData, setSingleBlogData] = useState({ blog: [] });
    const [showContain, setShowContain] = useState(false);

    useEffect(() => {
        singleBlog(id);
    }, [id]);

    const singleBlog = async (id) => {
        let data = new FormData();
        data.append('blog_id', id)
        const params = {
            'blog_id': id
        }
        try {
            await axios.post("single_blog", data, {
                params: params
            }).then((res) => {
                setSingleBlogData(res.data.data);
            })
        }
        catch (error) {
        }
    }

    return (
        <>
            <div>
                <Header />
                <div className="py-5">
                    <div className="container">
                        <div className="row gap-4">
                            <div className="col-lg-7 border border-secondary p-4">
                                <div className="single_post">
                                    <div className="blog_img d-flex justify-content-center">
                                        {singleBlogData.blog[0] && (
                                            <img src={singleBlogData.image_url + singleBlogData.blog[0].image} className="img-fluid w-100" alt="Blog" />
                                        )}
                                    </div>
                                    <div className="single_post_content py-4">
                                        <h3>
                                            {singleBlogData.blog[0] ? singleBlogData.blog[0].title : "Loading..."}
                                        </h3>
                                        <h4 className="fs-6 text-gray text-start my-4">
                                            {singleBlogData.blog[0] ? singleBlogData.blog[0].short_description : "Loading..."}
                                        </h4>

                                        {showContain && singleBlogData.blog[0] ?
                                            <span dangerouslySetInnerHTML={{ __html: singleBlogData.blog[0].long_description }} />
                                            :
                                            <div className=" d-flex justify-content-center">
                                                <Button variant="contained" onClick={() => setShowContain(true)} style={{ border: "2px solid rgb(121 44 143)", backgroundColor: "white", color: "rgb(121 44 143)" }}>Read More </Button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 border border-secondary p-4">
                                <div className="single_post">
                                    <ul className="nav featurenav nav-tabs text-capitalize flex-column justify-content-center border-0">
                                        {singleBlogData?.recent_post?.map((item) => (
                                            <li className="border-bottom" style={{ minHeight: '55px', height: '100%', justifyContent: 'center', display: 'flex', fontSize: '17px', fontWeight:700 }}>

                                                <span style={{ alignSelf: 'center' }}>{item.title}</span>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default SingleBlog;
