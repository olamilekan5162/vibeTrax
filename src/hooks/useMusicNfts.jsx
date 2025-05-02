import { useState, useEffect } from "react";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../config/networkConfig";

export const useMusicNfts = () => {
  const [musicNfts, setMusicNfts] = useState([]);
  const tunflowPackageId = useNetworkVariable("tunflowPackageId");

  // Fetch all NFT mint events
  const { data, isPending, isError } = useSuiClientQuery(
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

  // Extract NFT IDs from mint events
  const nftIds = data?.map((nft) => nft.nft_id) || [];

  // Fetch NFT objects
  const { data: nftObjects } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: nftIds,
      options: {
        showOwner: true,
        showContent: true,
      },
    },
    {
      enabled: nftIds.length > 0,
      select: (data) =>
        data.map((x) => x.data?.content?.fields).filter(Boolean),
    }
  );

  useEffect(() => {
    if (!isPending && nftObjects) {
      setMusicNfts(nftObjects);
    }
  }, [nftObjects, isPending]);

  return {
    musicNfts,
    isPending,
    isError,
    nftIds,
  };
};
