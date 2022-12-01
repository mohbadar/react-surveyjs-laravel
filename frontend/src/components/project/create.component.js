import React, { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateWorkspace() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [validationError, setValidationError] = useState({});


    const createProject = async(e) => {
        e.preventDefault();

        const formData =new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("description", description);

        console.log("form here", formData);

        await axios.post("http://localhost:8000/api/workspaces",formData).then((data) => {

            console.log("response", data);
            Swal.fire({
                icon:"success",
                text: data.data.message
            })

            navigate("/")
        }).catch((response) => {
            if(response.status===422){
                setValidationError(response.data.errors)
              }else{
                Swal.fire({
                  text:response.data.message,
                  icon:"error"
                })
            }

        }); 
    

    }


    return (
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Create Prject</h4>
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

                  <Form onSubmit={createProject}>

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

                        <Row>
                        <Button variant="primary" className="mt-2" size="lg" block="block" type="submit"> Save  </Button>
                        </Row>


                  </Form>
               
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    );

}