import ReactDOM from "react-dom/client";
import App from "./App";
import BlogsProvider from "./contexts/BlogsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const query = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={query}>
    <BlogsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogsProvider>
  </QueryClientProvider>
);
