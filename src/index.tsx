import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

// The SkipLink component provides a hidden "Skip to main content" link that becomes visible when focused.
// This allows keyboard and screen reader users to bypass repetitive navigation and quickly jump to the main content.
function SkipLink() {
  return (
    <a
      href="#main"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        zIndex: 999,
      }}
      onFocus={(e) => {
        e.currentTarget.style.position = "static";
        e.currentTarget.style.width = "auto";
        e.currentTarget.style.height = "auto";
      }}
      onBlur={(e) => {
        e.currentTarget.style.position = "absolute";
        e.currentTarget.style.width = "1px";
        e.currentTarget.style.height = "1px";
      }}
    >
      Skip to main content
    </a>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <SkipLink />
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
