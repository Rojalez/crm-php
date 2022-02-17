import React, {useState, useEffect} from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useFetching } from "../../hooks/useFetching"
import { getComments } from "../../API/CommentService"
import { useParams } from "react-router-dom"
import useHeader from "../../hooks/useHeader"

const Comment = ({task_id}) => {
    const [comments, setComments] = useState([])
    const params = useParams()
    const header = useHeader()

    const [fetchComments, isCommentsLoading] = useFetching(async (id) => {
        const response = await getComments(id, header)
        setComments(response.data.comments)
    })

    useEffect(() => {
        fetchComments(params.id)
    }, []);

    return (
        <>
            <CommentForm task_id={task_id} comments={comments} fetchComments={fetchComments} setComments={setComments}/>
            <CommentList params={params} task_id={task_id} fetchComments={fetchComments} header={header} isCommentsLoading={isCommentsLoading} comments={comments}/>
        </>
    )
}

export default Comment;