import styles from "../styles/Send.module.css";
import { useState } from "react";
export default function SendNotification({users, fcmAccessToken}){ 
  const [modal, setModal] = useState(null)
    const filterByTokens = users?.filter(user => user.token !== null)
    const regTokens = filterByTokens?.map(user => user.token)
    
    console.log(regTokens, "length", regTokens.length)

    function handleSubmit(e){
      e.preventDefault();
      if (regTokens.length > 0){
        regTokens?.map(token => {
          const payload = {
            message: {
              token: token,
              notification: {
                title: e.target.title.value,
                body: e.target.body.value,
                image: e.target.image.value,
              },
              data: {
                  url: e.target.url.value,
                  title: e.target.title.value,
                  body: e.target.body.value,
                  image: e.target.image.value,
              },
              webpush: {
                fcm_options: {
                  link: e.target.url.value
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
          .then((data) => {
            setModal('success')
            {console.log(data, "token", token, "payload", payload)}
          })
          .catch((error) => {
            setModal('error')
            {console.log(error)}
            
          });
        })  
        }
    }
    return(
        <>
          <div className={styles.container}>
              <h1>Send Notifications </h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="first">Notification Title:</label>
                <input type="text" id="title" name="title"  required/>
                <label htmlFor="last">Notification Message:</label>
                <input type="text" id="body" name="body"  required/>
                <label htmlFor="last">Notification Image:</label>
                <input type="text" id="image" name="image" />
                <label htmlFor="last">Notification URL:</label>
                <input type="text" id="url" name="url" />
                <button type="submit">Submit</button>
            </form>
          </div>
          {
            modal === "success" ? 
            <div className={styles.success}>
              Notifications successfully sent
              <button onClick={()=>setModal(null)} className={styles.right}>
                clear 
              </button>
            </div> : null
          }
          {
            modal === "error" ? 
            <div className={styles.error}>
              Notifications not sent, try again!!!
              <button onClick={()=>setModal(null)} className={styles.right}>
                clear 
              </button>
            </div> : null
          }
        </>
    );
}