import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'



export default function ListWorkspace() {

    const [projects, setProjects] = useState([]);

    useEffect(() =>{
        fetchProjects();
    }, []);

    const fetchProjects = async() =>{
        await axios.get("http://localhost:8000/api/workspaces").then(({data})=> {
            // console.log(data);
            setProjects(data);
        })
    }


    const deleteProject = async(id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }


          await axios.delete(`http://localhost:8000/api/workspaces/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text: data.message
            })
            fetchProjects()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }


    return (

        <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/workspaces/create"}> Create Workspace</Link>
            </div>
            <div className="col-12">
            <h4 className="card-title">List of Worksapces</h4>

                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Token</th>
                                    <th>Description</th>
                                    <th>Project Code</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    projects.length > 0 && (
                                        projects.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.name}</td>
                                                <td>{row.token}</td>
                                                <td>{row.description}</td>
                                                <td>{row.project_id}</td>

                                                <td>
                                                    <Link to={`/workspaces/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteProject(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>

    );
}