import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { ReactComponent as Logout } from "../../media/icons/logout.svg";
import { ReactComponent as Icon } from "../../media/icons/user.svg";
import { ReactComponent as Logo } from "../../media/logov2.svg";
import { ReactComponent as Login } from "../../media/icons/login.svg";

import styles from "./Header.module.css";
import useAuth from "../../hooks/useAuth";
import useLoginCard from "../../hooks/useLoginCard";

const setActive = ({ isActive }) => (isActive ? styles.active : "");

export default function Header() {
  const { user, logout } = useAuth();
  const { openLoginCard } = useLoginCard();
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const timerRef = useRef(null);

  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const startPress = (e) => {
    e.preventDefault();
    timerRef.current = setTimeout(handleDoubleClick, 1000);
  }
  const endPress = () => {
    clearTimeout(timerRef.current);
  }

  const handleDoubleClick = () => {
    const el = logoRef.current;
    if (!el) return;

    el.classList.remove(styles.animated);
    void el.offsetWidth;
    el.classList.add(styles.animated);
  };

  const handleAnimationEnd = () => {
    logoRef.current?.classList.remove(styles.animated);
  };

  const handleLogout = async () => {
    try {
      setIsUserCardOpen(false);
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    openLoginCard();
  };

  const handleUserCardToggle = () => {
    setIsUserCardOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsUserCardOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        ref={logoRef}
        style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onDoubleClick={handleDoubleClick}
        onAnimationEnd={handleAnimationEnd}
        className={styles.logoContainer}
      >
        <Logo className={styles.logo} />
      </div>

      <div className={styles.nav}>
        <NavLink className={setActive} to="/" end>
          Home
        </NavLink>
      </div>

      <div className={styles.nav}>
        <NavLink className={setActive} to="/weather">
          Weather
        </NavLink>
      </div>

      <div className={styles.nav}>
        <NavLink className={setActive} to="/landing">
          Landing
        </NavLink>
      </div>

      <div className={styles.nav}>
        <NavLink className={setActive} to="/cv">
          CV
        </NavLink>
      </div>

      <div className={styles.nav}>
        <NavLink className={setActive} to="/contacts">
          Contacts
        </NavLink>
      </div>

      <div className={styles.userContainer}>
        {user ? (
          <>
            <div className={styles.userWrapper}>
              <div
                ref={userButtonRef}
                onClick={handleUserCardToggle}
                className={styles.userBlock}
              >
                <div className="user">
                  {user?.photoURL ? <img
                    src={user.photoURL}
                    alt="avatar"
                    className={styles.icon}
                    referrerPolicy="no-referrer"
                  />

                    : <Icon className={styles.icon} />}

                </div>
                <div className={styles.text}>{user?.displayName}</div>
              </div>

              {isUserCardOpen && (
                <div ref={userMenuRef} className={styles.userCard}>
                  <div className={styles.userCardHeader}>
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className={styles.avatar}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {user?.displayName?.[0] || "U"}
                      </div>
                    )}
                  </div>

                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{user?.displayName}</div>
                    <div className={styles.userEmail}>{user?.email}</div>
                    <div style={{cursor: 'pointer'}} onClick={handleLogout} >
                      <div className="user">
                        <Logout className={styles.logout} />
                      </div>
                      <div className={styles.text}>Logout</div>
                    </div>


                  </div>
                </div>
              )}
            </div>


          </>
        ) : (
          <div
            onClick={handleLogin}
            className={`${styles.userBlock} ${styles.userBlockLogin}`}
          >
            <div className="user">
              <Login className={styles.icon} />
            </div>
            <div className={styles.text}>Login</div>
          </div>
        )}
      </div>
    </div>
  );
}