import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import styles from "./MusicPlayer.module.css";
import { LoadingState } from "../../components/state/LoadingState";
import { ErrorState } from "../../components/state/ErrorState";
import SongDetails from "../../components/song-details/SongDetails";
import { useMusicActions } from "../../hooks/useMusicActions";
import PremiumModal from "../../modals/premium-modal/PremiumModal";
import CtaComponent from "../../components/cta-section/CtaComponent";
import Contributors from "../../components/contributors/Contributors";
import { useMusicNfts } from "../../hooks/useMusicNfts";
import { EmptyState } from "../../components/state/EmptyState";
import MusicCard from "../../components/cards/music-card/MusicCard";
import { useNetworkVariable } from "../../config/networkConfig";

const MusicPlayer = () => {
  const { id } = useParams();
  const subscriberData = useOutletContext();
  const currentAccount = useCurrentAccount();
  const { voteForTrack, purchaseTrack} = useMusicActions();
  const tunflowPackageId = useNetworkVariable("tunflowPackageId")

  const { data: votersData } = useSuiClientQuery(
    "queryEvents", {
      query: {
        MoveEventType: `${tunflowPackageId}::music_nft::NFTVoted`,
      }
    },
    {
      select: (data) =>
        data.data
          .flatMap((x) => x.parsedJson)
          .filter((y) => y.voter === currentAccount.address),
    }
  )


  const {
    musicNfts,
    isPending: artistMusicPending,
    isError: artistMusicError,
  } = useMusicNfts();

  const {
    data: songData,
    isPending,
    isError,
  } = useSuiClientQuery(
    "getObject",
    { id, options: { showContent: true } },
    { select: (data) => data.data?.content }
  );

  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  const artistMusics = musicNfts.filter(
    (music) => music.artist === songData?.fields?.artist && music?.id?.id !== id
  );

  const forSale =
    currentAccount?.address === songData?.fields.artist ||
    currentAccount?.address === songData?.fields.current_owner ||
    songData?.fields.for_sale === false ||
    songData?.fields.collaborators.includes(currentAccount?.address);

  const isPremium =
    currentAccount?.address === songData?.fields.current_owner ||
    songData?.fields.collaborators.includes(currentAccount?.address) ||
    (subscriberData && subscriberData.length > 0);

  if (isPending) return <LoadingState />;
  if (isError || !songData) return <ErrorState />;

  return (
    <main className={styles.mainContent}>
      <SongDetails
        isPremium={isPremium}
        songData={songData}
        handleVote={() => voteForTrack(id, votersData)}
      />

      <div>
        <CtaComponent
          title="Upgrade to Premium Quality"
          subtitle="Experience this track in high-fidelity 320kbps audio quality."
          buttonText={
            forSale
              ? "Already Sold"
              : `Purchase for ${songData?.fields.price} SUI`
          }
          handleClick={() => setIsOpen(true)}
          disabled={forSale}
        />

        <PremiumModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          songData={songData}
          onPurchase={() => purchaseTrack(id, songData?.fields.price)}
        />
      </div>

      <Contributors
        contributors={songData?.fields.collaborators}
        splits={songData?.fields.collaborator_splits}
        roles={songData?.fields.collaborator_roles}
      />

      <div>
        <h2 className={styles.sectionTitle}>
          More from Artist {songData?.fields?.artist.slice(0, 5)}...
        </h2>
        {artistMusicPending && <LoadingState />}
        {artistMusicError && <ErrorState />}
        {artistMusics.length === 0 && (
          <EmptyState message="Artist has no other music" />
        )}
        <div className={styles.row}>
          {artistMusics.map((track) => (
            <MusicCard
              key={track.id.id}
              track={track}
              quality={
                currentAccount?.address === track?.current_owner ||
                track?.collaborators.includes(currentAccount?.address) ||
                (subscriberData && subscriberData.length > 0)
                  ? "Premium"
                  : "Standard"
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.commentsSection}>
        <h2 className={styles.sectionTitle}>Comments</h2>
        <div className={styles.commentForm}>
          <div className={styles.commentInputContainer}>
            <input
              type="text"
              placeholder="Add a comment..."
              className={styles.commentInput}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className={styles.commentBtn}>
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MusicPlayer;
