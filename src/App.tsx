// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantinex/mantine-logo/styles.css";

import { HeaderSimple } from "./HeaderSimple";
import { Hero } from "./Hero";
import { MantineProvider, AppShell, Container } from "@mantine/core";
import { Footer } from "./Footer";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <AppShell padding="md">
        {/* Place HeaderSimple outside of AppShell.Header */}
        <Container style={{ paddingBottom: "3.75rem" }}>
          <HeaderSimple />
        </Container>
        <AppShell.Main style={{backgroundColor: "var(--mantine-color-body)", marginBottom: "23rem", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"}}>
          <Hero />
        </AppShell.Main>
        <AppShell.Footer style={{zIndex: "-1", border: "none"}}>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
