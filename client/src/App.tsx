import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import RiverDistrict from "./pages/RiverDistrict";
import MostakbalCity from "./pages/MostakbalCity";
import NewCapital from "./pages/NewCapital";
import NorthCoast from "./pages/NorthCoast";
import NewZayed from "./pages/NewZayed";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      {/* Landing Pages - All read from content.json */}
      <Route path="/river-district" component={RiverDistrict} />
      <Route path="/mostakbal-city" component={MostakbalCity} />
      <Route path="/new-capital" component={NewCapital} />
      <Route path="/north-coast" component={NorthCoast} />
      <Route path="/new-zayed" component={NewZayed} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
