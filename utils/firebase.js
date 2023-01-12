import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    // Initialize the Firebase app with the credentials
    initializeApp({
      apiKey: "AIzaSyDQ5Mokgjg0qCYNU-cnwtVKE47YlaAdZ40",
      authDomain: "fcm-demo-d11b4.firebaseapp.com",
      projectId: "fcm-demo-d11b4",
      storageBucket: "fcm-demo-d11b4.appspot.com",
      messagingSenderId: "631048281626",
      appId: "1:631048281626:web:0f7e0fa0d0ba3bd826fba3",
      measurementId: "G-1RG49CL8YQ"
    });

    try {
      const messaging = getMessaging();
      const tokenInLocalForage = await localforage.getItem("fcm_token");

      // Return the token if it is alredy in our local storage
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }

      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        // Get new token from Firebase
        const fcm_token = getToken(messaging, {vapidKey: "BLnd8SU7nO_l5TWE5gt1YNrEyUYhNEkjBPf0Rwj0deqiZiZRco2YQl6PgezPDmlCk1j2XlfxO75NZm1MTTJcHBA"});

        // Set token in local storage
        if (fcm_token) {
          localforage.setItem("fcm_token", fcm_token);
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export { firebaseCloudMessaging };
