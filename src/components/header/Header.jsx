import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../button/Button";
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';


const Header = () => {
  const currentAccount = useCurrentAccount()
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
              to={`profile/${currentAccount?.address}`}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Profile
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
             <ConnectButton />
          {/* <Button text={"Connect Wallet"} btnClass={"primary"}/> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
