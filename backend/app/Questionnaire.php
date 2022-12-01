<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questionnaire extends Model
{
    
    protected $fillable = ['name', 'structure', 'description', 'project_id'];

}
