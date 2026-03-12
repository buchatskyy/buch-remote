import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { ReactComponent as Logout } from "../../media/icons/logout.svg";
import { ReactComponent as Icon } from "../../media/icons/user.svg";
import { ReactComponent as Logo } from "../../media/logov2.svg";
import { ReactComponent as Login } from "../../media/icons/login.svg";

import styles from "./Header.module.css";
import useAuth from "../../hooks/useAuth";
import useLoginCard from "../../hooks/useLoginCard";

const setActive = ({ isActive }) => (isActive ? styles.active : "");
const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/weather", label: "Weather" },
  { to: "/landing", label: "Landing" },
  { to: "/cv", label: "CV" },
  { to: "/contacts", label: "Contacts" },
];

export default function Header({ isSidebarOpen, onSidebarToggle }) {
  const { user, logout } = useAuth();
  const { openLoginCard } = useLoginCard();
  const navigate = useNavigate();
  const location = useLocation();
  const logoRef = useRef(null);
  const timerRef = useRef(null);

  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileNavButtonRef = useRef(null);
  const desktopLogoRef = useRef(null);
  const mobileLogoRef = useRef(null);

  const activeNavItem = navItems.find(({ to, end }) =>
    end ? location.pathname === to : location.pathname.startsWith(to)
  ) || navItems[0];

  const startPress = (e) => {
    e.preventDefault();
    timerRef.current = setTimeout(() => {
      const targetRef = window.innerWidth <= 768 ? mobileLogoRef : desktopLogoRef;
      handleDoubleClick(targetRef);
    }, 1000);
  };

  const endPress = () => {
    clearTimeout(timerRef.current);
  };

  const handleDoubleClick = (targetRef = desktopLogoRef) => {
    const el = targetRef.current;
    if (!el) return;

    el.classList.remove(styles.animated);
    void el.offsetWidth;
    el.classList.add(styles.animated);
  };

  const handleAnimationEnd = () => {
    desktopLogoRef.current?.classList.remove(styles.animated);
    mobileLogoRef.current?.classList.remove(styles.animated);
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

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const handleMobileNavClose = () => {
    setIsMobileNavOpen(false);
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

      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        mobileNavButtonRef.current &&
        !mobileNavButtonRef.current.contains(event.target)
      ) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsUserCardOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.desktopHeader}>
        <div
          ref={desktopLogoRef}
          style={{ WebkitUserSelect: "none", userSelect: "none" }}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          onDoubleClick={() => handleDoubleClick(desktopLogoRef)}
          onAnimationEnd={handleAnimationEnd}
          className={styles.logoContainer}
        >
          <Logo className={styles.logo} />
        </div>

        {navItems.map(({ to, label, end }) => (
          <div key={to} className={styles.nav}>
            <NavLink className={setActive} to={to} end={end}>
              {label}
            </NavLink>
          </div>
        ))}

        <div className={styles.userContainer}>
          {user ? (
            <div className={styles.userWrapper}>
              <button
                type="button"
                ref={userButtonRef}
                onClick={handleUserCardToggle}
                className={`${styles.userBlock} ${styles.userButton}`}
              >
                <div className="user">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className={styles.icon}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Icon className={styles.icon} />
                  )}
                </div>
                <div className={styles.text}>{user?.displayName}</div>
              </button>

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
                    <button
                      type="button"
                      className={styles.userCardAction}
                      onClick={handleLogout}
                    >
                      <div className="user">
                        <Logout className={styles.logout} />
                      </div>
                      <div className={styles.text}>Logout</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className={`${styles.userBlock} ${styles.userBlockLogin} ${styles.userButton}`}
            >
              <div className="user">
                <Login className={styles.icon} />
              </div>
              <div className={styles.text}>Login</div>
            </button>
          )}
        </div>
      </div>

      <div className={styles.mobileHeader}>
        <button
          type="button"
          className={`${styles.iconButton} ${isSidebarOpen ? styles.iconButtonActive : ""}`}
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
          aria-expanded={isSidebarOpen}
        >
          <span className={styles.burgerIcon} aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div
          ref={mobileLogoRef}
          style={{ WebkitUserSelect: "none", userSelect: "none" }}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          onDoubleClick={() => handleDoubleClick(mobileLogoRef)}
          onAnimationEnd={handleAnimationEnd}
          className={`${styles.logoContainer} ${styles.mobileLogoContainer}`}
        >
          <Logo className={styles.logo} />
        </div>

        <div className={styles.mobileNavWrap}>
          <button
            ref={mobileNavButtonRef}
            type="button"
            className={`${styles.mobileNavButton} ${isMobileNavOpen ? styles.mobileNavButtonActive : ""}`}
            onClick={handleMobileNavToggle}
            aria-label="Open header navigation"
            aria-expanded={isMobileNavOpen}
          >
            <span className={styles.burgerIcon} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className={styles.mobileActiveLabel}>{activeNavItem.label}</span>
          </button>

          {isMobileNavOpen && (
            <div ref={mobileNavRef} className={styles.mobileNavMenu}>
              {navItems.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  className={({ isActive }) =>
                    `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`
                  }
                  to={to}
                  end={end}
                  onClick={handleMobileNavClose}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className={styles.userContainer}>
          {user ? (
            <>
              <div className={styles.userWrapper}>
                <button
                  type="button"
                  ref={userButtonRef}
                  onClick={handleUserCardToggle}
                  className={`${styles.userBlock} ${styles.userButton}`}
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
                </button>

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
                      <button
                        type="button"
                        className={styles.userCardAction}
                        onClick={handleLogout}
                      >
                        <div className="user">
                          <Logout className={styles.logout} />
                        </div>
                        <div className={styles.text}>Logout</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className={`${styles.userBlock} ${styles.userBlockLogin} ${styles.userButton}`}
            >
              <div className="user">
                <Login className={styles.icon} />
              </div>
              <div className={styles.text}>Login</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
