importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDQ5Mokgjg0qCYNU-cnwtVKE47YlaAdZ40",
  authDomain: "fcm-demo-d11b4.firebaseapp.com",
  projectId: "fcm-demo-d11b4",
  storageBucket: "fcm-demo-d11b4.appspot.com",
  messagingSenderId: "631048281626",
  appId: "1:631048281626:web:0f7e0fa0d0ba3bd826fba3",
  measurementId: "G-1RG49CL8YQ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

// messaging.onBackgroundMessage(payload => {
//   console.log("background message", payload)

//   const title = payload?.data?.title
//   const options = {
//     body: payload?.data?.body,
//     icon: payload?.data?.icon,
//     url: payload?.data?.url
//   }

//   console.log("self reg", self.registration)
  

//   self.registration.showNotification(title, options)
  // self.registration.onclick = (event) => {
  //   console.log('i was clicked from bg')
  //   event.preventDefault(); // prevent the browser from focusing the Notification's tab
  //   window.open('/offers', '_blank');
    
  // }

// })