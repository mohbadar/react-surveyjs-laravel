<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //

    protected $fillable = ['name', 'location', 'description'];


    public function workspaces()
    {
        return $this->hasMany(Workspace::class);
    }
}
