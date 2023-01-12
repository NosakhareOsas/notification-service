var {google} = require("googleapis");
// Load the service account key JSON file.
var serviceAccount = require("./fcm-demo-d11b4-eaaee3eff9c6.json");
// Define the required scopes.
var scopes = [
    'https://www.googleapis.com/auth/firebase.messaging'
];

export default function handler(req, res) {
    // Authenticate a JWT client with the service account.
    var jwtClient = new google.auth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        scopes
        );
    
        // Use the JWT client to generate an access token.
        jwtClient.authorize(function(error, tokens) {
        if (error) {
            console.log("Error making request to generate access token:", error);
        } else if (tokens.access_token === null) {
            console.log("Provided service account does not have permission to generate access tokens");
        } else {
            var accessToken = tokens.access_token;
            console.log(accessToken)
            res.status(200).json({accessToken: accessToken})
        }
    });  
}
