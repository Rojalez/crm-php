import React, {useState ,useEffect} from "react";
import MyButton from "../UI/button/MyButton";
import { useFetching } from "../../hooks/useFetching";
import useHeader from "../../hooks/useHeader";
import { postComment } from "../../API/CommentService";
import MyTextarea from "../UI/textarea/MyTextarea";
import MyInput from "../UI/input/MyInput";
const CommentForm = ({comments, setComments, task_id}) => {
    const [comment, setComment] = useState({
        task_id: '',
        comment: ''
    })
    const header = useHeader()
    const [addComment] = useFetching(async (data) => {
        const response = await postComment(task_id, data, header)
        setComments([...comments, response.data])
    })

    const addNewComment = (e) => {
        e.preventDefault();
        const newComment = {
            ...comment
        };
        addComment(newComment)
        setComment({
            task_id: '',
            comment: ''
        });
    }

    return (
        <div className="px-8">
        <form className="bg-gray-200 dark:bg-gray-800 shadow-md relative w-full p-4 flex flex-col space-y-2 rounded-lg">
            <MyTextarea placeholder="Ваш комментарий..." value={comment.comment} onChange={e => setComment({...comment, comment: e.target.value})} rows="4"/>
            <MyInput placeholder="ID задачи" value={comment.task_id} onChange={e => setComment({...comment, task_id: e.target.value})} />
            <div className="w-max"><MyButton onClick={addNewComment}>Оставить комментарий</MyButton></div>
        </form>
    </div>
    )
}

export default CommentForm;