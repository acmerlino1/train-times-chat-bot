import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "./App.css";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <ChatBot />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
