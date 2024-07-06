import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const user = {
    enrolled: false
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.marketingBanner}>
        <div className={styles.content}>

        </div>
        <div className={styles.bannerImage}>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard
