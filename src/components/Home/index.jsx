import React from 'react'
import Sidebar from './sidebar'
import MainSide from './mainSide'

import styles from "./Home.module.css"
const Home = () => {
  return (
    <div className={styles["container"]}>
      <Sidebar/>
      <MainSide/>
    </div>
  )
}

export default Home
