import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../button/Button";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Tune<span>Flow</span>{" "}
      </Link>
      <nav>
        <ul className={styles["nav-links"]}>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"discover"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"upload"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Upload Music
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"artist"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              For artist
            </NavLink>
          </li>
          {/* <li>
                <NavLink
                to={"library"}
                className={({ isActive }) => (isActive ? styles.active : "")}
                >
                Library
                </NavLink>
            </li> */}
          <Button text={"Connect Wallet"} btnClass={"primary"} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
