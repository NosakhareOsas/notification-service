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
              data: {
                title: "Igue festival BONUS!!!",
                body: "30% off all movies in January",
                url: `/offers`
              }
              // webpush: {
              //   // fcm_options: {
              //   //   link: `/offers`
              //   // },
              //   data: {
              //     title: "Igue festival BONUS!!!",
              //     body: "30% off all movies in January",
              //     url: `/offers`
              //   },
              //   // data: {
              //   //     url: `/offers`
              //   // },
              // }
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