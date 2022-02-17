import React, {useState, useEffect} from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useFetching } from "../../hooks/useFetching"
import { getComments, delComment } from "../../API/CommentService"
import useHeader from "../../hooks/useHeader"

const Comment = ({params}) => {
    const [comments, setComments] = useState([])
    const [subscribe, setSubscribe] = useState(false);
    const header = useHeader()
    const [fetchComments, isCommentsLoading] = useFetching(async () => {
        const response = await getComments(params.id, header)
        setComments(response.data.comments)
    })
    const [deleteComment, deleteCommentLoading] = useFetching(async (id) => {
        await delComment(id, header)
        fetchComments(params.id);
    })
    
    useEffect(() => {
        setSubscribe(true)
        fetchComments(params.id)
        return () => setSubscribe(false)
    }, [])

    if(!subscribe) {
        return null;
      }
    return (
        <>
            <CommentForm params={params} comments={comments} fetchComments={fetchComments} setComments={setComments}/>
            <CommentList params={params} deleteComment={deleteComment} deleteCommentLoading={deleteCommentLoading} fetchComments={fetchComments} header={header} isCommentsLoading={isCommentsLoading} comments={comments}/>
        </>
    )
}

export default Comment;