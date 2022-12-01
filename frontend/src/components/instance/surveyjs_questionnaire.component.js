import React, { useEffect, useState } from "react";
import { useCallback } from 'react';

// Default V2 theme
import 'survey-core/defaultV2.min.css';
// Modern theme
// import 'survey-core/modern.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';


export default function QuestionnaireInstance(){
    const navigate = useNavigate();

    StylesManager.applyTheme("defaultV2");

    const {id} = useParams();
    const [name, setName] = useState("");
    const [structure, setStructure] = useState("");
    const [description, setDescription] = useState("");
    const [project, setProject] = useState("");

    useEffect(()=>{
        fetchQuestionnaire()
      },[])
    
      const jsonValue = JSON.parse(JSON.stringify(structure));
    //   console.log("survey", jsonValue);
      const survey = new Model(jsonValue)

      const surveyComplete = useCallback((sender) => {

        const formData = new FormData();
        formData.append("questionnaire_id", id);
        formData.append('data', JSON.stringify(sender.data));
        console.log("Filled Data", sender.data)

        axios.post("http://localhost:8000/api/instances",formData).then((data) => {

            console.log("response", data);
            Swal.fire({
                icon:"success",
                text: data.data.message
            })

            navigate("/questionnaires")
        }).catch((response) => {
           
             Swal.fire({
                  text:response.data.message,
                  icon:"error"
            })

        }); 
    

      }, []);
    
      survey.onComplete.add(surveyComplete);

      
    const fetchQuestionnaire = async () => {
      await axios.get(`http://localhost:8000/api/questionnaires/${id}`).then(({data})=>{
        // console.log("Questionnaire data", JSON.parse(JSON.stringify(data.questionnaire.structure)));
        const { name, structure, description } = data.questionnaire
        setName(name)
        setStructure(structure)
        setDescription(description)

        


      }).catch(({response:{data = null}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })
    }

   return <Survey model={survey} />;


   function saveSurveyResults(url, json) {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.addEventListener('load', () => {
      // Handle "load"
    });
    request.addEventListener('error', () => {
      // Handle "error"
    });
    request.send(JSON.stringify(json));
  }

}
