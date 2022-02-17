import React from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CommentItem from '../Comment/CommentItem'
const CommentList = ({isCommentsLoading, params, task_id, comments, header, fetchComments}) => {
    return (
        <>
        <div className="p-8">
            <div className="p-2 w-max dark:text-gray-300 rounded-t-lg text-gray-800 text-xs bg-gray-200 dark:bg-gray-800">Комментарии</div>
            <div className="bg-gray-200 dark:bg-gray-800 shadow-md w-full p-4 flex flex-col space-y-2 rounded-tl-none rounded-lg">
                {isCommentsLoading
                    ? <Skeleton enableAnimation={false} count={5} className="h-full dark:bg-gray-700 animate-pulse"/>
                    : !comments.length 
                    ? <div className="dark:text-white text-xs text-gray-600 text-center py-16">Комментариев нет</div>
                    : comments.map(commentData => (
                        <CommentItem key={commentData.id} params={params} task_id={task_id} fetchComments={fetchComments} header={header} commentData={commentData}/>
                    ))}
            </div>         
        </div> 
        </>
    )
}

export default CommentList;

