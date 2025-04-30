import { useState, useEffect } from 'react';
import { useSuiClientQuery } from '@mysten/dapp-kit';
import { useNetworkVariable } from '../config/networkConfig';

const useMusicNfts = () => {
  const [musicNfts, setMusicNfts] = useState([]);
  const [nftIds, setNftIds] = useState([]);
  const tunflowPackageId = useNetworkVariable("tunflowPackageId");
  
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
    if (!objectPending && objectData) {
      const allNftIds = objectData.map((nft) => nft.nft_id);
      setNftIds(allNftIds);
    }
  }, [objectData, objectPending]);

  const { data: musicData, isPending: musicPending } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: nftIds,
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
    if (!musicPending && musicData) {
      setMusicNfts(musicData);
    }
  }, [musicData, musicPending]);

  return {
    musicNfts,
    isLoading: objectPending || musicPending,
    nftIds
  };
};

export default useMusicNfts;