import { useEffect } from "react";

export default function SendNotification({users, fcmAccessToken}){ 
    const filterByTokens = users?.filter(user => user.token !== null)
    const regTokens = filterByTokens?.map(user => user.token)
    console.log(regTokens)

    useEffect(() => {
      regTokens.map(token => {
        const payload = {
          message: {
            token: token,
            notification: {
              title: "Chinese New year BONUS!!!",
              body: "10% off all movies in January"
            },
            data: {
                url: `/offers`
            },
            webpush: {
              fcm_options: {
                link: `/offers`
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
        .then((data) => (console.log(data, "token", token)));
      }).catch((e)=>console.log(e))
        // console.log("token here", token)   
    }, [])
    return(
        <>
            <h1>Send notifications page</h1>
        </> 
    );
}