import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Theme from "../../theme/Theme";
import AppAppBar from "./AppAppBar";
import Hero from "./Hero";
import LogoCollection from "./LogoCollection";
import Highlights from "./Highlights";
import Pricing from "./Pricing";
import Features from "./Features";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Footer from "./Footer";

export default function Branding() {
  return (
    <Theme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </Theme>
  );
}
