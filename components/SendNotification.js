export default function SendNotification({users, fcmAccessToken}){ 
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
                  body: e.target.body.value
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
          .then((data) => (console.log(data, "token", token, "payload", payload)));
        })
          // console.log("token here", token)   
        }
    }
    return(
        <>
            <h1>Send notifications page</h1>
            <form onSubmit={handleSubmit}>
              <label for="first">Notification Title:</label>
              <input type="text" id="title" name="title" onChange={handleChange} required/>
              <label for="last">Notification Message:</label>
              <input type="text" id="body" name="body" onChange={handleChange} required/>
              <label for="last">Notification Image:</label>
              <input type="text" id="image" name="image" onChange={handleChange} />
              <label for="last">Notification URL:</label>
              <input type="text" id="url" name="url" onChange={handleChange} required/>
              <button type="submit">Submit</button>
          </form>
        </> 
    );
}