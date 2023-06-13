import React from 'react';
import { Survey, Model } from 'survey-react';
import 'survey-react/survey.css';

const SurveyForm: React.FC = () => {
  // Define your survey JSON
  const surveyJSON = {
    // Your survey structure goes here
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'text',
            name: 'name',
            title: 'Please enter your name:',
          },
          {
            type: 'rating',
            name: 'satisfaction',
            title: 'Rate your satisfaction:',
          },
        ],
      },
    ],
  };

  // Define a function to handle the form submission
  const handleSubmit = (survey: any) => {
    // Do something with the survey data
    console.log(survey.data);
  };

  // Create a SurveyJS model based on the survey JSON
  const surveyModel = new Model(surveyJSON);

  return (
    <div>
      <h3>Survey Form</h3>
      <Survey model={surveyModel} onComplete={handleSubmit} />
    </div>
  );
};

export default SurveyForm;
