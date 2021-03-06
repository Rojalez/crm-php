<?php

namespace App\Http\Resources\Api\V1\TimeTracker;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "id" => $this->id,
            "name" => $this->name,
            "email"=> $this->email,
            "done_tasks"=>TaskListForProfileResource::collection($this->done_tasks()),
            "queue_tasks"=>TaskListForProfileResource::collection($this->queue_tasks()),
            ];
    }
}
