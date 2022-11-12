import React from "react";
import { HomeInfo } from "../../Interfaces/Interfaces";
import styles from "./Info.module.css";

interface Props {
  info: HomeInfo;
}

function Info({ info }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.shareWrapper}>
        <h2 className={styles.title}>{info.title}</h2>
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              `https://enskildakiller.vercel.app/share/${info.id}`
            )
          }
          className={styles.share}
        >
          <img src={"/Images/Share.svg"} />
          <img className={styles.snap} src={"/Images/Snapchat.webp"} />
        </button>
      </div>
      {info.miniHeader !== undefined && (
        <h3 className={styles.miniheader}>{info.miniHeader}</h3>
      )}
      <img className={styles.image} src={info.imageUrl} alt={info.miniHeader} />
      {info.text !== undefined && (
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: info.text }}
        />
      )}
    </div>
  );
}

export default Info;
