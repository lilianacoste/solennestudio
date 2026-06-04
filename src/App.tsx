import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import WeddingPage from "@/pages/wedding";
import HospitalityPage from "@/pages/hospitality";
import AetherPage from "@/pages/aether";
import CustomSoftwarePage from "@/pages/custom-software";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wedding" component={WeddingPage} />
      <Route path="/hospitality" component={HospitalityPage} />
      <Route path="/aether" component={AetherPage} />
      <Route path="/custom-software" component={CustomSoftwarePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
