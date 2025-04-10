import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";
import { useNetworkVariables } from "../config/networkConfig";

const useFetchAllNfts = () => {
  const [userNfts, setUserNfts] = useState([]);
  const [NftIds, setNftIds] = useState([]);

  const { tunflowPackageId, tunflowNFTRegistryId } = useNetworkVariables(
    "tunflowPackageId",
    "tunflowNFTRegistryId"
  );

  const { data: objectData, isPending: objectPending } = useSuiClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${tunflowPackageId}::music_nft::MusicNFTMinted`,
      },
    },
    {
      select: (data) => data.data.flatMap((x) => x.parsedJson),
    }
  );

  useEffect(() => {
    if (objectData) {
      console.log(objectData);

      const allNftIds = objectData.map((nft) => nft.nft_id);
      console.log(allNftIds);
      setNftIds(allNftIds);
    }
  }, [objectData]);

  const { data: musicData, isPending: musicPending } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: NftIds,
      options: {
        showOwner: true,
        showContent: true,
      },
    },
    {
      select: (data) => data.flatMap((x) => x.data.content.fields),
    }
  );

  useEffect(() => {
    if (musicData) {
      const musicNfts = musicData;
      setUserNfts(musicNfts);
    }
  }, [musicData]);

  return {
    userNfts,
    isPending: objectPending || musicPending,
  };
};
export default useFetchAllNfts;
