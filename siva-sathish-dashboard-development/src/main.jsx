import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AppLoading from "./components/ui/AppLoading";
import "../src/apiConfigs/axiox-middleware";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          toastOptions={{ className: "react-hot-toast" }}
        />
        <Suspense fallback={<AppLoading />}>
          <AppRouter />
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
