<?php

namespace App\Http\Controllers\Api\V1\TimeTracker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\TimeTracker\timerCreateOrUpdateRequest;
use App\Http\Resources\Api\V1\TimeTracker\TimerResource;
use App\Models\Timer;


class TimerController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(timerCreateOrUpdateRequest $request)
    {
        $startExist = Timer::where('user_id', $request->user()->id)->where('total', null)->count();

        if (!$startExist) {
            $timer = Timer::create([
                'user_id' => $request->user()->id,
                'task_id' => $request->task_id,
                'start_time' => date('Y-m-d h:m:s'),
            ]);

            return new TimerResource($timer);
        } else {
            return json_encode([
                'message' => 'You can`t check start. Before you must check stop!',
            ]);
        }
    }

       /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $timer = Timer::findOrFail($id);
        $timer->stop_time = date('Y-m-d H:m:s');
        $totalOnSec= strtotime($timer->stop_time) - strtotime($timer->start_time);
        $minutes = floor($totalOnSec / 60); // Считаем минуты
        $hours = floor($minutes / 60); // Считаем количество полных часов
        $minutes = $minutes - ($hours * 60);  // Считаем количество оставшихся минут
        $timer->total = strtotime($timer->stop_time) - strtotime($timer->start_time);
        $timer->total = $hours.':'.$minutes;


        $timer->save();
        return new TimerResource($timer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $timer = Timer::findOrFail($id);
        $timer->delete();

        return ['success'];
    }
}
