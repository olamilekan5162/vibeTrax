import { getFullnodeUrl } from "@mysten/sui/client";
import {
  DEVNET_TUNE_FLOW_PACKAGE_ID,
  DEVNET_TUNE_FLOW_NFT_REGISTRY_ID,
  DEVNET_TUNE_FLOW_SUBSCRIPTION_ID,
  DEVNET_TUNE_FLOW_TOKEN_ID,
} from "./constants.js";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        tunflowPackageId: DEVNET_TUNE_FLOW_PACKAGE_ID,
        tunflowTokenId: DEVNET_TUNE_FLOW_TOKEN_ID,
        tunflowNFTRegistryId: DEVNET_TUNE_FLOW_NFT_REGISTRY_ID,
        tunflowSubscriptionId: DEVNET_TUNE_FLOW_SUBSCRIPTION_ID,
      },
    },
    // testnet: {
    //   url: getFullnodeUrl("testnet"),
    //   variables: {
    //     counterPackageId: TESTNET_COUNTER_PACKAGE_ID,
    //   },
    // },
    // mainnet: {
    //   url: getFullnodeUrl("mainnet"),
    //   variables: {
    //     counterPackageId: MAINNET_COUNTER_PACKAGE_ID,
    //   },
    // },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
