import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AudioProvider } from "../trash/AudioContext.jsx";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router.jsx";
import { networkConfig } from "./config/networkConfig.js";
import "@mysten/dapp-kit/dist/index.css";

const queryClient = new QueryClient();
// const  {} = useCurrentWallet()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
        <WalletProvider autoConnect>
          <AudioProvider>
            <RouterProvider router={router} />
          </AudioProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </StrictMode>
);
