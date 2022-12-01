import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditQuestionnaire() {

    const navigate = useNavigate();

    const {id} = useParams();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [validationError, setValidationError] = useState({});
  
    useEffect(()=>{
      fetchProject()
    },[])
  
    const fetchProject = async () => {
        console.log("ID", id)
      await axios.get(`http://localhost:8000/api/workspaces/${id}`).then(({data})=>{
        const { name, location, description } = data.project
        setName(name)
        setLocation(location)
        setDescription(description)
      }).catch(({response:{data}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })
    }

    const updateProject = async (e) => {
        e.preventDefault();
    
        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append("name", name);
        formData.append("location", location);
        formData.append("description", description);
    

        console.log("project", formData)

        await axios.post(`http://localhost:8000/api/workspaces/${id}`, formData).then(({data})=>{
          Swal.fire({
            icon:"success",
            text:data.data.message
          })
          navigate("/")
        }).catch(({response})=>{

         if(response == null){
            Swal.fire({
                icon:"success",
                text:"Successfully Updated"
              })
              navigate("/")
         }else {
            console.log("response", response)
            if(response.status == 422){
              setValidationError(response.data.errors)
            }else{
              Swal.fire({
                text:response.data.message,
                icon:"error"
              })
            }
          }
         }
        )
      }

      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Update Workspace</h4>
                  <hr />
                  <div className="form-wrapper">
                    {
                      Object.keys(validationError).length > 0 && (
                        <div className="row">
                          <div className="col-12">
                            <div className="alert alert-danger">
                              <ul className="mb-0">
                                {
                                  Object.entries(validationError).map(([key, value])=>(
                                    <li key={key}>{value}</li>   
                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    <Form onSubmit={updateProject}>
                    <Row>
                            <Col>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange= {(event) => {
                                        setName(event.target.value)
                                    }}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <Form.Group controlId="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" value={location} onChange= {(event) => {
                                        setLocation(event.target.value)
                                    }}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className="my-3">
                            <Col>
                                <Form.Group controlId="Description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={description} onChange={(event)=>{
                                    setDescription(event.target.value)
                                    }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                      <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                        Update
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      

}