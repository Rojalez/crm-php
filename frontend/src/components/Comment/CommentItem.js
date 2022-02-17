import React, {useState} from "react";
import Moment from "react-moment"
import MyButton from "../UI/button/MyButton"
import MyInput from "../UI/input/MyInput"
import MyModal from "../UI/MyModal"
import { updateCommentById, delComment } from "../../API/CommentService";
import { useFetching } from "../../hooks/useFetching";
const CommentItem = ({commentData, header, fetchComments, task_id, params}) => {
    const [commentModal, setCommentModal] = useState(false)
    const [comment, setComment] = useState({
        comment: '',
        task_id: ''
    })
    const [updateComment] = useFetching(async (id, data) => {
        const response = await updateCommentById(id, header, data )
        setComment([...comment, response.data])
        fetchComments(task_id)
    })

    const changeComment = (e) => {
        e.preventDefault();
        const changedComment = {
            ...comment
        };
        updateComment(changedComment)
    }
    
    const [deleteComment, deleteCommentLoading] = useFetching(async (id) => {
        await delComment(id, header)
        fetchComments(params.id);
    })

    return (
        <>
        <div className="block relative p-2.5 w-full space-y-4 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg dark:text-white">
            <div className="flex flex-row text-xs space-x-2">
                <span>{commentData.id}</span>
                <span><Moment format="HH:mm:ss DD.MM.YY">{commentData.created_at}</Moment></span>
            </div>
            <div className="text-sm w-10/12">
                {commentData.comment}
            </div>
            <div className="absolute right-2 top-0">
                <MyButton onClick={() => deleteComment(commentData.id)}>
                    {deleteCommentLoading 
                        ? <i className="fal fa-trash-alt animate-spin"></i>
                        : <i className="fal fa-trash-alt"></i>
                    }
                </MyButton>
                <MyButton onClick={() => setCommentModal(true)}><i className="fal fa-pen-alt"></i></MyButton>
            </div>
        </div>
        <MyModal visible={commentModal} setVisible={setCommentModal} >
            <MyInput value={comment.comment} onChange={e => setComment({...comment, comment: e.target.value})} placeholder="Комментарий" type="text"/>
            <MyInput value={comment.task_id} onChange={e => setComment({...comment, task_id: e.target.value})} placeholder="ID задачи" type="text"/>
            <MyButton onClick={() => [changeComment, setCommentModal(false)]}>Сохранить</MyButton>
        </MyModal> 
        </>
    )
}

export default CommentItem;