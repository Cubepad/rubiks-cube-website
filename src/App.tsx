import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantinex/mantine-logo/styles.css";

import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { HeaderSimple } from "./HeaderSimple";
import { Hero } from "./Hero";
import {
  MantineProvider,
  createTheme,
  AppShell,
  Container,
} from "@mantine/core";
import { Footer } from "./Footer";
import { WhyLearn } from "./WhyLearn";
import  WhyLearnExtended  from "./WhyLearnExtended";
import { RubiksHistory } from "./RubiksHistory";
import  Timer  from "./Timer";

import CubeNotations from "./CubeNotation";
import CubeStructure from "./CubeStructure";

import Tutorials from "./Tutorials.tsx";
import CrossStep from "./CrossStep.tsx";

import RLAlg from "./RLAlg.tsx";
import RLExplanation from "./RLExplanation.tsx";
import F2lEdges from "./F2LEdges.tsx";

import YellowCross from "./YellowCross.tsx";
import YellowEdges from "./YellowEdges.tsx";
import YellowCorners from "./YellowCorners.tsx"
import FinalStep from "./FinalStep.tsx";
import SolveVideo from "./SolveVideo.tsx";

import ScrollToTop from "./ScrollToTop";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

const theme = createTheme({
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  headings: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  },
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Router>
        <ScrollToTop />
        <AppShell padding="md">
          <Container style={{ paddingBottom: "3.75rem" }}>
            <HeaderSimple />
          </Container>
          <AppShell.Main
            style={{
              backgroundColor: "var(--mantine-color-body)",
              marginBottom: "23rem",
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Routes>
              <Route path="/" element={<>
                <Hero />
                <WhyLearn />
                <RubiksHistory />
              </>} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/why-learn" element={<WhyLearnExtended />} />
              <Route path="/cube-basics" element={<>
                <CubeStructure />
                <CubeNotations />
              </>} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/3x3" element={<Outlet />}>
                <Route path="cross" element={<CrossStep />} />
                <Route path="f2l" element={<>
                  <RLAlg />
                  <RLExplanation />
                  <F2lEdges />
                </>} />
                <Route path="last-layer" element={<>
                  <YellowCross />
                  <YellowEdges />
                  <YellowCorners />
                  <FinalStep />
                  <SolveVideo />
                </>} />
              </Route>
            </Routes>
          </AppShell.Main>
          <AppShell.Footer style={{ zIndex: "-1", border: "none" }}>
            <Footer />
          </AppShell.Footer>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}