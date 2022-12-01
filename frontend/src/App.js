import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

// import EditProduct from "./components/products/edit.component";
// import ProductList from "./components/products/list.component";
// import CreateProduct from "./components/products/create.component";

import CreateProject from "./components/project/create.component";
import ListProject from "./components/project/list.component";
import EditProject from "./components/project/edit.component";


import CreateWorkspace from "./components/workspace/create.component";
import ListWorkspace from "./components/workspace/list.component";
import EditWorkspace from "./components/workspace/edit.component";



import CreateQuestionnaire from "./components/questionnaire/create.component";
import ListQuestionnaire from "./components/questionnaire/list.component";
import EditQuestionnaire from "./components/questionnaire/edit.component";                                          


import SimpleSurveyJsPresentation from "./components/instance/surveyjs.component";     
import QuestionnaireInstance from "./components/instance/surveyjs_questionnaire.component"; 

function App() {
  return (<Router>
    <Navbar style={{'border-bottom': '1px solid #ccc'}} className="navbar-bg">
      <Container>
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>

        <Link to={"/projects"} className="navbar-brand ">
          Project
        </Link>
        <Link to={"/workspaces"} className="navbar-brand">
          Workspace
        </Link>

        <Link to={"/questionnaires"} className="navbar-brand">
          Questionnaire
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            {/* <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route exact path='/' element={<ListProject />} /> */}
            <Route exact path='/projects' element={<ListProject />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/edit/:id" element={<EditProject />} />


            <Route path="/workspaces" element={<ListWorkspace />} />
            <Route path="/workspaces/create" element={<CreateWorkspace />} />
            <Route path="/workspaces/edit/:id" element={<EditWorkspace />} />


            <Route path="/questionnaires" element={<ListQuestionnaire />} />
            <Route path="/questionnaires/create" element={<CreateQuestionnaire />} />
            <Route path="/questionnaires/edit/:id" element={<EditQuestionnaire />} />
            <Route path="/questionnaires/survey/:id" element={<QuestionnaireInstance />} />


            <Route path="/instance/sample" element={<SimpleSurveyJsPresentation />} />


            <Route exact path='/' element={<ListProject />} />

          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
