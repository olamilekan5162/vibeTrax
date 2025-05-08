import { useSuiClient, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useNetworkVariables } from "../config/networkConfig";
import toast from "react-hot-toast";
import { Transaction } from "@mysten/sui/transactions";
import { useNavigate } from "react-router-dom";

export const useMusicUpload = () => {
  const navigate = useNavigate()
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

      // const toastId = toast.loading("Uploading music...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            await suiClient.waitForTransaction({ digest });
            toast.success("Music uploaded successfully!", { id: toastId });
            navigate("/discover")
            return true;
          },
          onError: (error) => {
            toast.error(`Upload failed: ${error.message}`, { id: toastId });
            toast.dismiss(toastId)
            return false;
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
      toast.dismiss(toastId)
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
            toast.success("Music details updated successfully!", { id: toastId });
            navigate("/discover")
            return true;
          },
          onError: (error) => {
            toast.error(`Update failed: ${error.message}`, { id: toastId });
            toast.dismiss(toastId)
            return false;
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
      toast.dismiss(toastId)
      return false;
    }
  };

  return { uploadMusic, updateMusic };
};

