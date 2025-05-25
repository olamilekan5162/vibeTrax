# VibeTrax

**Empowering emerging artists through blockchain-backed, transparent music collaboration.**

## Overview

VibeTrax is a decentralized music platform built on the **Sui blockchain**, enabling upcoming artists to release music **without upfront capital**, collaborate transparently, and earn fair, on-chain revenue. Fans can stream, own, and even resell music—creating an ecosystem where everyone is rewarded based on the value they contribute.

---

## Core Features

- **No Upfront Capital Needed** – Artists launch music and pay collaborators based on revenue shares.
- **On-Chain Revenue Splitting** – Instant, automatic payments to artists and collaborators on song sales or resales.
- **Subscription Access** – Fans subscribe on-chain to unlock premium content and early access.
- **Optional Ownership** – Buy music NFTs to support artists, collect, resell, and earn Fan Power Tokens.
- **Collaborator Dashboards** – Real-time dashboards for all contributors to track revenue and engagement.
- **Top-Rated Artists** – Voted by the community, not by industry gatekeepers.


## Real Use Case: Mr. A’s Journey

An emerging artist—Mr. A—partners with a producer and studio via VibeTrax. Instead of upfront payments, he offers revenue shares. They upload the track, assign royalty percentages, and release it.

Fans:
- **Stream it freely**
- **Subscribe for high-fidelity access**
- **Buy the track as a collectible NFT**

Mr. A and his collaborators receive **instant, transparent payouts** on every purchase or resale. It's music, reimagined.


## How It Works

1. **Artists upload tracks**, set prices, assign collaborators, and define revenue splits.
2. **Smart contracts** mint music NFTs with embedded metadata and revenue logic.
3. **Listeners**:
   - Stream music
   - Subscribe for premium features
   - Purchase music as NFTs
4. **Royalties & Resale Earnings**:
   - Automatically distributed to artists and collaborators
   - All tracked on-chain
5. **Owners receive Fan Power Tokens**, unlocking new music, perks, and rewards.

## User Types

- **Artists**: Upload, assign collaborators, manage revenue.
- **Collaborators**: Track songs they worked on and monitor earnings.
- **Fans**: Stream, subscribe, own music.

Each user has a dashboard accessible after connecting a wallet or logging in via zkLogin.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Blockchain** | [Sui blockchain](https://sui.io) (smart contracts in Move) |
| **Frontend** | React.js |
| **Wallet Integration** | Sui Wallet, zkLogin (e.g., Google-based login) |
| **Storage** | Walrus (for music/audio file storage) |
| **Authentication** | Sui Wallet + zkLogin |
| **NFT Metadata** | Collaborator revenue shares embedded in each music NFT |
| **Subscription System** | Fully handled on-chain |
| **Royalty & Revenue Splits** | Managed on-chain through smart contracts |

## Getting Started

**Prerequisites:**

- [Node.js](https://nodejs.org/)
- [Sui CLI](https://docs.sui.io/build/install)
- [Sui Wallet Extension](https://chrome.google.com/webstore/detail/sui-wallet/)
- [Walrus](https://sdk.mystenlabs.com/walrus)

**Installation & Running:**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/olamilekan5162/vibetrax.git
    cd vibetrax
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will typically start the application on `http://localhost:5173` (Vite's default). Open this URL in your browser.
    

## Project Status

- Tech design completed (smart contracts, revenue logic)
- Frontend development in React.js
- Storage via Walrus integrated
- GitHub repo live
- 4-person core team actively building


## Contributing

We’re building the future of music with community at the core. If you're a:
- Web3 developer (Move, React, smart contracts)
- Music tech enthusiast
- Designer, tester, or fan

Feel free to contribute or join the discussion.

[GitHub Link](https://github.com/olamilekan5162/vibeTrax)


## License

This project is licensed under **MIT LICENSE**. See the [LICENSE](LICENSE) file for details.