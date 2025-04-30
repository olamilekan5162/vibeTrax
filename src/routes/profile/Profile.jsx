import { Link, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css'
import Button from '../../components/button/Button';
import { useSuiClientQuery, useCurrentAccount } from '@mysten/dapp-kit';
import Jazzicon from 'react-jazzicon';
import { useNetworkVariable } from '../../config/networkConfig';
import { useEffect, useState } from 'react';
const Profile = () => {
    const [userNfts, setUserNfts] = useState([]);
    const [NftIds, setNftIds] = useState([]);
    const navigate = useNavigate()
    const currentAccount = useCurrentAccount()
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
        if (objectPending) {
        console.log("pending");
        } else if (objectData) {
        const allNftIds = objectData.map((nft) => nft.nft_id);
        setNftIds(allNftIds);
        }
    }, [objectData, objectPending]);

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
        if (musicPending) {
        console.log("Pending");
        } else if (musicData) {
        const musicNfts = musicData.filter((music) => music.artist === currentAccount.address);
        setUserNfts(musicNfts);
        }
    }, [musicData, musicPending]);


    return ( 
        // Main Content
    <main className={styles["main-content"]}>
        {/* <Dashboard Header */}
        <div className={styles["dashboard-header"]}>
            <div className={styles["artist-avatar"]}>
                <Jazzicon  diameter={100} seed={currentAccount?.address}/>
            </div>
            <div className={styles["artist-info"]}>
                <h1>{currentAccount?.address}</h1>
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
        
        {/* Recent Tracks */}
        <h2 className={styles["section-title"]}>Your Recent Tracks</h2>
        <div className={styles["dashboard-card"]}>
            <ul className={styles["track-list"]}>
                
                <li className={styles["track-item"]}>
                    <span className={styles["track-number"]}>1</span>
                    <img src="https://picsum.photos/seed/track2/200/200" alt="Track Artwork" className={styles["track-artwork"]} />
                    <div className={styles["track-info"]}>
                        <h4 className={styles["track-title"]}>Summer Rain</h4>
                        <div className={styles["track-meta"]}>
                            <span>3:45</span>
                            <span>2 weeks ago</span>
                            <span>Pop</span>
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
                {/* <li className={styles["track-item"]}>
                    <span className={styles["track-number"]}>2</span>
                    <img src="https://picsum.photos/seed/track3/200/200" alt="Track Artwork" className={styles["track-artwork"]} />
                    <div className={styles["track-info"]}>
                        <h4 className={styles["track-title"]}>Midnight Dreams</h4>
                        <div className={styles["track-meta"]}>
                            <span>4:12</span>
                            <span>1 month ago</span>
                            <span>R&B</span>
                        </div>
                    </div>
                    <div className={styles["track-stats"]}>
                        <span>3.8K plays</span>
                        <span>215 purchases</span>
                    </div>
                    <div className={styles["track-actions"]}>
                        <Button btnClass='primary' text={'Manage'}/>    
                    </div>
                </li> */}
                {/* <li className={styles["track-item"]}>
                    <span className={styles["track-number"]}>3</span>
                    <img src="https://picsum.photos/seed/track1/200/200" alt="Track Artwork" className={styles["track-artwork"]} />
                    <div className={styles["track-info"]}>
                        <h4 className={styles["track-title"]}>Urban Echoes</h4>
                        <div className={styles["track-meta"]}>
                            <span>3:28</span>
                            <span>2 months ago</span>
                            <span>Hip Hop</span>
                        </div>
                    </div>
                    <div className={styles["track-stats"]}>
                        <span>6.1K plays</span>
                        <span>405 purchases</span>
                    </div>
                    <div className={styles["track-actions"]}>
                        <Button btnClass='primary' text={'Manage'}/>
                    </div>
                </li> */}
            </ul>
        </div>
        
        {/* Royalty Distribution */}
        <h2 className={styles["section-title"]}>Royalty Distribution</h2>
        <div className={styles["dashboard-grid"]}>
            <div className={styles["dashboard-card"]}>
                <div className={styles["card-header"]}>
                    <h3 className={styles["card-title"]}>Summer Rain</h3>
                    <a href="#" className={styles["card-action"]}>Edit</a>
                </div>
                <div className={styles["royalty-list"]}>
                    <div className={styles["royalty-item"]}>
                        <div className={styles["royalty-icon"]}>A</div>
                        <div className={styles["royalty-details"]}>
                            <div className={styles["royalty-role"]}>Artist (You)</div>
                            <div className={styles["royalty-recipient"]}>David Okafor</div>
                        </div>
                        <div className={styles["royalty-amount"]}>65%</div>
                    </div>
                    <div className={styles["royalty-item"]}>
                        <div className={styles["royalty-icon"]}>P</div>
                        <div className={styles["royalty-details"]}>
                            <div className={styles["royalty-role"]}>Producer</div>
                            <div className={styles["royalty-recipient"]}>Michael Johnson</div>
                        </div>
                        <div className={styles["royalty-amount"]}>20%</div>
                    </div>
                    <div className={styles["royalty-item"]}>
                        <div className={styles["royalty-icon"]}>W</div>
                        <div className={styles["royalty-details"]}>
                            <div className={styles["royalty-role"]}>Writer</div>
                            <div className={styles["royalty-recipient"]}>Sarah Williams</div>
                        </div>
                        <div className={styles["royalty-amount"]}>10%</div>
                    </div>
                    <div className={styles["royalty-item"]}>
                        <div className={styles["royalty-icon"]}>M</div>
                        <div className={styles["royalty-details"]}>
                            <div className={styles["royalty-role"]}>Marketing</div>
                            <div className={styles["royalty-recipient"]}>PromoTeam</div>
                        </div>
                        <div className={styles["royalty-amount"]}>5%</div>
                    </div>
                </div>
            </div>
            
            <div className={styles["dashboard-card"]}>
                <div className={styles["card-header"]}>
                    <h3 className={styles["card-title"]}>Midnight Dreams</h3>
                    <a href="#" className={styles["card-action"]}>Edit</a>
                </div>
                <div className={styles["royalty-list"]}>
                    <div className={styles["royalty-item"]}>
                        <div className={styles["royalty-icon"]}>A</div>
                        <div className={styles["royalty-details"]}>
                            <div className={styles["royalty-role"]}>Artist (You)</div>
                            <div className={styles["royalty-recipient"]}>David Okafor</div>
                        </div>
                        <div className={styles["royalty-amount"]}>60%</div>
                    </div>
                    <div className={styles["royalty-item"]}>
                        <div className={styles["royalty-icon"]}>P</div>
                        <div className={styles["royalty-details"]}>
                            <div className={styles["royalty-role"]}>Producer</div>
                            <div className={styles["royalty-recipient"]}>Beat Masters</div>
                        </div>
                        <div className={styles["royalty-amount"]}>25%</div>
                    </div>
                    <div className={styles["royalty-item"]}>
                        <div className={styles["royalty-icon"]}>W</div>
                        <div className={styles["royalty-details"]}>
                            <div className={styles["royalty-role"]}>Writer</div>
                            <div className={styles["royalty-recipient"]}>Jessica Lee</div>
                        </div>
                        <div className={styles["royalty-amount"]}>15%</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
     );
}
 
export default Profile;