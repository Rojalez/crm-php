<?php

namespace App\Http\Resources\Api\V1\TimeTracker;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskListResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'text' => $this->text,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'author' => new UserResource($this->author),
            'executor' => new UserResource($this->executor),
        ];
    }
}
