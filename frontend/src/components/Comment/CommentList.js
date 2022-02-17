import React, {useEffect} from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Moment from "react-moment"
import MyButton from "../UI/button/MyButton"
const CommentList = ({isCommentsLoading, comments, deleteComment}) => {

    return (
        <div className="p-8">
            <div className="p-2 w-max dark:text-gray-300 rounded-t-lg text-gray-800 text-xs bg-gray-200 dark:bg-gray-800">Комментарии</div>
            <div className="bg-gray-200 dark:bg-gray-800 shadow-md w-full p-4 flex flex-col space-y-2 rounded-tl-none rounded-lg">
                {isCommentsLoading
                    ? <Skeleton enableAnimation={false} count={5} className="h-full dark:bg-gray-700 animate-pulse"/>
                    : !comments.length 
                    ? <div className="dark:text-white text-xs text-gray-600 text-center py-16">Комментариев нет</div>
                    : comments.map(comment => (
                    <div key={comment.id} className="block relative p-2.5 w-full space-y-4 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg dark:text-white">
                        <div className="flex flex-row text-xs space-x-2">
                            <span>{comment.id}</span>
                            <span><Moment format="HH:mm:ss DD.MM.YY">{comment.created_at}</Moment></span>
                        </div>
                        <div className="text-sm w-10/12">
                            {comment.comment}
                        </div>
                        <div className="absolute right-2 top-0">
                            <MyButton onClick={() => deleteComment(comment.id)}><i className="fal fa-trash-alt"></i></MyButton>
                            <MyButton><i className="fal fa-pen-alt"></i></MyButton>
                        </div>
                    </div>
                ))}
            </div>         
        </div>
    )
}

export default CommentList;

