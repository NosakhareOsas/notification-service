import { useEffect } from "react";

export default function SendNotification({users, fcmAccessToken}){ 
    const filterByTokens = users?.filter(user => user.token !== null)
    const regTokens = filterByTokens?.map(user => user.token)
    
    console.log(regTokens, "length", regTokens.length)

    useEffect(() => {
      if (regTokens.length > 0){
        regTokens?.map(token => {
          const payload = {
            message: {
              token: token,
              notification: {
                title: "very New year BONUS!!!",
                body: "25% off all movies in January",
                image: "https://api.mymovies.africa/content/uploads/159523d727df74e6_port.jpg",
              },
              data: {
                  url: "/offers",
                  title: "New year BONUS!!!",
                  body: "25% off all movies in January"
              },
              webpush: {
                fcm_options: {
                  link: "/offers"
                }
              }
            }
          }
          fetch('https://fcm.googleapis.com//v1/projects/fcm-demo-d11b4/messages:send', { 
            method: 'POST', 
            headers: {
              'Authorization': 'Bearer '+ fcmAccessToken.accessToken, 
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(payload)
          }).then((res) => res.json())
          .then((data) => (console.log(data, "token", token, "payload", payload)));
        })
          // console.log("token here", token)   
        }
    }, [regTokens])
    return(
        <>
            <h1>Send notifications page</h1>
        </> 
    );
}