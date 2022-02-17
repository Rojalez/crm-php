import React, {useState, useEffect} from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useFetching } from "../../hooks/useFetching"
import { getComments } from "../../API/CommentService"
import useHeader from "../../hooks/useHeader"

const Comment = ({params}) => {
    const [comments, setComments] = useState([])
    const header = useHeader()
    const [fetchComments, isCommentsLoading] = useFetching(async () => {
        const response = await getComments(params.id, header)
        setComments(response.data.comments)
    })

    useEffect(() => {
        fetchComments(params.id)
    }, []);

    return (
        <>
            <CommentForm params={params} comments={comments} fetchComments={fetchComments} setComments={setComments}/>
            <CommentList params={params} fetchComments={fetchComments} header={header} isCommentsLoading={isCommentsLoading} comments={comments}/>
        </>
    )
}

export default Comment;