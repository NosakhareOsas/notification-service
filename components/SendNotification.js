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
              token: "eaCSV4DbgoWuS_MIunB9DP:APA91bHfSVXm4K_5XpWJFR2bzBfcO_EKnfpb2LHx3l1wRtSsD5FLEJUNsCF4j8-lv3t5ZytLeWpL8RmBErzcsZUPTBEAXh8YQ-ArYstQsb4c8daEaYqKVmHW39DtDBhH5OhBTXxAVHg2",
              notification: {
                title: "very New year BONUS!!!",
                body: "25% off all movies in January"
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