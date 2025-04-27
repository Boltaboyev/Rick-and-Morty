import React from 'react'

import styles from "./Card.module.css"

const Card = ({data}) => {
  return (
    <div className={styles["card-container"]}>
      <img className={styles["card-img"]} src={data?.image} alt="" />
      <div  className={styles["wrapper"]}>
        <h1  className={styles["title"]}>{data?.name}</h1>
        <p className={styles["descr"]}>{data?.status}-{data?.species}</p>
        <p className={styles["subtitle"]}> Last known location:</p>
        <p className={styles["descr"]}>{data?.location?.name}</p>
        <p className={styles["subtitle"]}>First seen in:</p>
        <p className={styles["descr"]}>{data?.origin?.name}</p>
      </div>
    </div>
  )
}

export default Card
