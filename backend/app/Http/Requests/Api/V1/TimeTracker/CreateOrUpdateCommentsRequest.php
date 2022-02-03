<?php

namespace App\Http\Requests\Api\V1\TimeTracker;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrUpdateCommentsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
                 'comments'=>'required|min:15',
                 'task_id'=>'required|integer|max:11',
        ];
    }
}
