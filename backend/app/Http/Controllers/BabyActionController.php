<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Baby;
use App\Models\BabyAction;
use Carbon\Carbon;

class BabyActionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $baby = Auth::user(); 
        $baby = Baby::all()->findOrFail(1);//
      
        $actions = BabyAction::where('baby_id',$baby->id)->get();

        $actions = ['baby_actions'=>$actions];
        return response()->json($actions, 200);


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
  
    public function store(Request $request)
    {
        $actions = BabyAction::create([
          'baby_id' => $request->baby_id,
          'action' => $request->action,
          'cry' => $request->cry,
          'start_date' => Carbon::now(),
          'end_date' => Carbon::now()->addMinutes(5),
          'mill_amount' =>$request->mill_amount,
          'memo' =>$request->memo
        ]);

        return response()->json([
            'message' => '作成成功',
            'action' => $actions
        ], 201);
      
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
        $action = BabyAction::find($id);

        $action->action = $request["action"];
        $action->cry = $request["cry"];
        $action->start_date = $request["start_date"];
        $action->end_date = $request["end_date"];
        $action->milk_amount = $request["milk_amount"];
        $action->memo = $request["memo"];
        $action->save();
        return response()->json($action, 200);
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
        $task = BabyAction::find($id);
        $task->delete();
        return response()->json($task, 200);
        } catch (\Exception$e) {
            throw $e;
        }
    }
}
