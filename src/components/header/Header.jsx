import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../button/Button";
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import vibetraxLogo from "../../assets/vibetraxlogo2.png";

const Header = () => {
  const currentAccount = useCurrentAccount()
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={vibetraxLogo} alt="VibeTrax logo" />{" "}
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
          {currentAccount?.address &&
          <li>
            <NavLink
              to={`profile/${currentAccount?.address}`}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Profile
            </NavLink>
          </li>
          }
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
