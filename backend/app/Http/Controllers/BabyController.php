<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Baby;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BabyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      DB::beginTransaction();
        try {
        $baby = new Baby();
        $baby->user_id = Auth::id();
        $baby->baby_name =$request["baby_name"];
        $baby->save();
        DB::commit();
        return response()->json($baby, 201);
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
