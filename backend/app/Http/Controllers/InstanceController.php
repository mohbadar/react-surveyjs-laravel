<?php

namespace App\Http\Controllers;

use App\Instance;
use Illuminate\Http\Request;

class InstanceController extends Controller
{
   
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Instance::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'data'=>'required',
            'questionnaire_id' => 'required'            
        ]);

        // return response()->json($request);

        try{

            Instance::create($request->post());
            return response()->json([
                'message'=>'Instance Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a Instance!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Instance  $Instance
     * @return \Illuminate\Http\Response
     */
    public function show(Instance $Instance)
    {
        return response()->json([
            'Instance'=>$Instance
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Instance  $Instance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Instance $Instance)
    {
        $request->validate([
            'data'=>'required',
            'questionnaire' => 'required',
        ]);

        try{

            $Instance->fill($request->post())->update();
            return response()->json([
                'message'=>'Instance Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a Instance!!'
            ],500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Instance  $Instance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Instance $Instance)
    {
        try {
            $Instance->delete();
            return response()->json([
                'message'=>'Instance Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a Instance!!'
            ]);
        }
    }
}
