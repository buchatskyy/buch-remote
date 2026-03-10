import { useEffect, useRef, useState } from 'react'
import styles from './VideoCard.module.css'

import { ReactComponent as Fullscreen } from "../../../media/icons/fullscreen.svg"


export default function VideoCard({ src, name = 'Video.mp4' }) {
    const [focused, setFocused] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const videoRef = useRef(null);
    const handleEnter = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play().catch(()=>{});
        }
        setFocused(true);
    }
    const handleLeave = () => {
         if (!videoRef.current) return;
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setFocused(false);
    }
    const closeModal = (e) => {
        e.stopPropagation();
        setIsModal(false);

    }
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsModal(false)
        }
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc)
    }, []

    )
    useEffect(() => {
        if (isModal) {
            // Запрещаем скролл
            document.body.style.overflow = 'hidden';
        } else {
            // Разрешаем скролл обратно
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isModal]);
    return (
        <>
            <div className={styles.container} onTouchStart={handleEnter} onTouchEnd={handleLeave} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
                <video className={styles.video} loop muted ref={videoRef} >
                    <source src={src} type="video/mp4"></source>
                </video>
                <div onClick={() => setIsModal(true)} className={styles.iconcontainer} style={{ opacity: focused ? .5 : 0 }} >
                    <Fullscreen className={styles.focusedicon} />
                </div>
                <div className={styles.name} style={{ transform: focused ? 'translate(0,0)' : 'translate(0, 100%)' }}>
                    <p>{name}</p>
                </div>
            </div>
            {(isModal) && (
                <div onClick={closeModal} className={styles.modalOverlay}>
                    <div className={styles.exit}>Press ESC to exit</div>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
                        <video className={styles.modalVideo} autoPlay controls >
                            <source src={src} type="video/mp4"></source>
                        </video>
                    </div>
                </div>
            )
            }
        </>
    )
}