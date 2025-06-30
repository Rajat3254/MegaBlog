import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log('userData in form:', userData);

    const submit = async (data) => {
        setLoading(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage, // fallback to old image
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                let fileId = null;

                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) fileId = file.$id;
                }

                // Debug: Log userData
                console.log('userData:', userData);
                // Debug: Log data being sent to createPost
                console.log('Creating post with:', {
                    ...data,
                    userId: userData.$id,
                    userEmail: userData.email,
                    featuredImage: fileId,
                });

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    userEmail: userData.email,
                    featuredImage: fileId,
                });

                if (dbPost && dbPost.$id) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    alert('Failed to create post. Please check your input and try again.');
                }
            }
        } catch (error) {
            console.error("Post submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-12 gap-x-8 gap-y-6">
            {/* Left Column: Main Content */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
                <Input
                    label={<span style={{color: '#328e6e', fontWeight: 'bold', fontSize: '1.125rem'}}>Title:</span>}
                    placeholder="Enter post title"
                    className="w-full"
                    {...register("title", { required: "Title is required" })}
                />
                <Input
                    label={<span style={{color: '#328e6e', fontWeight: 'bold', fontSize: '1.125rem'}}>Slug:</span>}
                    placeholder="Auto-generated from title"
                    className="w-full bg-gray-100 border-gray-200"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div className="mb-6">
                    <RTE label={<span style={{color: '#328e6e', fontWeight: 'bold', fontSize: '1.125rem'}}>Content:</span>} name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            {/* Right Column: Metadata & Actions */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4" style={{color: '#328e6e'}}>Featured Image</h3>
                    <Input
                        label="Upload a new image"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full">
                            <img
                                src={appwriteService.getFileUrl(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg object-cover w-full h-auto"
                            />
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4" style={{color: '#328e6e'}}>Publishing Actions</h3>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor="bg-teal-600" className="w-full py-2.5 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all" loading={loading}>
                        {loading ? (post ? "Updating..." : "Publishing...") : (post ? "Update Post" : "Publish Post")}
                    </Button>
                </div>
            </div>
        </form>
    );
}
