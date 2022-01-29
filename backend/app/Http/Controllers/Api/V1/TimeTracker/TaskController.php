<?php

namespace App\Http\Controllers\Api\V1\TimeTracker;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrUpdateTaskRequest;
use Illuminate\Http\Request;

use App\Models\Task;
use App\Http\Resources\Api\V1\TimeTracker\TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = TaskResource::collection(Task::all());

        return $tasks;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrUpdateTaskRequest $request)
    {
        $task = Task::create([
            'title' => $request->title,
            'executor_id' => $request->executor_id,
            'text' => $request->text,
            'user_id' => $request->user_id,
        ]);

        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::findOrFail($id);

        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CreateOrUpdateTaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->title = $request->title;
        $task->text = $request->text;
        $task->user_id = $request->user_id;
        $task->executor_id = $request->executor_id;
        $task->save();

        return new TaskResource($task);;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return ['success'];
    }
}
