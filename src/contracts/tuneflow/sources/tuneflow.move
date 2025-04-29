#[allow(unused_variable, unused_const, unused_use, duplicate_alias)]
module tuneflow::tuneflow;
use tuneflow::music_nft::{Self, MusicNFT, NFTRegistry};
use tuneflow::governance::{Self, TuneFlowToken, Subscription, Treasury, Proposal};
use sui::tx_context::{Self, TxContext};
use sui::coin::{Self, Coin};
use sui::sui::SUI;
use sui::object::{Self, ID};
use sui::event::emit;
use std::option::{Self, Option};
use std::string::{Self, String};
use std::vector;

// Error constants
const ENOT_SUBSCRIBED: u64 = 100;
const EINVALID_LIMIT: u64 = 101;

// Events for integrated actions
public struct IntegratedPurchase has copy, drop {
    nft_id: ID,
    buyer: address,
    amount_paid: u64,
    tokens_rewarded: u64
}

public struct IntegratedStreaming has copy, drop {
    nft_id: ID,
    streamer: address,
    tokens_rewarded: u64
}

// Integrated purchase function that also rewards tokens
public entry fun purchase_and_reward(
    registry: &NFTRegistry,
    nft: &mut MusicNFT,
    token: &mut TuneFlowToken,
    payment: Coin<SUI>,
    ctx: &mut TxContext
) {
    let buyer = tx_context::sender(ctx);
    let payment_amount = coin::value(&payment);
    
    // Get NFT ID before purchase
    let nft_id = music_nft::get_nft_id(nft);
    
    // Call the original purchase function
    music_nft::purchase_music_nft(registry, nft, payment, ctx);
    
    // Define reward amount for token distribution
    let tokens_rewarded = 5; // Purchase reward
    
    // Reward the buyer with governance tokens
    governance::distribute_tokens_for_activity(token, buyer, 2, ctx); // 2 = purchase
    
    // Emit integrated event
    emit(IntegratedPurchase {
        nft_id,
        buyer,
        amount_paid: payment_amount,
        tokens_rewarded
    });
}

// Integrated streaming function that also rewards tokens
public entry fun stream_and_reward(
    nft: &mut MusicNFT,
    token: &mut TuneFlowToken,
    ctx: &mut TxContext
) {
    let streamer = tx_context::sender(ctx);
    
    // Get NFT ID
    let nft_id = music_nft::get_nft_id(nft);
    
    // Call the original streaming function
    music_nft::stream_music(nft, ctx);
    
    // Define reward amount for token distribution
    let tokens_rewarded = 1; // Streaming reward
    
    // Reward the streamer with governance tokens
    governance::distribute_tokens_for_activity(token, streamer, 1, ctx); // 1 = streaming
    
    // Emit integrated event
    emit(IntegratedStreaming {
        nft_id,
        streamer,
        tokens_rewarded
    });
}

// Function that gives high quality access to subscribers
public fun get_high_quality_for_subscribers(
    nft: &MusicNFT,
    sub: &Subscription,
    ctx: &TxContext
): Option<String> {
    let user = tx_context::sender(ctx);
    
    // First check if the user is the owner using the public accessor
    if (music_nft::get_current_owner(nft) == user) {
        return music_nft::get_high_quality_link(nft, ctx)
    };
    
    // Then check if user is subscribed
    if (governance::is_subscribed(sub, user, ctx)) {
        return music_nft::get_high_quality_link_for_subscribers(nft)
    };
    
    // User is neither owner nor subscriber
    option::none()
}

// Function to get combined artist dashboard data
public fun get_artist_dashboard(
    registry: &NFTRegistry,
    token: &TuneFlowToken,
    artist: address,
    nfts: &vector<MusicNFT>,
    ctx: &TxContext
): (u64, u64, u64, u64) {
    // Get NFT stats
    let (total_nfts, total_streams, total_sales) = 
        music_nft::get_artist_stats(registry, artist, nfts);
        
    // Get token balance
    let token_balance = governance::get_token_balance(token, artist);
    
    (total_nfts, total_streams, total_sales, token_balance)
}

// NEW GETTER FUNCTIONS

// Get complete NFT details with ownership and streaming info
public fun get_nft_complete_details(
    nft: &MusicNFT,
    token: &TuneFlowToken,
    ctx: &TxContext
): (ID, address, address, String, String, String, u64, u64, bool, u64) {
    let nft_id = music_nft::get_nft_id(nft);
    let artist = music_nft::get_artist(nft);
    let current_owner = music_nft::get_current_owner(nft);
    let title = music_nft::get_title(nft);
    let price = music_nft::get_price(nft);
    let streaming_count = music_nft::get_streaming_count(nft);
    
    // Get additional details directly using music_nft accessor methods
    let (_, _, description, _, _, for_sale) = music_nft::get_nft_details(nft);
    
    // Get genre (assuming you have an accessor for this)
    let genre = music_nft::get_nft_genre(nft); // This assumes you have a public getter in music_nft
    
    // Get artist token balance
    let artist_tokens = governance::get_token_balance(token, artist);
    
    (nft_id, artist, current_owner, title, description, genre, price, streaming_count, for_sale, artist_tokens)
}

// Get home page marketplace data (trending, newest, for sale)
public fun get_marketplace_home_data(
    registry: &NFTRegistry,
    nfts: &vector<MusicNFT>,
    limit: u64
): (vector<ID>, vector<ID>, vector<ID>) {
    assert!(limit > 0, EINVALID_LIMIT);
    
    // Get trending NFTs (most streamed)
    let trending = music_nft::get_most_streamed(registry, nfts, limit);
    
    // Get newest NFTs
    let newest = music_nft::get_newest_nfts(registry, nfts, limit);
    
    // Get NFTs for sale
    let mut for_sale = music_nft::get_nfts_for_sale(registry, nfts);
    
    // Trim for_sale list if needed
    if (limit > 0 && vector::length(&for_sale) > limit) {
        let mut trimmed = vector::empty<ID>();
        let mut i = 0;
        while (i < limit) {
            vector::push_back(&mut trimmed, *vector::borrow(&for_sale, i));
            i = i + 1;
        };
        for_sale = trimmed;
    };
    
    (trending, newest, for_sale)
}

// Get combined user profile data (owned NFTs, subscription status, token balance)
public fun get_user_profile(
    registry: &NFTRegistry,
    token: &TuneFlowToken,
    sub: &Subscription,
    user: address,
    nfts: &vector<MusicNFT>,
    ctx: &TxContext
): (u64, bool, u64) {
    // Get token balance
    let token_balance = governance::get_token_balance(token, user);
    
    // Check subscription status
    let is_subbed = governance::is_subscribed(sub, user, ctx);
    
    // Count owned NFTs
    let mut owned_count = 0;
    let mut i = 0;
    while (i < vector::length(nfts)) {
        let nft = vector::borrow(nfts, i);
        if (music_nft::get_current_owner(nft) == user) {
            owned_count = owned_count + 1;
        };
        i = i + 1;
    };
    
    (owned_count, is_subbed, token_balance)
}

// Get platform stats for dashboard
public fun get_platform_dashboard(
    nfts: &vector<MusicNFT>,
    treasury: &Treasury,
    token: &TuneFlowToken,
    proposals: &vector<Proposal>
): (u64, u64, u64, u64, u64, u64, u64) {
    // Get NFT platform stats
    let (total_nfts, total_streams, total_sales) = music_nft::get_platform_stats(nfts);
    
    // Get treasury balance
    let treasury_balance = governance::get_treasury_balance(treasury);
    
    // Get governance stats
    let (total_tokens, active_proposals, passed_proposals) = 
        governance::get_governance_stats(token, proposals);
    
    (total_nfts, total_streams, total_sales, treasury_balance, total_tokens, active_proposals, passed_proposals)
}

// Get user's owned NFTs
public fun get_user_owned_nfts(
    user: address,
    nfts: &vector<MusicNFT>
): vector<ID> {
    let mut owned_nfts = vector::empty<ID>();
    
    let mut i = 0;
    while (i < vector::length(nfts)) {
        let nft = vector::borrow(nfts, i);
        if (music_nft::get_current_owner(nft) == user) {
            vector::push_back(&mut owned_nfts, music_nft::get_nft_id(nft));
        };
        i = i + 1;
    };
    
    owned_nfts
}

// Get user's created NFTs (as artist)
public fun get_user_created_nfts(
    registry: &NFTRegistry,
    user: address
): vector<ID> {
    music_nft::get_nfts_by_artist(registry, user)
}

// Get NFTs by genre
public fun get_nfts_by_genre(
    registry: &NFTRegistry,
    genre: String,
    limit: u64
): vector<ID> {
    let genre_nfts = music_nft::get_nfts_by_genre(registry, genre);
    
    // Trim list if needed
    if (limit > 0 && vector::length(&genre_nfts) > limit) {
        let mut trimmed = vector::empty<ID>();
        let mut i = 0;
        while (i < limit) {
            vector::push_back(&mut trimmed, *vector::borrow(&genre_nfts, i));
            i = i + 1;
        };
        return trimmed
    };
    
    genre_nfts
}

// Check if user can access high quality stream (either owner or subscriber)
public fun can_access_high_quality(
    nft: &MusicNFT,
    sub: &Subscription,
    user: address,
    ctx: &TxContext
): bool {
    // Check if user is owner
    if (music_nft::get_current_owner(nft) == user) {
        return true
    };
    
    // Check if user is subscribed
    if (governance::is_subscribed(sub, user, ctx)) {
        return true
    };
    
    false
}

// Get proposal details with current voting status
public fun get_proposal_details(
    proposal: &Proposal
): (String, u64, u64, bool) {  // ✅ Now returns String instead of vector<u8>
    let (description, votes_for, votes_against, status) = governance::get_proposal_details(proposal);
    // let description = string::String(&description_bytes);  // ✅ Convert vector<u8> to String

    (description, votes_for, votes_against, status)
}