import { useSuiClient, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useNetworkVariables } from "../config/networkConfig";
import toast from "react-hot-toast";
import { Transaction } from "@mysten/sui/transactions";
import { useNavigate } from "react-router-dom";

export const useMusicUpload = () => {
  const navigate = useNavigate();
  const { tunflowPackageId, tunflowNFTRegistryId } = useNetworkVariables(
    "tunflowPackageId",
    "tunflowNFTRegistryId"
  );
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const uploadMusic = async (
    toastId,
    title,
    description,
    genre,
    imageUrl,
    highQualityUrl,
    lowQualityUrl,
    price,
    collaborators,
    collaboratorRoles,
    collaboratorSplits
  ) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.object(tunflowNFTRegistryId),
          tx.pure.string(title),
          tx.pure.string(description),
          tx.pure.string(genre),
          tx.pure.string(imageUrl),
          tx.pure.string(highQualityUrl),
          tx.pure.string(lowQualityUrl),
          tx.pure.u64(Number(price)),
          tx.pure.u64(Number(collaborators[0].percentage * 100)),
          tx.pure.vector(
            "address",
            collaborators.map((c) => c.address)
          ),
          tx.pure.vector("string", collaboratorRoles),
          tx.pure.vector("u64", collaboratorSplits),
        ],
        target: `${tunflowPackageId}::music_nft::mint_music_nft`,
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            await suiClient.waitForTransaction({ digest });
            toast.dismiss(toastId);
            toast.success("Music uploaded successfully!");
            navigate("/discover");
            return true;
          },
          onError: (error) => {
            toast.dismiss(toastId);
            toast.error(`Upload failed`);
            console.error(error);

            return false;
          },
        }
      );
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An unexpected error occurred, try again");
      console.log("catch error", error);
      return false;
    }
  };

  const updateMusic = async (
    toastId,
    id,
    title,
    description,
    genre,
    imageUrl,
    highQualityUrl,
    lowQualityUrl,
    price,
    forSale,
    collaborators,
    collaboratorRoles,
    collaboratorSplits
  ) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.object(id),
          tx.pure.string(title),
          tx.pure.string(description),
          tx.pure.string(genre),
          tx.pure.string(imageUrl),
          tx.pure.string(highQualityUrl),
          tx.pure.string(lowQualityUrl),
          tx.pure.u64(Number(price)),
          tx.pure.bool(forSale),
          tx.pure.vector(
            "address",
            collaborators.map((c) => c.address)
          ),
          tx.pure.vector("string", collaboratorRoles),
          tx.pure.vector("u64", collaboratorSplits),
        ],
        target: `${tunflowPackageId}::music_nft::update_music_details`,
      });

      // const toastId = toast.loading("Updating music...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            await suiClient.waitForTransaction({ digest });
            toast.dismiss(toastId);
            toast.success("Music details updated successfully!", {
              id: toastId,
            });
            navigate("/discover");
            return true;
          },
          onError: (error) => {
            toast.dismiss(toastId);
            toast.error(`Update failed`, { id: toastId });
            console.error(error.message);
            return false;
          },
        }
      );
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An unexpected error occurred");
      console.error(error.message);
      return false;
    }
  };

  return { uploadMusic, updateMusic };
};
