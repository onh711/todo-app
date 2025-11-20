<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Baby;
use Illuminate\Support\Facades\DB;
use App\Models\BabyAction;

class BabyActionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $baby = Auth::user(); 
        $baby = Baby::all()->findOrFail(1);//
        // // dd($user);
        // $babys = DB::select('select * from baby_actions');
        //  dd($babys);
        $actions = $baby->baby_actions;
       
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
          'action' => $request->action,
          'cry' => $request->cry,
          'start_date' => $request->start_date,
          'end_date' => $request->end_date,
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
