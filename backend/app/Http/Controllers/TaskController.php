<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Http\Requests\TaskCreateRequest;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // $tasks = Task::all();
        // return response()->json($tasks);

        $tasks = ['tasks'=>Task::all()];
        return response()->json($tasks, 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(TaskCreateRequest $request)
    // {
    //     DB::beginTransaction();
    //     try {
    //         $validated = $request->validated();

    //         $task = new Task();
    //         $task->title = $validated["title"];
    //         $task->content = $validated["content"];
    //         $task->start_date = $validated["start_date"];
    //         $task->save();
    //         DB::commit();
    //         return response()->json($tasks, 201);
    //     } catch (\Exception$e) {
    //         DB::rollBack();
    //         throw $e;
    //     }
    // }

    public function store(TaskCreateRequest $request)
    {
        DB::beginTransaction();
        try {
        $validated = $request->validated();

        $task = new Task();
        $task->user_id =$request["user_id"];
        $task->title = $validated["title"];
        $task->content = $validated["content"];
        $task->start_date = $validated["start_date"];
        $task->due_date = $validated["due_date"];
        $task->save();
        DB::commit();
        return response()->json($task, 201);
        } catch (\Exception$e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        try{
        $task = Task::find($id);

        $task->title = $request["title"];
        $task->start_date = $request["start_date"];
        $task->due_date = $request["due_date"];
        $task->content = $request["content"];
        $task->status = $request["status"];
        $task->save();
        return response()->json($task, 200);
        } catch (\Exception$e) {
            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
        $task = Task::find($id);
        $task->delete();
        return response()->json($task, 200);
        } catch (\Exception$e) {
            throw $e;
        }
    }
}
