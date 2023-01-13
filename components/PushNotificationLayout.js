import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

function PushNotificationLayout({ children }) {
  const router = useRouter();
  console.log("id is ", router.query.id)
  useEffect(() => {
    setToken();
    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
        console.log('Service worker registration succeeded:', registration);
      }, /*catch*/ (error) => {
        console.error(`Service worker registration failed: ${error}`);
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });

    } else {
      console.error('Service workers are not supported.');
    }


    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token && router.query.id) {
          console.log("token", token);
          fetch(`https://30f1-102-89-23-150.ngrok.io/users/${router.query.id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              "ngrok-skip-browser-warning": "69420"},
            body: JSON.stringify({
              token: token,
            }),
          }).then((res) => res.json())
            .then((data) => (console.log(data)));
            getMessage();
          }
      } catch (error) {
        console.log(error);
      }
    }
  }, [router.query.id]);

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to show it
  function getMessage() {
    const messaging = getMessaging();
    onMessage(messaging, (message) => {
      console.log("foreground message", message)
      toast(
        <div onClick={() => handleClickPushNotification(message?.data?.url)}>
          <h5>{message?.data?.title}</h5>
          <h6>{message?.data?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;