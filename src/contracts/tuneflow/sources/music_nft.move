#[allow(unused_const, unused_use, duplicate_alias, unused_variable)]
module tuneflow::music_nft;
// Imports
// use sui::transfer;
use sui::sui::SUI;
use sui::coin::{Self, Coin};
// use sui::object::{Self, UID, ID};
use sui::balance::{Self, Balance};
// use sui::tx_context::{Self, TxContext};
use sui::event::emit;
use sui::table::{Self, Table};
use std::string::{Self, String};
// use std::vector;
use std::option::{Self, Option, none, some, is_some, contains, borrow};
use std::u8;


// Error constants
const EINVALID_PURCHASE: u64 = 1;
const EINVALID_PRICE: u64 = 2;
const EINVALID_ROYALTY: u64 = 3;
const ENOT_ARTIST: u64 = 4;
const ENOT_OWNER: u64 = 5;
const EINVALID_TRANSFER: u64 = 6;
const EINSUFFICIENT_AMOUNT: u64 = 7;
const EINVALID_METADATA: u64 = 8;
const EINVALID_STREAMING: u64 = 9;

// Struct definitions
public struct MusicNFT has key, store {
    id: UID,
    artist: address,
    current_owner: address,
    title: String,
    description: String,
    genre: String,
    music_art: String,
    high_quality_ipfs: String,
    low_quality_ipfs: String,
    price: u64,
    royalty_percentage: u64,
    streaming_count: u64,
    collaborators: vector<address>,
    collaborator_roles: vector<String>,  // New field for roles
    collaborator_splits: vector<u64>,
    for_sale: bool,
    escrow: Balance<SUI>,
    creation_time: u64,
    vote_count: u64
}

// Registry to keep track of all NFTs
public struct NFTRegistry has key {
    id: UID,
    all_nfts: vector<ID>,
    nfts_by_artist: Table<address, vector<ID>>,
    nfts_by_genre: Table<String, vector<ID>>,
}

// Events
public struct MusicNFTMinted has copy, drop {
    nft_id: ID,
    artist: address,
    title: String,
    price: u64
}

public struct MusicNFTPurchased has copy, drop {
    nft_id: ID,
    buyer: address,
    amount: u64
}

public struct RoyaltyPaid has copy, drop {
    recipient: address,
    amount: u64
}

public struct StreamingRecorded has copy, drop {
    nft_id: ID,
    listener: address
}

public struct NFTVoted has copy, drop {
    nft_id: ID,
    voter: address,
    amount: u64,
    new_price: u64
}

public struct MusicNFTDeleted has copy, drop {
    nft_id: ID,
    artist: address,
    title: String
}

// Module initializer
fun init(ctx: &mut TxContext) {
    transfer::share_object(
        NFTRegistry {
            id: object::new(ctx),
            all_nfts: vector::empty(),
            nfts_by_artist: table::new(ctx),
            nfts_by_genre: table::new(ctx),
        }
    );
}

// Accessors
public fun get_title(nft: &MusicNFT): String {
    nft.title
}

public fun get_artist(nft: &MusicNFT): address {
    nft.artist
}

public fun get_price(nft: &MusicNFT): u64 {
    nft.price
}

public fun get_streaming_count(nft: &MusicNFT): u64 {
    nft.streaming_count
}

public fun get_low_quality_link(nft: &MusicNFT): String {
    nft.low_quality_ipfs
}

public fun get_high_quality_link(nft: &MusicNFT, ctx: &TxContext): Option<String> {
    if (nft.current_owner == tx_context::sender(ctx)) {
        some(nft.high_quality_ipfs)
    } else {
        none()
    }
}

// Registry accessor functions
public fun get_all_nfts(registry: &NFTRegistry): vector<ID> {
    registry.all_nfts
}

public fun get_nfts_by_artist(registry: &NFTRegistry, artist: address): vector<ID> {
    if (table::contains(&registry.nfts_by_artist, artist)) {
        *table::borrow(&registry.nfts_by_artist, artist)
    } else {
        vector::empty<ID>()
    }
}

public fun get_nfts_by_genre(registry: &NFTRegistry, genre: String): vector<ID> {
    if (table::contains(&registry.nfts_by_genre, genre)) {
        *table::borrow(&registry.nfts_by_genre, genre)
    } else {
        vector::empty<ID>()
    }
}

// Public - Entry functions
public entry fun mint_music_nft(
    registry: &mut NFTRegistry,
    title: vector<u8>,
    description: vector<u8>,
    genre: vector<u8>,
    music_art: vector<u8>,
    high_quality_ipfs: vector<u8>,
    low_quality_ipfs: vector<u8>,
    price: u64,
    royalty_percentage: u64,
    collaborators: vector<address>,
    collaborator_roles: vector<vector<u8>>,  // New parameter for roles
    collaborator_splits: vector<u64>,
    ctx: &mut TxContext
) {
    // Validations
    assert!(royalty_percentage <= 5000, EINVALID_ROYALTY);
    assert!(price > 0, EINVALID_PRICE);
    assert!(vector::length(&high_quality_ipfs) > 0 && vector::length(&low_quality_ipfs) > 0, EINVALID_METADATA);
    
    // Validate collaborator splits and roles if provided
    if (vector::length(&collaborators) > 0) {
        assert!(
            vector::length(&collaborators) == vector::length(&collaborator_roles) &&
            vector::length(&collaborators) == vector::length(&collaborator_splits),
            EINVALID_METADATA
        );
        
        // Ensure splits add up to 10000 (100%)
        let mut total_split = 0u64;
        let mut i = 0;
        while (i < vector::length(&collaborator_splits)) {
            total_split = total_split + *vector::borrow(&collaborator_splits, i);
            i = i + 1;
        };
        assert!(total_split == 10000, EINVALID_ROYALTY);
    };

    // Convert roles from vector<u8> to String
    let mut roles_string = vector::empty<String>();
    let mut i = 0;
    while (i < vector::length(&collaborator_roles)) {
        let role = vector::borrow(&collaborator_roles, i);
        vector::push_back(&mut roles_string, string::utf8(*role));
        i = i + 1;
    };

    let nft_id = object::new(ctx);
    let nft_object_id = object::uid_to_inner(&nft_id);
    let sender = tx_context::sender(ctx);
    let genre_string = string::utf8(genre);

    // Create the NFT object with roles
    let nft = MusicNFT {
        id: nft_id,
        artist: sender,
        current_owner: sender,
        title: string::utf8(title),
        description: string::utf8(description),
        genre: genre_string,
        music_art: string::utf8(music_art),
        high_quality_ipfs: string::utf8(high_quality_ipfs),
        low_quality_ipfs: string::utf8(low_quality_ipfs),
        price: price,
        royalty_percentage: royalty_percentage,
        streaming_count: 0,
        collaborators: collaborators,
        collaborator_roles: roles_string,  // Include roles
        collaborator_splits: collaborator_splits,
        for_sale: true,
        escrow: balance::zero(),
        creation_time: tx_context::epoch(ctx),
        vote_count: 0
    };

    // Rest of the function remains the same...
    // Update registry
    vector::push_back(&mut registry.all_nfts, nft_object_id);
    
    if (!table::contains(&registry.nfts_by_artist, sender)) {
        table::add(&mut registry.nfts_by_artist, sender, vector::empty<ID>());
    };
    let artist_nfts = table::borrow_mut(&mut registry.nfts_by_artist, sender);
    vector::push_back(artist_nfts, nft_object_id);
    
    if (!table::contains(&registry.nfts_by_genre, genre_string)) {
        table::add(&mut registry.nfts_by_genre, genre_string, vector::empty<ID>());
    };
    let genre_nfts = table::borrow_mut(&mut registry.nfts_by_genre, genre_string);
    vector::push_back(genre_nfts, nft_object_id);

    emit(MusicNFTMinted {
        nft_id: nft_object_id,
        artist: sender,
        title: string::utf8(title),
        price: price
    });

    transfer::share_object(nft);
}

public entry fun purchase_music_nft(
    _registry: &NFTRegistry,
    nft: &mut MusicNFT,
    payment: Coin<SUI>,
    ctx: &mut TxContext
) {
    // Validations
    assert!(nft.for_sale, EINVALID_PURCHASE);
    let payment_amount = coin::value(&payment);
    assert!(payment_amount >= nft.price, EINSUFFICIENT_AMOUNT);

    let buyer = tx_context::sender(ctx);
    let seller = nft.current_owner;
    
    // Calculate royalty amount
    let royalty_amount = (payment_amount * nft.royalty_percentage) / 10000;
    let seller_amount = payment_amount - royalty_amount;
    
    // Process payment
    let mut payment_balance = coin::into_balance(payment);
    
    // Pay seller
    if (seller_amount > 0) {
        let seller_payment = coin::from_balance(balance::split(&mut payment_balance, seller_amount), ctx);
        transfer::public_transfer(seller_payment, seller);
    };
    
    // Pay royalties
    if (royalty_amount > 0) {
        if (vector::length(&nft.collaborators) > 0) {
            // Distribute royalties among collaborators
            let mut i = 0;
            while (i < vector::length(&nft.collaborators)) {
                let collaborator = *vector::borrow(&nft.collaborators, i);
                let split_percentage = *vector::borrow(&nft.collaborator_splits, i);
                let collaborator_amount = (royalty_amount * split_percentage) / 10000;
                
                if (collaborator_amount > 0) {
                    let collaborator_payment = coin::from_balance(balance::split(&mut payment_balance, collaborator_amount), ctx);
                    transfer::public_transfer(collaborator_payment, collaborator);
                    
                    emit(RoyaltyPaid {
                        recipient: collaborator,
                        amount: collaborator_amount
                    });
                };
                
                i = i + 1;
            };
        } else {
            // Pay royalty to the original artist
            let artist_payment = coin::from_balance(balance::split(&mut payment_balance, royalty_amount), ctx);
            transfer::public_transfer(artist_payment, nft.artist);
            
            emit(RoyaltyPaid {
                recipient: nft.artist,
                amount: royalty_amount
            });
        };
    };
    
    // Handle any remaining balance (rounding errors)
    if (balance::value(&payment_balance) > 0) {
        let remaining_payment = coin::from_balance(payment_balance, ctx);
        transfer::public_transfer(remaining_payment, seller);
    } else {
        balance::destroy_zero(payment_balance);
    };
    
    // Update NFT ownership
    nft.current_owner = buyer;
    nft.for_sale = false;
    
    // Emit purchase event
    emit(MusicNFTPurchased {
        nft_id: object::uid_to_inner(&nft.id),
        buyer: buyer,
        amount: payment_amount
    });
}

public entry fun vote_for_nft(
    nft: &mut MusicNFT,
    payment: Coin<SUI>,
    ctx: &mut TxContext
) {
    let vote_amount = coin::value(&payment);
    assert!(vote_amount > 0, EINSUFFICIENT_AMOUNT);

    // Price increases by 50% of vote amount
    let price_increase = vote_amount;
    nft.price = nft.price + price_increase;
    nft.vote_count = nft.vote_count + 1;

    // Transfer the payment to the NFT owner instead of destroying
    transfer::public_transfer(payment, nft.artist);
    
    emit(NFTVoted {
        nft_id: object::uid_to_inner(&nft.id),
        voter: tx_context::sender(ctx),
        amount: vote_amount,
        new_price: nft.price
    });
}

public entry fun stream_music(
    nft: &mut MusicNFT,
    ctx: &mut TxContext
) {
    let streamer = tx_context::sender(ctx);
    
    // Increment streaming count
    nft.streaming_count = nft.streaming_count + 1;
    
    // Emit streaming event
    emit(StreamingRecorded {
        nft_id: object::uid_to_inner(&nft.id),
        listener: streamer
    });
}

public entry fun update_price(
    nft: &mut MusicNFT,
    new_price: u64,
    ctx: &mut TxContext
) {
    assert!(tx_context::sender(ctx) == nft.current_owner, ENOT_OWNER);
    assert!(new_price > 0, EINVALID_PRICE);
    
    nft.price = new_price;
}

public entry fun toggle_for_sale(
    nft: &mut MusicNFT,
    ctx: &mut TxContext
) {
    assert!(tx_context::sender(ctx) == nft.current_owner, ENOT_OWNER);
    nft.for_sale = !nft.for_sale;
}

public entry fun update_metadata(
    nft: &mut MusicNFT,
    new_title: vector<u8>,
    new_description: vector<u8>,
    new_genre: vector<u8>,
    ctx: &mut TxContext
) {
    assert!(tx_context::sender(ctx) == nft.artist, ENOT_ARTIST);
    
    if (vector::length(&new_title) > 0) {
        nft.title = string::utf8(new_title);
    };
    
    if (vector::length(&new_description) > 0) {
        nft.description = string::utf8(new_description);
    };
    
    if (vector::length(&new_genre) > 0) {
        nft.genre = string::utf8(new_genre);
    };
}

public entry fun update_music_files(
    nft: &mut MusicNFT,
    new_music_art: vector<u8>,
    new_high_quality_ipfs: vector<u8>,
    new_low_quality_ipfs: vector<u8>,
    ctx: &mut TxContext
) {
    assert!(tx_context::sender(ctx) == nft.artist, ENOT_ARTIST);
    
    if (vector::length(&new_music_art) > 0) {
        nft.music_art = string::utf8(new_music_art);
    };
    
    if (vector::length(&new_high_quality_ipfs) > 0) {
        nft.high_quality_ipfs = string::utf8(new_high_quality_ipfs);
    };
    
    if (vector::length(&new_low_quality_ipfs) > 0) {
        nft.low_quality_ipfs = string::utf8(new_low_quality_ipfs);
    };
}


// Function to update all music details including collaborators, splits, and roles
public entry fun update_music_details(
    nft: &mut MusicNFT,
    new_title: vector<u8>,
    new_description: vector<u8>,
    new_genre: vector<u8>,
    new_music_art: vector<u8>,
    new_high_quality_ipfs: vector<u8>,
    new_low_quality_ipfs: vector<u8>,
    new_price: u64,
    new_for_sale: bool,
    new_collaborators: vector<address>,
    new_collaborator_roles: vector<vector<u8>>,
    new_collaborator_splits: vector<u64>,
    ctx: &mut TxContext
) {
    let sender = tx_context::sender(ctx);
    // Only the artist can update metadata and collaborator details
    assert!(sender == nft.artist, ENOT_ARTIST);
    
    // Validate collaborator splits and roles if provided
    if (vector::length(&new_collaborators) > 0) {
        assert!(
            vector::length(&new_collaborators) == vector::length(&new_collaborator_roles) &&
            vector::length(&new_collaborators) == vector::length(&new_collaborator_splits),
            EINVALID_METADATA
        );
        
        // Ensure splits add up to 10000 (100%)
        let mut total_split = 0u64;
        let mut i = 0;
        while (i < vector::length(&new_collaborator_splits)) {
            total_split = total_split + *vector::borrow(&new_collaborator_splits, i);
            i = i + 1;
        };
        assert!(total_split == 10000, EINVALID_ROYALTY);
    };

    // Convert roles from vector<u8> to String if provided
    if (vector::length(&new_collaborator_roles) > 0) {
        let mut roles_string = vector::empty<String>();
        let mut i = 0;
        while (i < vector::length(&new_collaborator_roles)) {
            let role = vector::borrow(&new_collaborator_roles, i);
            vector::push_back(&mut roles_string, string::utf8(*role));
            i = i + 1;
        };
        nft.collaborator_roles = roles_string;
    };
    
    // Update collaborators and splits if provided
    if (vector::length(&new_collaborators) > 0) {
        nft.collaborators = new_collaborators;
        nft.collaborator_splits = new_collaborator_splits;
    };

    // Update metadata
    if (vector::length(&new_title) > 0) {
        nft.title = string::utf8(new_title);
    };
    
    if (vector::length(&new_description) > 0) {
        nft.description = string::utf8(new_description);
    };
    
    if (vector::length(&new_genre) > 0) {
        nft.genre = string::utf8(new_genre);
    };
    
    // Update music files
    if (vector::length(&new_music_art) > 0) {
        nft.music_art = string::utf8(new_music_art);
    };
    
    if (vector::length(&new_high_quality_ipfs) > 0) {
        nft.high_quality_ipfs = string::utf8(new_high_quality_ipfs);
    };
    
    if (vector::length(&new_low_quality_ipfs) > 0) {
        nft.low_quality_ipfs = string::utf8(new_low_quality_ipfs);
    };
    
    // Update price and sale status (only if the sender is the current owner)
    if (sender == nft.current_owner) {
        if (new_price > 0) {
            nft.price = new_price;
        };
        
        nft.for_sale = new_for_sale;
    };
}

// Function to delete a music NFT
public entry fun delete_music_nft(
    registry: &mut NFTRegistry,
    nft: MusicNFT,
    ctx: &mut TxContext
) {
    let sender = tx_context::sender(ctx);
    // Only the artist can delete the NFT
    assert!(sender == nft.artist, ENOT_ARTIST);
    
    // Only allow deletion if the NFT is owned by the artist
    assert!(nft.current_owner == nft.artist, ENOT_OWNER);
    
    let nft_id = object::uid_to_inner(&nft.id);
    let nft_artist = nft.artist;
    let nft_title = nft.title;
    let nft_genre = nft.genre;
    
    // Remove from registry
    let mut i = 0;
    let mut found_index = option::none();
    while (i < vector::length(&registry.all_nfts)) {
        if (*vector::borrow(&registry.all_nfts, i) == nft_id) {
            found_index = option::some(i);
            break
        };
        i = i + 1;
    };
    
    if (option::is_some(&found_index)) {
        vector::remove(&mut registry.all_nfts, option::extract(&mut found_index));
    };
    
    // Remove from artist's NFTs
    if (table::contains(&registry.nfts_by_artist, nft_artist)) {
        let artist_nfts = table::borrow_mut(&mut registry.nfts_by_artist, nft_artist);
        let mut i = 0;
        let mut found_index = option::none();
        while (i < vector::length(artist_nfts)) {
            if (*vector::borrow(artist_nfts, i) == nft_id) {
                found_index = option::some(i);
                break
            };
            i = i + 1;
        };
        
        if (option::is_some(&found_index)) {
            vector::remove(artist_nfts, option::extract(&mut found_index));
        };
    };
    
    // Remove from genre's NFTs
    if (table::contains(&registry.nfts_by_genre, nft_genre)) {
        let genre_nfts = table::borrow_mut(&mut registry.nfts_by_genre, nft_genre);
        let mut i = 0;
        let mut found_index = option::none();
        while (i < vector::length(genre_nfts)) {
            if (*vector::borrow(genre_nfts, i) == nft_id) {
                found_index = option::some(i);
                break
            };
            i = i + 1;
        };
        
        if (option::is_some(&found_index)) {
            vector::remove(genre_nfts, option::extract(&mut found_index));
        };
    };
    
    // Emit deletion event
    emit(MusicNFTDeleted {
        nft_id: nft_id,
        artist: nft_artist,
        title: nft_title
    });
    
    // Delete the NFT by unpacking it
    let MusicNFT {
        id,
        artist: _,
        current_owner: _,
        title: _,
        description: _,
        genre: _,
        music_art: _,
        high_quality_ipfs: _,
        low_quality_ipfs: _,
        price: _,
        royalty_percentage: _,
        streaming_count: _,
        collaborators: _,
        collaborator_roles: _,
        collaborator_splits: _,
        for_sale: _,
        escrow,
        creation_time: _,
        vote_count: _
    } = nft;
    
    // Handle any remaining balance in escrow
    if (balance::value(&escrow) > 0) {
        let remaining_payment = coin::from_balance(escrow, ctx);
        transfer::public_transfer(remaining_payment, sender);
    } else {
        balance::destroy_zero(escrow);
    };
    
    // Delete the object ID
    object::delete(id);
}

// Additional listing functions

// Get all NFTs for sale
public fun get_nfts_for_sale(
    _registry: &NFTRegistry,
    nfts: &vector<MusicNFT>
): vector<ID> {
    let mut result = vector::empty<ID>();
    let mut i = 0;
    
    while (i < vector::length(nfts)) {
        let nft = vector::borrow(nfts, i);
        if (nft.for_sale) {
            vector::push_back(&mut result, object::uid_to_inner(&nft.id));
        };
        i = i + 1;
    };
    
    result
}

// Get most streamed NFTs
public fun get_most_streamed(
    _registry: &NFTRegistry,
    nfts: &vector<MusicNFT>,
    limit: u64
): vector<ID> {
    // Copy all NFT IDs and streaming counts
    let mut result = vector::empty<ID>();
    let mut streaming_counts = vector::empty<u64>();
    
    let mut i = 0;
    while (i < vector::length(nfts)) {
        let nft = vector::borrow(nfts, i);
        let nft_id = object::uid_to_inner(&nft.id);
        let count = nft.streaming_count;
        
        // Simple insertion sort while building the list
        let mut j = 0;
        let mut inserted = false;
        
        while (j < vector::length(&result) && !inserted) {
            if (count > *vector::borrow(&streaming_counts, j)) {
                vector::insert(&mut result, nft_id, j);
                vector::insert(&mut streaming_counts, count, j);
                inserted = true;
            };
            j = j + 1;
        };
        
        if (!inserted) {
            vector::push_back(&mut result, nft_id);
            vector::push_back(&mut streaming_counts, count);
        };
        
        i = i + 1;
    };
    
    // Trim to limit
    if (limit > 0 && vector::length(&result) > limit) {
        let mut trimmed = vector::empty<ID>();
        let mut i = 0;
        while (i < limit) {
            vector::push_back(&mut trimmed, *vector::borrow(&result, i));
            i = i + 1;
        };
        trimmed
    } else {
        result
    }
}

// Get newest NFTs
public fun get_newest_nfts(
    _registry: &NFTRegistry,
    nfts: &vector<MusicNFT>,
    limit: u64
): vector<ID> {
    let mut result = vector::empty<ID>();
    let mut creation_times = vector::empty<u64>();
    
    let mut i = 0;
    while (i < vector::length(nfts)) {
        let nft = vector::borrow(nfts, i);
        let nft_id = object::uid_to_inner(&nft.id);
        let time = nft.creation_time;
        
        // Simple insertion sort while building the list
        let mut j = 0;
        let mut inserted = false;
        
        while (j < vector::length(&result) && !inserted) {
            if (time > *vector::borrow(&creation_times, j)) {
                vector::insert(&mut result, nft_id, j);
                vector::insert(&mut creation_times, time, j);
                inserted = true;
            };
            j = j + 1;
        };
        
        if (!inserted) {
            vector::push_back(&mut result, nft_id);
            vector::push_back(&mut creation_times, time);
        };
        
        i = i + 1;
    };
    
    // Trim to limit
    if (limit > 0 && vector::length(&result) > limit) {
        let mut trimmed = vector::empty<ID>();
        let mut i = 0;
        while (i < limit) {
            vector::push_back(&mut trimmed, *vector::borrow(&result, i));
            i = i + 1;
        };
        trimmed
    } else {
        result
    }
}

// Get NFT Details (single NFT stats for dashboard)
public fun get_nft_details(
    nft: &MusicNFT
): (address, address, String, u64, u64, bool) {
    (
        nft.artist,
        nft.current_owner,
        nft.title,
        nft.streaming_count,
        nft.price,
        nft.for_sale
    )
}

// Get Artist Statistics
public fun get_artist_stats(
    registry: &NFTRegistry,
    artist: address,
    nfts: &vector<MusicNFT>
): (u64, u64, u64) {
    let mut total_nfts = 0;
    let mut total_streams = 0;
    let mut total_sales = 0;
    
    let mut i = 0;
    while (i < vector::length(nfts)) {
        let nft = vector::borrow(nfts, i);
        if (nft.artist == artist) {
            total_nfts = total_nfts + 1;
            total_streams = total_streams + nft.streaming_count;
            
            // Count as a sale if the owner is different from the artist
            if (nft.current_owner != artist) {
                total_sales = total_sales + 1;
            };
        };
        i = i + 1;
    };
    
    (total_nfts, total_streams, total_sales)
}

// Get Platform-wide Statistics
public fun get_platform_stats(
    nfts: &vector<MusicNFT>
): (u64, u64, u64) {
    let total_nfts = vector::length(nfts);
    let mut total_streams = 0;
    let mut total_sales = 0;
    
    let mut i = 0;
    while (i < total_nfts) {
        let nft = vector::borrow(nfts, i);
        total_streams = total_streams + nft.streaming_count;
        
        // Count as a sale if the owner is different from the artist
        if (nft.current_owner != nft.artist) {
            total_sales = total_sales + 1;
        };
        
        i = i + 1;
    };
    
    (total_nfts, total_streams, total_sales)
}

// Add these functions to your music_nft module

// Get the NFT ID (safely exposing the internal ID)
public fun get_nft_id(nft: &MusicNFT): ID {
    object::uid_to_inner(&nft.id)
}

// Get the NFT Genre
public fun get_nft_genre(nft: &MusicNFT): String {
    nft.genre
}


// Get the current owner of an NFT
public fun get_current_owner(nft: &MusicNFT): address {
    nft.current_owner
}

// Helper for subscribers to access high quality links
public fun get_high_quality_link_for_subscribers(nft: &MusicNFT): Option<String> {
    // Here we can add any validation logic specific to subscribers
    option::some(nft.high_quality_ipfs)
}