# LinkedIn Simulation - Backend

How to run backend?
  - Navigate to backend directory in cmd
  - Install required dependencies using npm install
  - Run back end using npm start
  - Test API calls with Mocha using npm test

How can I change port, if 5000 port is occupied?
  - Open app.js file in the backend directory
  - Change '5000' to currently available port number in line 41 (let port = 5000;)
  - Also change the variable ROOT_URL in URI.js file in frontend/src/constants folder
