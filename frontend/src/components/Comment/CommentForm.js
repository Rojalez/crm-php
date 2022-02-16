import React, {useState, useEffect} from "react";
import MyButton from "../UI/button/MyButton";
import { useFetching } from "../../hooks/useFetching";
import useHeader from "../../hooks/useHeader";
import { getComments, postComment } from "../../API/TaskService";
import { useParams } from "react-router-dom";
const CommentForm = ({comments, setComments, task_id}) => {
    const [comment, setComment] = useState({
        task_id: '1',
        comment: ''
    })
    const header = useHeader()

    const [addComment, isAddCommentLoading] = useFetching(async () => {
        const response = await postComment(task_id, comment, header)
        setComments([...comments, response.data])
    })

    const addNewComment = (e) => {
        e.preventDefault();
        const newComment = {
            ...comment
        };
        addComment(newComment)
        setComment({
            task_id: '1',
            comment: ''
            
        });
    }

    return (
        <div className="px-8">
        <form className="bg-gray-200 dark:bg-gray-800 shadow-md relative w-full p-4 flex flex-col space-y-2 rounded-lg">
            <textarea value={comment.comment} onChange={e => setComment({...comment, comment: e.target.value})} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg border-0 focus:border-none focus:ring-0 focus:outline-none dark:placeholder-gray-400 dark:text-white" 
                placeholder="Ваш комментарий...">
            </textarea>
            <div className="w-max"><MyButton onClick={addNewComment}>Оставить комментарий</MyButton></div>
        </form>
    </div>
    )
}

export default CommentForm;