import React, { useState } from "react";
import PremiumModal from "../../modals/premium-modal/PremiumData";

import MusicCard from "../../components/cards/music-card/MusicCard";
import styles from "./MusicPlayer.module.css";
import SongDetails from "../../components/song-details/SongDetails";
import CtaComponent from "../../components/cta-section/CtaComponent";
import Contributors from "../../components/contributors/Contributors";
import PlayerControls from "../../components/player-controls/PlayerControls";
import { useOutletContext, useParams } from "react-router-dom";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import Jazzicon from "react-jazzicon";
import useMusicNfts from "../../hooks/useMusicNfts";
import { useNetworkVariables } from "../../config/networkConfig";
import { Transaction } from "@mysten/sui/transactions";
import toast from "react-hot-toast";

const MusicPlayer = () => {
  const [isPlaying, _setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { musicNfts } = useMusicNfts();
  const subscriberData = useOutletContext();

  const { _tunflowNFTRegistryId, tunflowPackageId, _tunflowTokenId } =
    useNetworkVariables(
      "tunflowNFTRegistryId",
      "tunflowPackageId",
      "tunflowTokenId"
    );

  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const { data, isPending } = useSuiClientQuery(
    "getObject",
    {
      id: id,
      options: {
        showContent: true,
        showDisplay: true,
        showOwner: true,
      },
    },
    {
      select: (data) => data.data.content,
    }
  );

  const userNfts = musicNfts.filter(
    (music) => music.artist === data?.fields?.artist && music?.id?.id !== id
  );
  const currentAccount = useCurrentAccount();

  const handleVote = async () => {
    try {
      const amountMist = BigInt(Math.floor(0.005 * 1_000_000_000)); // 2 SUI in MIST

      const tx = new Transaction();

      // Split the exact amount needed from gas
      const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);

      tx.moveCall({
        arguments: [tx.object(id), coin],
        target: `${tunflowPackageId}::music_nft::vote_for_nft`,
      });

      signAndExecute(
        {
          transaction: tx,
          options: {
            showEffects: true,
            showEvents: true,
          },
        },
        {
          onSuccess: async (result) => {
            const { digest } = result;
            const { effects, events } = await suiClient.waitForTransaction({
              digest,
              options: {
                showEffects: true,
                showEvents: true,
              },
            });

            if (effects?.status?.status === "success") {
              console.log("Vote successful!");
              console.log(events);

              toast.success("Vote recorded successfully!");
            } else {
              toast.error("Vote transaction failed");
            }
          },
          onError: (error) => {
            console.error("Vote failed:", error);
            toast.error(`Vote failed: ${error.message}`);
          },
        }
      );
    } catch (error) {
      console.error("Error in handleVote:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const forSale =
    currentAccount?.address === data?.fields.artist ||
    currentAccount?.address === data?.fields.current_owner ||
    data?.fields.for_sale === false ||
    data?.fields.collaborators.includes(currentAccount?.address);

  const isPremium =
    currentAccount?.address === data?.fields.current_owner ||
    data?.fields.collaborators.includes(currentAccount?.address) ||
    (subscriberData && subscriberData.length > 0);

  console.log(musicNfts);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {!isPending && (
          <div className={styles.playerContainer}>
            <SongDetails
              isPremium={isPremium}
              songData={data}
              isPlaying={isPlaying}
            />
            {/* <PlayerControls songData={data} /> */}
          </div>
        )}

        <div>
          <CtaComponent
            title="Upgrade to Premium Quality"
            subtitle="Experience this track in high-fidelity 320kbps audio quality.
            Support the artist and unlock premium features with a one-time purchase."
            buttonText={
              forSale
                ? "Already Sold"
                : `Purchase for ${data?.fields.price} SUI`
            }
            handleClick={() => setIsOpen(!isOpen)}
            songData={data}
            disabled={forSale}
          />
          <PremiumModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            songData={data}
          />
        </div>
        <Contributors
          contributors={data?.fields.collaborators}
          splits={data?.fields.collaborator_splits}
          roles={data?.fields.collaborator_roles}
        />

        <h2 className={styles.sectionTitle}>
          More from Artist {data?.fields?.artist.slice(0, 5)}...
          {data?.fields?.artist.slice(-5)}
        </h2>
        <div className={styles.musicGrid}>
          {userNfts.map((track) => (
            <MusicCard
              key={track.id.id}
              objectId={track.id.id}
              title={track.title}
              artist={track.artist}
              duration={track.duration}
              plays={track.plays}
              quality={
                currentAccount?.address === track?.current_owner ||
                track?.collaborators.includes(currentAccount?.address) ||
                (subscriberData && subscriberData.length > 0)
                  ? "Premium"
                  : "Standard"
              }
              imageSrc={track.music_art}
            />
          ))}
        </div>
        <button onClick={handleVote}>vote</button>
        <section className={styles.commentsSection}>
          <h2 className={styles.sectionTitle}>Comments</h2>

          <div className={styles.commentForm}>
            <div className={styles.commentInputContainer}>
              <input
                type="text"
                placeholder="Add a comment..."
                className={styles.commentInput}
              />
              <button className={styles.commentBtn}>Post</button>
            </div>
          </div>

          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <Jazzicon
                diameter={50}
                seed={Math.round(Math.random() * 10000000)}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>SynthWave92</span>
                  <span className={styles.commentTime}>2 days ago</span>
                </div>
                <p className={styles.commentText}>
                  This track is amazing! The synth work around 2:15 is
                  absolutely mind-blowing. Can't wait to hear more from Urban
                  Echoes.
                </p>
              </div>
            </div>

            <div className={styles.comment}>
              <Jazzicon
                diameter={50}
                seed={Math.round(Math.random() * 10000000)}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>BeatMaker404</span>
                  <span className={styles.commentTime}>1 day ago</span>
                </div>
                <p className={styles.commentText}>
                  The bass line in this track is fire 🔥 Any chance you could
                  share what plugin you used?
                </p>
              </div>
            </div>

            <div className={styles.comment}>
              <Jazzicon
                diameter={50}
                seed={Math.round(Math.random() * 10000000)}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>MusicCollector</span>
                  <span className={styles.commentTime}>5 hours ago</span>
                </div>
                <p className={styles.commentText}>
                  Just purchased the premium version. Totally worth it - the
                  audio quality difference is incredible! Supporting artists
                  directly feels great too.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MusicPlayer;
