<?php

namespace App\Http\Controllers\Api\V1\TimeTracker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\TimeTracker\CreateOrUpdateCommentsRequest;
use App\Http\Resources\Api\V1\TimeTracker\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comment = CommentResource::collection(Comment::all());

        return $comment;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrUpdateCommentsRequest $request)
    {
        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'comment' => $request->comment,
            'task_id' => $request->task_id,
        ]);
        return new CommentResource($comment);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = Comment::findOrFail($id);

        return new CommentResource($comment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateOrUpdateCommentsRequest $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->comment = $request->comment;
        $comment->task_id = $request->task_id;
        $comment->save();

        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return ['success'];
    }
}
