import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { PostItem } from "../posts/PostItem";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { getPost } from "../../actions/post";

export const Post = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const post = useSelector(state => state.post.post);
    const loading = useSelector(state => state.post.loading);

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <section className="container">
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                    />
                ))}
            </div>
        </section>
    );
};
