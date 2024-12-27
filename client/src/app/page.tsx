import styles from "./page.module.css";
import Bot from "@/pages/Bot";

export default function Home() {
  return (
    <div className={styles.page}>
      <Bot/>
    </div>
  );
}
