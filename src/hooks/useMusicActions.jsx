import { useSuiClient, useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { useNetworkVariables } from "../config/networkConfig";
import toast from "react-hot-toast";
import { Transaction } from "@mysten/sui/transactions";

export const useMusicActions = () => {
  const { tunflowPackageId, tunflowNFTRegistryId, tunflowTokenId, tunflowTreasuryId, tunflowSubscriptionId } =
    useNetworkVariables(
      "tunflowPackageId",
      "tunflowNFTRegistryId",
      "tunflowTokenId",
      "tunflowTreasuryId",
      "tunflowSubscriptionId"
    );
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount()

  const voteForTrack = async (nftId, votersData) => {

    if (votersData.length > 0){
      toast.error("You already voted for this music")
      return
    }

    try {
      const amountMist = BigInt(Math.floor(0.005 * 1_000_000_000));
      const tx = new Transaction();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);

      tx.moveCall({
        arguments: [
          tx.object(nftId),
          coin,
        ],
        target: `${tunflowPackageId}::music_nft::vote_for_nft`,
      });

      const toastId = toast.loading("Processing Vote...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await suiClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("vote recorded successful!", { id: toastId });
            } else {
              toast.error("voting failed, try again", { id: toastId });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`vote failed: ${error.message}`, { id: toastId });
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const purchaseTrack = async (nftId, price) => {
    try {
      const amountMist = BigInt(Math.floor(price * 1_000_000_000));
      const tx = new Transaction();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);

      tx.moveCall({
        arguments: [
          tx.object(tunflowNFTRegistryId),
          tx.object(nftId),
          tx.object(tunflowTokenId),
          coin,
        ],
        target: `${tunflowPackageId}::tuneflow::purchase_and_reward`,
      });

      const toastId = toast.loading("Processing purchase...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await suiClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("Purchase successful!", { id: toastId });
            } else {
              toast.error("Purchase failed", { id: toastId });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`Purchase failed: ${error.message}`, { id: toastId });
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const toggleTrackForSale = async (nftId) => {
    try {
      const tx = new Transaction();
      tx.moveCall({
        arguments: [
          tx.object(nftId),
        ],
        target: `${tunflowPackageId}::music_nft::toggle_for_sale`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await suiClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("Music set for sale successfully", { id: toastId });
            } else {
              toast.error("Set music for sale failed", { id: toastId });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`Set music for sale failed: ${error.message}`, { id: toastId });
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const deleteTrack = async (nftId) => {
    try {
      const tx = new Transaction();
      tx.moveCall({
        arguments: [
          tx.object(tunflowNFTRegistryId),
          tx.object(nftId),
        ],
        target: `${tunflowPackageId}::music_nft::delete_music_nft`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await suiClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("Music deleted successfully", { id: toastId });
            } else {
              toast.error("Music deletion failed", { id: toastId });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`Music deleted successfully: ${error.message}`, { id: toastId });
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };


  const subscribe = (setSubscriptionStatus) => {
    setSubscriptionStatus("subscribing");
    const amountMist = BigInt(Math.floor(1 * 1_000_000_000));
    
    const tx = new Transaction();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);
    
    tx.moveCall({
      arguments: [
        tx.object(tunflowSubscriptionId),
        tx.object(tunflowTreasuryId),
        tx.pure.address(currentAccount?.address),
        coin,
      ],
      target: `${tunflowPackageId}::governance::subscribe`,
    });
    
    const toastId = toast.loading("Subscribing..")

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async ({ digest }) => {
          const { effects } = await suiClient.waitForTransaction({
            digest: digest,
            options: {
              showEffects: true,
            },
          });
          if (effects?.status?.status === "success") {
            setSubscriptionStatus("subscribed");
            toast.success("subscription successful!", { id: toastId })
            console.log("Subscription successful!");
            window.location.reload();
          } else {
            console.error("Subscription failed:", effects);
            toast.error("Subscription failed", { id: toastId })
            setSubscriptionStatus("failed");
          }
        },
        onError: (error) => {
          console.error("Subscription failed:", error);
          toast.error(`Subscription failed: ${error.message}`, { id: toastId });
          setSubscriptionStatus("failed");
        },
      }
    );
  };

  return { toggleTrackForSale, voteForTrack, purchaseTrack, deleteTrack, subscribe };
};
