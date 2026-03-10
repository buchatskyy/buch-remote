import styles from './Videogallery.module.css'

import VideoCard from './VideoCard/VideoCard'

const ctx = require.context('../../videos', true, /\.mp4$/i);

console.log('keys:', ctx.keys());

const videos = ctx.keys().map((key) => ({
  src: ctx(key),
  name: key.replace('./', ''),
}));

console.log('videos:', videos);
export default function Videogallery() {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h2>In Motion</h2>
                <div>
                    <p>Moments that couldn't stay still.Places, experiences, and passions captured as they unfolded.</p>
                    <p>Each video is a fragment of time — preserved, but not final.This collection will continue to grow, frame by frame.</p>
                </div>
            </div>
            <hr></hr>
            <div className={styles.content}>
                {videos.map((v) => (
                    <VideoCard key={v.name} src={v.src} name={v.name} />
                ))}
            </div>
        </div>

    )
}
