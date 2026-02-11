# Stellar Crowdfund

A transparent crowdfunding dApp built on the Stellar Testnet.

This application allows users to connect their Freighter wallet, view their XLM balance, and send transactions on-chain. It serves as the foundation for a fully transparent crowdfunding system where every contribution is verifiable on the Stellar blockchain.

The project focuses on clean architecture, strong typing, and reliable testing rather than quick prototypes.


------------------------------------------------------------
Features
------------------------------------------------------------

• Connect / Disconnect Freighter wallet
• Display shortened public key
• Fetch real-time XLM balance
• Send XLM transactions on Stellar Testnet
• Transaction success and failure feedback
• Horizon + Freighter integration
• Unit tests for services, hooks, and UI
• ESLint clean codebase


------------------------------------------------------------
Tech Stack
------------------------------------------------------------

Frontend
- Next.js (App Router)
- React
- TypeScript

Blockchain
- Stellar SDK
- Horizon API
- Freighter Wallet

Testing
- Jest
- React Testing Library

Tooling
- ESLint
- PostCSS


------------------------------------------------------------
Project Structure
------------------------------------------------------------

src/
 ├─ app/          → Next.js routes and layout
 ├─ components/   → UI components
 ├─ hooks/        → state + side effects
 ├─ services/     → Stellar blockchain logic
 ├─ types/        → shared TypeScript types
 ├─ utils/        → helpers

Architecture principle:

UI → Hooks → Services → Stellar SDK

Components never directly call blockchain code.


------------------------------------------------------------
Getting Started
------------------------------------------------------------

1. Install dependencies

npm install


2. Run development server

npm run dev


3. Open browser

http://localhost:3000


------------------------------------------------------------
Wallet Setup
------------------------------------------------------------

1. Install Freighter Wallet extension
2. Switch network to Testnet
3. Fund wallet using Stellar Friendbot
4. Connect wallet inside the app


------------------------------------------------------------
Available Scripts
------------------------------------------------------------

npm run dev       → start dev server
npm run build     → production build
npm run start     → start production server
npm run lint      → run ESLint
npm test          → run unit tests


------------------------------------------------------------
Development Standards
------------------------------------------------------------

• All blockchain logic isolated in services
• Hooks manage async state
• Components are UI only
• No direct SDK usage inside components
• Loading and error states handled explicitly
• No "any" types
• No unused variables
• All network calls mocked in tests

Tests cover:
• balance fetching
• transaction logic
• wallet state
• UI rendering


------------------------------------------------------------
Screenshots
------------------------------------------------------------

Add the following screenshots here:

- Wallet not connected
![Wallet Not Connected](./public/screenShots/Ekran%20görüntüsü%202026-02-11%20142738.png)
- Balance displayed
![Balance displayed](./public/screenShots/Ekran%20görüntüsü%202026-02-11%20142756.png)
- Successful transaction
![Successful transaction](./public/screenShots/Ekran%20görüntüsü%202026-02-11%20142853.png)



------------------------------------------------------------
License
------------------------------------------------------------

MIT
