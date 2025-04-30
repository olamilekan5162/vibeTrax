import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Profile.module.css'
import Button from '../../components/button/Button';
import Jazzicon from 'react-jazzicon';
import useMusicNfts from '../../hooks/useMusicNfts';
import MusicCard from '../../components/cards/music-card/MusicCard';

const Profile = () => {

    const { address } = useParams();
    const { musicNfts } = useMusicNfts()
    const navigate = useNavigate()

    const userNfts = musicNfts.filter((music) => music.artist === address);
    const ownedNfts = musicNfts.filter((music) => music.owner === address);


    return ( 
        // Main Content
    <main className={styles["main-content"]}>
        {/* <Dashboard Header */}
        <div className={styles["dashboard-header"]}>
            <div className={styles["artist-avatar"]}>
                <Jazzicon  diameter={100} seed={address}/>
            </div>
            <div className={styles["artist-info"]}>
                <h1>{`${address.slice(0,5)}...${address.slice(0,5)}`}</h1>
                <p>Tuneflow user</p>
                <div className={styles["artist-stats"]}>
                    <div className={styles["stat"]}>
                        <span className={styles["stat-value"]}>{userNfts.length}</span>
                        <span className={styles["stat-label"]}>Tracks</span>
                    </div>
                    {/* <div className={styles["stat"]}>
                        <span className={styles["stat-value"]}>8.7K</span>
                        <span className={styles["stat-label"]}>Followers</span>
                    </div> */}
                    <div className={styles["stat"]}>
                        <span className={styles["stat-value"]}>245K</span>
                        <span className={styles["stat-label"]}>Total Plays</span>
                    </div>
                    <div className={styles["stat"]}>
                        <span className={styles["stat-value"]}>3.8 SUI</span>
                        <span className={styles["stat-label"]}>Earnings</span>
                    </div>
                </div>
            </div>
        </div>
        
        {/* <Dashboard Grid */}
        <div className={styles["dashboard-grid"]}>
            {/* Streams Overview */}
            <div className={styles["dashboard-card"]}>
                <div className={styles["card-header"]}>
                    <h3 className={styles["card-title"]}>Streams Overview</h3>
                    <a href="#" className={styles["card-action"]}>Last 30 days</a>
                </div>
                <div className={styles["chart-container"]}>
                    <div className={styles["bar-chart"]}>
                        <div className={styles["bar"]} style={{height: "40%"}} data-value="Mon"></div>
                        <div className={styles["bar"]} style={{height: "60%"}} data-value="Tue"></div>
                        <div className={styles["bar"]} style={{height: "45%"}} data-value="Wed"></div>
                        <div className={styles["bar"]} style={{height: "75%"}} data-value="Thu"></div>
                        <div className={styles["bar"]} style={{height: "90%"}} data-value="Fri"></div>
                        <div className={styles["bar"]} style={{height: "65%"}} data-value="Sat"></div>
                        <div className={styles["bar"]} style={{height: "55%"}} data-value="Sun"></div>
                    </div>
                </div>
                <div className={styles["card-stats"]}>
                    <div className={styles["stat"]}>
                        <span className={styles["stat-value"]}>12.5K</span>
                        <span className={styles["stat-label"]}>Total Streams</span>
                    </div>
                </div>
            </div>
            
            {/* <Recent Earnings */}
            <div className={styles["dashboard-card"]}>
                <div className={styles["card-header"]}>
                    <h3 className={styles["card-title"]}>Recent Earnings</h3>
                    <a href="#" className={styles["card-action"]}>View All</a>
                </div>
                <div className={styles["transaction-list"]}>
                    <div className={styles["transaction-item"]}>
                        <div className={styles["transaction-info"]}>
                            <div className={styles["transaction-icon"]}>$</div>
                            <div className={styles["transaction-details"]}>
                                <h4>High-Quality Purchase</h4>
                                <p>by User029 • 2 hours ago</p>
                            </div>
                        </div>
                        <div className={`${styles["transaction-amount"]} ${styles["amount-positive"]}`}>+0.25 SUI</div>
                    </div>
                    <div className={styles["transaction-item"]}>
                        <div className={styles["transaction-info"]}>
                            <div className={styles["transaction-icon"]}>$</div>
                            <div className={styles["transaction-details"]}>
                                <h4>Stream Royalties</h4>
                                <p>Weekly Payout • Yesterday</p>
                            </div>
                        </div>
                        <div className={`${styles["transaction-amount"]} ${styles["amount-positive"]}`}>+0.18 SUI</div>
                    </div>
                    <div className={styles["transaction-item"]}>
                        <div className={styles["transaction-info"]}>
                            <div className={styles["transaction-icon"]}>$</div>
                            <div className={styles["transaction-details"]}>
                                <h4>High-Quality Purchase</h4>
                                <p>by User125 • 3 days ago</p>
                            </div>
                        </div>
                        <div className={`${styles["transaction-amount"]} ${styles["amount-positive"]}`}>+0.25 SUI</div>
                    </div>
                </div>
            </div>
            
            {/* Upload New Track */}
            <div className={styles["dashboard-card"]}>
                <div className={styles["upload-container"]}>
                    <div className={styles["upload-icon"]}>↑</div>
                    <h3 className={styles["card-title"]}>Upload New Track</h3>
                    <p className={styles["upload-text"]}>Share your music with the world and earn royalties from every stream and purchase.</p>
                    <Button btnClass='primary' text={'upload Music'} onClick={() => navigate("/upload")}/>
                </div>
            </div>
        </div>
        
        {/* your Tracks */}
        <h2 className={styles["section-title"]}>My Tracks</h2>
        <div className={styles["dashboard-music-grid"]}>
            {userNfts.map((track) =>(
                <MusicCard
                key={track.id.id}
                objectId={track.id.id}
                title={track.title}
                artist={track.artist}
                duration={track.duration}
                plays={track.plays}
                quality={"Premium"}
                imageSrc={track.music_art}
                />
            
            ))}
        </div>

        {/* owned Tracks */}
        <h2 className={styles["section-title"]}>Owned Tracks</h2>
        {ownedNfts.length>0 ?
            <div className={styles["dashboard-music-grid"]}>
                {ownedNfts.map((track) =>(
                    <MusicCard
                    key={track.id.id}
                    objectId={track.id.id}
                    title={track.title}
                    artist={track.artist}
                    duration={track.duration}
                    plays={track.plays}
                    quality={"Premium"}
                    imageSrc={track.music_art}
                    />
                
                ))}
            </div>

            : <p>You do not own any track</p> 
        }

        {/* Recent Tracks */}
        <h2 className={styles["section-title"]}>Your Recent Tracks</h2>
        <div className={styles["dashboard-card"]}>
            <ul className={styles["track-list"]}>
                {userNfts.map((track) =>(
                
                    <li key={track?.id?.id} className={styles["track-item"]}>
                        <span className={styles["track-number"]}>1</span>
                        <img src={track.music_art} alt="Track Artwork" className={styles["track-artwork"]} />
                        <div className={styles["track-info"]}>
                            <h4 className={styles["track-title"]}>{track?.title}</h4>
                            <div className={styles["track-meta"]}>
                                <span>3:45</span>
                                <span>2 weeks ago</span>
                                <span>{track.genre}</span>
                            </div>
                        </div>
                        <div className={styles["track-stats"]}>
                            <span>5.2K plays</span>
                            <span>320 purchases</span>
                        </div>
                        <div className={styles["track-actions"]}>
                            <Button btnClass='primary' text={'Manage'}/>
                        </div>
                    </li>
                
                ))}
            </ul>
        </div>
        
        {/* Royalty Distribution */}
        <h2 className={styles["section-title"]}>Royalty Distribution</h2>
        <div className={styles["dashboard-grid"]}>
            {
                userNfts.map((track) => (
                <div key={track?.id?.id} className={styles["dashboard-card"]}>
                    <div className={styles["card-header"]}>
                        <h3 className={styles["card-title"]}>{track?.title}</h3>
                        <a href="#" className={styles["card-action"]}>Edit</a>
                    </div>
                    <div className={styles["royalty-list"]}>
                        {
                            track.collaborators.map((c, index) =>(
                                <div key={index} className={styles["royalty-item"]}>
                                    <div className={styles["royalty-icon"]}>
                                        <Jazzicon diameter={25} seed={c}/>
                                    </div>
                                    <div className={styles["royalty-details"]}>
                                        <div className={styles["royalty-role"]}>{c.role || 'NA'}</div>
                                        <Link className={styles["royalty-recipient"]} to={`/profile/${c}`} >{`${c.slice(0,5)}...${c.slice(-5)}`}</Link>
                                    </div>
                                    <div className={styles["royalty-amount"]}>{track.collaborator_splits[index]/100}%</div>
                                </div>
                            ))

                        }
                    </div>
                </div>
                ))
            }
        </div>
    </main>
     );
}
 
export default Profile;