#[allow(unused_variable, unused_const, unused_use, duplicate_alias)]
module tuneflow::governance;
use sui::sui::SUI;
use sui::coin::{Self, Coin};
use sui::balance::{Self, Balance};
use sui::tx_context::{Self, TxContext};
use sui::event::emit;
use sui::object::{Self, UID};
use sui::table::{Self, Table};
use std::string::{Self, String};
// use std::vector::{Self, vector};
use std::option::{Self, Option, none, some};

// Error constants
const EINSUFFICIENT_FUNDS: u64 = 10;
const ENOT_SUBSCRIBED: u64 = 11;
const ENOT_ENOUGH_TOKENS: u64 = 12;
const EINVALID_VOTE: u64 = 13;

// Governance Token
public struct TuneFlowToken has store, key {
    id: UID,
    total_supply: u64,
    balances: Table<address, u64>,
}

// Subscription Model
public struct Subscription has key, store {
    id: UID,
    subscribers: Table<address, u64>, // Stores expiration timestamps
    price_per_month: u64,
}

// Governance Proposal
public struct Proposal has key, store {
    id: UID,
    description: String,
    votes_for: u64,
    votes_against: u64,
    status: bool, // true if approved
}

// 1. Treasury Implementation for the Governance Module
public struct Treasury has key {
    id: UID,
    funds: Balance<SUI>,
}

// Events
public struct TokensMinted has copy, drop {
    recipient: address,
    amount: u64,
}

public struct SubscriptionPurchased has copy, drop {
    user: address,
    expires_at: u64,
}

public struct ProposalCreated has copy, drop {
    proposal_id: ID,
    description: String,
}

public struct ProposalVoted has copy, drop {
    proposal_id: ID,
    voter: address,
    voted_for: bool,
}

// Init
fun init(ctx: &mut TxContext) {
    // Initialize TuneFlowToken
    let token = TuneFlowToken {
        id: object::new(ctx),
        total_supply: 0,
        balances: table::new(ctx),
    };
    
    // Initialize Subscription
    let subscription = Subscription {
        id: object::new(ctx),
        subscribers: table::new(ctx),
        price_per_month: 10_000_000, // 0.01 SUI (assuming smallest unit)
    };
    
    // Initialize Treasury
    let treasury = Treasury {
        id: object::new(ctx),
        funds: balance::zero(),
    };
    
    // Share the objects
    transfer::share_object(token);
    transfer::share_object(subscription);
    transfer::share_object(treasury);
}

// Governance Token Minting
public entry fun mint_tokens(
    token: &mut TuneFlowToken,
    recipient: address,
    amount: u64,
    ctx: &mut TxContext
) {
    assert!(amount > 0, EINSUFFICIENT_FUNDS);
    if (!table::contains(&token.balances, recipient)) {
        table::add(&mut token.balances, recipient, 0);
    };
    let balance = table::borrow_mut(&mut token.balances, recipient);
    *balance = *balance + amount;
    token.total_supply = token.total_supply + amount;
    
    emit(TokensMinted { recipient, amount });
}

// Stake Tokens for Voting
public entry fun vote_on_proposal(
    proposal: &mut Proposal,
    token: &mut TuneFlowToken,
    voter: address,
    amount: u64,
    vote_for: bool
) {
    assert!(amount > 0, EINVALID_VOTE);
    if (!table::contains(&token.balances, voter)) {
        table::add(&mut token.balances, voter, 0);
    };
    let balance = table::borrow_mut(&mut token.balances, voter);
    assert!(*balance >= amount, ENOT_ENOUGH_TOKENS);
    
    *balance = *balance - amount;
    if (vote_for) {
        proposal.votes_for = proposal.votes_for + amount;
    } else {
        proposal.votes_against = proposal.votes_against + amount;
    };
    
    // emit(ProposalVoted { proposal_id: proposal.id, voter, voted_for: vote_for });
    // emit(ProposalVoted { proposal_id: object::id(&mut proposal), voter, voted_for: vote_for });
    emit(ProposalVoted { proposal_id: object::uid_to_inner(&proposal.id), voter, voted_for: vote_for });

}

// Create a Proposal
public entry fun create_proposal(
    description: vector<u8>,
    ctx: &mut TxContext
) {
    let proposal = Proposal {
        id: object::new(ctx),
        description: string::utf8(description),
        votes_for: 0,
        votes_against: 0,
        status: false,
    };
    
    emit(ProposalCreated { 
        proposal_id: object::uid_to_inner(&proposal.id), 
        description: string::utf8(description) 
    });
    
    transfer::share_object(proposal);
}

// 2. Update the subscribe function to use the Treasury
public entry fun subscribe(
    sub: &mut Subscription,
    treasury: &mut Treasury,
    user: address,
    payment: Coin<SUI>,
    ctx: &mut TxContext
) {
    let now = tx_context::epoch(ctx);
    let expiry = now + 30; // 30-day subscription
    
    let payment_value = coin::value(&payment);
    assert!(payment_value >= sub.price_per_month, EINSUFFICIENT_FUNDS);
    
    // Add payment to treasury instead of transferring to hardcoded address
    let payment_balance = coin::into_balance(payment);
    balance::join(&mut treasury.funds, payment_balance);
    
    if (!table::contains(&sub.subscribers, user)) {
        table::add(&mut sub.subscribers, user, expiry);
    } else {
        let expiration = table::borrow_mut(&mut sub.subscribers, user);
        *expiration = expiry;
    };
    
    emit(SubscriptionPurchased { user, expires_at: expiry });
}

// Check Subscription Status
public fun is_subscribed(sub: &Subscription, user: address, ctx: &TxContext): bool {
    if (!table::contains(&sub.subscribers, user)) {
        return false
    };
    let now: u64 = tx_context::epoch(ctx);
    let expiration: u64 = *table::borrow(&sub.subscribers, user);
    expiration > now
}

// Add Token Distribution Mechanism
public entry fun distribute_tokens_for_activity(
    token: &mut TuneFlowToken,
    user: address,
    activity_type: u8, // 1 = streaming, 2 = purchase
    ctx: &mut TxContext
) {
    // Define reward amounts
    let tokens_to_mint = if (activity_type == 1) {
        1 // Streaming reward
    } else if (activity_type == 2) {
        5 // Purchase reward
    } else {
        1 // Default reward
    };
    
    // Mint tokens to the user
    if (!table::contains(&token.balances, user)) {
        table::add(&mut token.balances, user, 0);
    };
    
    let balance = table::borrow_mut(&mut token.balances, user);
    *balance = *balance + tokens_to_mint;
    token.total_supply = token.total_supply + tokens_to_mint;
    
    emit(TokensMinted { recipient: user, amount: tokens_to_mint });
}

// Treasury withdrawal function (for platform operations)
public entry fun withdraw_from_treasury(
    treasury: &mut Treasury,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext
) {
    // Only admins should be able to call this
    // For MVP, we're using a simple check (you might want to enhance this later)
    assert!(tx_context::sender(ctx) == @0x123, 1000); // Replace with actual admin address
    
    assert!(balance::value(&treasury.funds) >= amount, EINSUFFICIENT_FUNDS);
    
    let withdrawal = coin::from_balance(balance::split(&mut treasury.funds, amount), ctx);
    transfer::public_transfer(withdrawal, recipient);
}

// Get governance statistics
public fun get_governance_stats(
    token: &TuneFlowToken,
    proposals: &vector<Proposal>
): (u64, u64, u64) {
    let total_supply = token.total_supply;
    let active_proposals = vector::length(proposals);
    let mut passed_proposals = 0;
    
    let mut i = 0;
    while (i < active_proposals) {
        let proposal = vector::borrow(proposals, i);
        if (proposal.status) {
            passed_proposals = passed_proposals + 1;
        };
        i = i + 1;
    };
    
    (total_supply, active_proposals, passed_proposals)
}

// Get token balance for an address
public fun get_token_balance(token: &TuneFlowToken, user: address): u64 {
    if (!table::contains(&token.balances, user)) {
        return 0
    };
    *table::borrow(&token.balances, user)
}

// Get treasury balance
public fun get_treasury_balance(treasury: &Treasury): u64 {
    balance::value(&treasury.funds)
}

// Get proposal details
public fun get_proposal_details(proposal: &Proposal): (String, u64, u64, bool) {
    (proposal.description, proposal.votes_for, proposal.votes_against, proposal.status)
}

// // Get Proposal description
// public fun get_proposal_description(proposal: &Proposal): vector<u8> {
//     String(&proposal.description)
// }

// // Get Proposal status
// public fun get_proposal_status(proposal: &Proposal): bool {
//     proposal.status
// }

// // Get Proposal votes for
// public fun get_proposal_votes_for(proposal: &Proposal): u64 {
//     proposal.votes_for
// }

// // Get Proposal votes against
// public fun get_proposal_votes_against(proposal: &Proposal): u64 {
//     proposal.votes_against
// }
