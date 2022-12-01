<?php

namespace App\Http\Controllers;

use App\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Workspace::get();
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
            'name'=>'required',
            'token' => 'required',
            'description'=>'required',
            'project_id' => 'required|integer'
            
        ]);

        // return response()->json($request);

        try{

            Workspace::create($request->post());
            return response()->json([
                'message'=>'Workspace Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a Workspace!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Workspace  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Workspace $workspace)
    {
        return response()->json([
            'workspace'=>$workspace
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Workspace $workspace)
    {
        $request->validate([
            'name'=>'required',
            'location' => 'required',
            'description'=>''
        ]);

        try{

            $workspace->fill($request->post())->update();

            return response()->json([
                'message'=>'Workspace Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a Workspace!!'
            ],500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Workspace  $workspace
     * @return \Illuminate\Http\Response
     */
    public function destroy(Workspace $workspace)
    {
        try {
            $workspace->delete();
            return response()->json([
                'message'=>'Project Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a Project!!'
            ]);
        }
    }
}
