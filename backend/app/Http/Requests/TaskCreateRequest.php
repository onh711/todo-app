<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:50',
            'content'  => 'max:250',
            'start_date' => 'required|date',
            'due_date' => 'date',
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'タスク名',
            'content'  => '詳細',
            'start_date' => '開始日',
            'due_date' => '期限日',
        ];
    }

    public function messages()
    {
        return [
            'due_date.after_or_equal' => ':attribute には今日以降の日付を入力してください。',
        ];
    }
}
