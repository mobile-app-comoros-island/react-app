const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors()); // Enable CORS for all routes
// In-memory survey data
surveyData = {
  title: 'Feedback Survey',
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'radiogroup',
          name: 'rating',
          title: 'Rate your experience:',
          choices: ['Excellent', 'Good', 'Average', 'Poor'],
          isRequired: true,
        },
        {
          type: 'comment',
          name: 'comments',
          title: 'Additional Comments:',
        },
      ],
    },
  ],
};

// API endpoint to fetch survey data
app.get('/api/surveyData', (req, res) => {
  res.json(surveyData);
});
app.post('/api/submitSurvey', (req, res) => {
    const submittedData = req.body;
    // print the submitted data to the console
    console.log(submittedData);
    // if the submitted data is not undefined, save it to the database
    if (submittedData !== undefined) {
      surveyData = submittedData;
    }
  
    res.sendStatus(200);
  });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
