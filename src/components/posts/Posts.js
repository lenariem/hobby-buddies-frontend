import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post";
import { PostItem } from "./PostItem";
import { PostForm } from "./PostForm";
import Spinner from "../layout/Spinner";

export const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);
    const loading = useSelector(state => state.post.loading);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <section className="container">
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />
            {loading && <Spinner />}
            <div className="posts">
                {posts
                    ? posts.map(post => <PostItem key={post._id} post={post} />)
                    : "No posts yet"}
            </div>
        </section>
    );
};
