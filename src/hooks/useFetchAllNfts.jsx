import { useSuiClient } from "@mysten/dapp-kit";
import {
    useNetworkVariables,
  } from "../config/networkConfig";


const useFetchAllNfts = () => {

  const suiClient = useSuiClient();
  const { tunflowNFTRegistryId, tunflowPackageId } = useNetworkVariables(
    "tunflowNFTRegistryId",
    "tunflowPackageId"
  );

  const fetchAllNfts = async () => {
    try {
      const response = await suiClient.call({
        package: tunflowPackageId,
        module: "music_nft",
        function: "get_all_nfts",
        arguments: [tunflowNFTRegistryId],
        typeArguments: [],
      });

      console.log("Fetched NFTs:", response);
      return response;
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      return [];
    }
  };

  return fetchAllNfts;

}; export default useFetchAllNfts
