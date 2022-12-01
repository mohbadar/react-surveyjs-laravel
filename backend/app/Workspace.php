<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    //

    protected $fillable = ['name', 'token', 'description', 'project_id'];


    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
