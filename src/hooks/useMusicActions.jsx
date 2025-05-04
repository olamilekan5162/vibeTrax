import { useSuiClient, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useNetworkVariables } from "../config/networkConfig";
import toast from "react-hot-toast";
import { Transaction } from "@mysten/sui/transactions";

export const useMusicActions = () => {
  const { tunflowPackageId, tunflowNFTRegistryId, tunflowTokenId } =
    useNetworkVariables(
      "tunflowPackageId",
      "tunflowNFTRegistryId",
      "tunflowTokenId"
    );
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const voteForTrack = async (nftId) => {
    try {
      const amountMist = BigInt(Math.floor(0.005 * 1_000_000_000));
      const tx = new Transaction();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);

      tx.moveCall({
        arguments: [tx.object(nftId), coin],
        target: `${tunflowPackageId}::music_nft::vote_for_nft`,
      });

      const toastId = toast.loading("Processing vote...");

      signAndExecute(
        { transaction: tx, options: { showEffects: true } },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await suiClient.waitForTransaction({ digest });
            if (effects?.status?.status === "success") {
              toast.success("Vote recorded successfully!", { id: toastId });
            } else {
              toast.error("Vote transaction failed", { id: toastId });
            }
          },
          onError: (error) => {
            toast.error(`Vote failed: ${error.message}`, { id: toastId });
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

  return { toggleTrackForSale, voteForTrack, purchaseTrack, deleteTrack };
};
