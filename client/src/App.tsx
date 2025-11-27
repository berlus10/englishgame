import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ModeSelect from "@/pages/mode-select";
import LevelSelect from "@/pages/level-select";
import Game from "@/pages/game";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/mode-select" component={ModeSelect} />
      <Route path="/level-select" component={LevelSelect} />
      <Route path="/game" component={Game} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
