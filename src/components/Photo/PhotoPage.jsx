import { Photogallery } from "../Photogallery/Photogallery";
import styles from "./PhotoPage.module.css"

function importAll(r) {
  return r.keys().map((item, index) => {
    const mod = r(item);
    const src = mod?.default ?? mod;

    return {
      id: index + 1,
      src,
      title: item.replace("./", "").replace(/\.[^/.]+$/, ""),
      alt: item.replace("./", ""),
    };
  });
}

const images = importAll(
  require.context("../../images", false, /\.(png|jpe?g)$/i)
);

export default function PhotoPage() {
    return (
        <div className={styles.container}>
            <h2 className={styles.head}>Where Time Decides to Stay</h2>
            <div className={styles.text}>
                <div className={styles.block}>
                    Beyond projects and deadlines, there is space to breathe.
                    This gallery is a collection of moments that have shaped some of the best chapters of my life — quiet sunrises, wild landscapes, spontaneous adventures, and the hobbies that keep me curious.
                </div>
                <div className={styles.block}>
                    Each photograph captures a memory I didn't want to lose — a feeling, a place, a version of myself at that time. These are the moments I chose to preserve.
                </div>
                <div className={styles.block}>
                    But this is not a finished story.
                    Life keeps moving, and so will this gallery. New experiences, new perspectives, new frames will continue to appear here — because the journey is still unfolding.
                </div>
                <hr></hr>
            </div>
            <Photogallery images={images} cardWidth={260} gap={16} wheelScrollFactor={1.2} />
        </div>
    )
}