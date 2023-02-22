const express = require('express');
const server = express();
const port = 3001;

const { Client } = require('@microsoft/microsoft-graph-client');

const tenantId = '0b89a483-a887-4394-8e1e-faa49583a1c1';
const clientId = 'e08ab7e6-7f0e-4791-805b-27ab93542005';
const clientSecret = '3a912b39-db2d-429b-9623-0d355a38fddf';
const username = 'kartiksalyan@gmail.com';
const password = 'Computer.comg';

// Create a new user in Azure AD
async function createUser() {
  const client = Client.init({
    authProvider: async (done) => {
      // Get an access token for the Microsoft Graph API
      const { accessToken } = await clientCredentials.getAccessToken();
      done(null, accessToken);
    },
  });

  try {
    await client.api(`/users`)
      .post({
        accountEnabled: true,
        displayName: 'New Azure User',
        mailNickname: 'newuser',
        userPrincipalName: username,
        passwordProfile: {
          password,
          forceChangePasswordNextSignIn: true,
        },
      });
    console.log(`User ${username} created successfully`);
  } catch (error) {
    console.error(`Error creating user: ${error}`);
  }
}

createUser();

const pm2 = require('pm2');

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  
  pm2.list(function(err, processes) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    
    // Find the process with the desired name
    const targetProcess = processes.find(p => p.name === 'gulpfile');
    
    // Use the process object to manage the process on the remote machine
    // For example, you could call targetProcess.restart() to restart the process
    
    pm2.disconnect(); // Disconnect from the remote machine's PM2 instance
  });
});



// const { exec } = require('child_process');
//  // Replace 'newuser' and 'newpassword' with the desired username and password
// const username = 'newuser';const password = 'newpassword'; 
// // Add a new user to the local machine
// exec(`net user ${username} ${password} /add`, (error, stdout, stderr) => { 
//      if (error) { 
        
//          console.error(`Error adding user: ${error}`);  
//          return; 
//           }
          
//          console.log(`User ${username} added successfully`);
//         });


server.listen(port, () => {
  console.log(`Listening on ${port}`);
});