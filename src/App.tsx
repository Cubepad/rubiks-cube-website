import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantinex/mantine-logo/styles.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HeaderSimple } from "./HeaderSimple";
import { Hero } from "./Hero";
import { MantineProvider, createTheme, AppShell, Container } from "@mantine/core";
import { Footer } from "./Footer";
import { WhyLearn } from "./WhyLearn";
import { RubiksHistory } from "./RubiksHistory";
import { Timer } from "./Timer";
import CubeNotations from "./CubeNotation";
import CubeStructure from "./CubeStructure";
import ScrollToTop from "./ScrollToTop";
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Inter, sans-serif' },
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
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <WhyLearn />
                    <RubiksHistory />
                  </>
                }
              />
              <Route path="/timer" element={<Timer />} />
              <Route 
                path="/cube-basics" 
                element={
                  <>
                    <CubeStructure />
                    <CubeNotations />
                  </>
                }
              />
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
