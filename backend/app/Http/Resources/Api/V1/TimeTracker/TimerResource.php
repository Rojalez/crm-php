<?php

namespace App\Http\Resources\Api\V1\TimeTracker;

use Illuminate\Http\Resources\Json\JsonResource;

class TimerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'start_time'=>$this->start_time,
            'stop_time'=>$this->stop_time,
            'total'=>$this->total,
        ];
    }
}
