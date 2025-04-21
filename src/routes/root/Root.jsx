import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./Root.module.css";
import Footer from "../../components/footer/Footer";
import MusicPlayer from "../music-player/MusicPlayer";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../../config/networkConfig";
import { useEffect } from "react";

const Root = () => {

  const currentAccount = useCurrentAccount()

  const tunflowPackageId = useNetworkVariable(
    "tunflowPackageId"
  );

  const { data} = useSuiClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${tunflowPackageId}::governance::SubscriptionPurchased`,
      },
    },
    {
      select: (data) => data.data.flatMap((x) => x.parsedJson).filter((y) => y.user === currentAccount.address),
    }
  )

  useEffect(() => {
    console.log(data);
    
  },[data])


  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
