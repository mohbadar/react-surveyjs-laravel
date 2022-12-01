// Default V2 theme
import 'survey-core/defaultV2.min.css';
// Modern theme
// import 'survey-core/modern.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';



export default function SimpleSurveyJsPresentation(){

    StylesManager.applyTheme("defaultV2");

    const surveyJson = {
        elements: [{
          name: "FirstName",
          title: "Enter your first name:",
          type: "text"
        }, {
          name: "LastName",
          title: "Enter your last name:",
          type: "text"
        }]
      };

    
      const survey = new Model(surveyJson);



      return <Survey model={survey} />;

      
}
