import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="bg-gradient-to-b from-[#e1eebc] via-white to-[#e1eebc] min-h-screen pb-16">
            <Container>
                <div className="max-w-2xl mx-auto bg-[#f6fae6] border border-[#d0e6b6] rounded-2xl shadow-2xl p-6 md:p-10 mt-10">
                    {/* Image */}
                    <div className="w-full flex justify-center mb-6">
                        <div className="w-full max-h-[350px] bg-[#e1eebc] rounded-2xl shadow-md flex items-center justify-center overflow-hidden px-2 py-2" style={{ minHeight: '180px' }}>
                            <img
                                src={appwriteService.getFileUrl(post.featuredImage)}
                                alt={post.title}
                                className="w-auto h-full max-h-[350px] max-w-full object-contain rounded-2xl"
                                style={{ background: 'transparent' }}
                            />
                        </div>
                    </div>
                    {/* Title, Publisher, and Buttons */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700 text-center md:text-left">
                                {post.title}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600 text-base font-medium gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>Published by {post.userEmail || post.userName || post.userId}</span>
                            </div>
                        </div>
                        {isAuthor && (
                            <div className="flex flex-row gap-4 justify-center md:justify-end mt-2 md:mt-0">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-teal-600" className="text-lg px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-teal-700 hover:scale-105 transition-all">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-orange-600" className="text-lg px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-orange-700 hover:scale-105 transition-all" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-800">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}