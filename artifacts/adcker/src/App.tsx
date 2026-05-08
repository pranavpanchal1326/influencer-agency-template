import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/Layout";
import { PageTransition } from "@/components/PageTransition";

import { Home } from "@/pages/Home";
import { Services } from "@/pages/Services";
import { OurWork } from "@/pages/OurWork";
import { About } from "@/pages/About";
import { CaseStudy } from "@/pages/CaseStudy";
import { Admin } from "@/pages/Admin";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location} location={location}>
        <Route path="/">
          <PageTransition><Home /></PageTransition>
        </Route>
        <Route path="/services">
          <PageTransition><Services /></PageTransition>
        </Route>
        <Route path="/our-work">
          <PageTransition><OurWork /></PageTransition>
        </Route>
        <Route path="/about">
          <PageTransition><About /></PageTransition>
        </Route>
        <Route path="/work/:slug">
          <PageTransition><CaseStudy /></PageTransition>
        </Route>
        <Route>
          <PageTransition><NotFound /></PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  if (isAdmin) return <Admin />;

  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
