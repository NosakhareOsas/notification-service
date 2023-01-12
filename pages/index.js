import Login from "../components/Login";
import styles from "../styles/Home.module.css";

export default function App() {
  
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Login />
        </main>
      </div>
    </>
  );
}
