import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectInvestor from "./pages/ProjectInvestor";
import ProjectEndUser from "./pages/ProjectEndUser";


function Router() {
  return (
    <Switch>
      <Route path={""} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route path={"/river-district"}>
        {() => <ProjectInvestor projectId="river-district" />}
      </Route>
      <Route path={"/river-district/end-users"}>
        {() => <ProjectEndUser projectId="river-district" />}
      </Route>
      <Route path={"/lumia-lagoon"}>
        {() => <ProjectInvestor projectId="lumia-lagoon" />}
      </Route>
      <Route path={"/lumia-lagoon/end-users"}>
        {() => <ProjectEndUser projectId="lumia-lagoon" />}
      </Route>
      {/* Dynamic project routes */}
      <Route path={"/:projectId/end-users"}>
        {({ projectId }: { projectId: string }) => <ProjectEndUser projectId={projectId} />}
      </Route>
      <Route path={"/:projectId"}>
        {({ projectId }: { projectId: string }) => <ProjectInvestor projectId={projectId} />}
      </Route>
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
        defaultTheme="light"
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
