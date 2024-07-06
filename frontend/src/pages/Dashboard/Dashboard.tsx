import styles from "./Dashboard.module.scss";
import marketingBannerDetails from "../../data/marketingBannerDetails.json";

const Dashboard = () => {
  const user = {
    enrolled: true,
  };
  return (
    <div className={styles.dashboard}>
      <div
        className={styles.marketingBanner}
        style={{
          backgroundColor: user.enrolled
            ? marketingBannerDetails.enrolled.Subtitle
            : marketingBannerDetails.guest.Subtitle,
        }}
      >
        <div className={styles.content}>
          <h2>
            {user.enrolled
              ? marketingBannerDetails.enrolled.Title
              : marketingBannerDetails.guest.Title}
          </h2>
          <p>
            {user.enrolled
              ? marketingBannerDetails.enrolled.Subtitle
              : marketingBannerDetails.guest.Subtitle}
          </p>
        </div>
        <div className={styles.bannerImage}>
          <img
            src={
              user.enrolled
                ? marketingBannerDetails.enrolled.clipArt
                : marketingBannerDetails.guest.clipArt
            }
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
