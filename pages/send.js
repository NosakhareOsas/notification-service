import SendNotification from "../components/SendNotification";
import PushNotificationLayout from "../components/PushNotificationLayout";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('')
  useEffect(()=>{
    fetch("https://30f1-102-89-23-150.ngrok.io/users", {
        method: 'GET',
        headers: {
          "ngrok-skip-browser-warning": "69420"
        },})
        .then(res => res.json())
        .then(data => setUsers(data))

    fetch("api/generateAccessToken")
    .then(res => res.json())
    .then(data => setToken(data))
  }, [])
  return (
    <>
        {users && token ? <SendNotification users={users} fcmAccessToken={token}/> : <h2>Boss wait a little, please</h2>}
    </>
    
  );
}