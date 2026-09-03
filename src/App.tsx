import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SpeakersPage from "./pages/SpeakersPage";
import SpeakerDetailPage from "./pages/SpeakerDetailPage";
import "./App.css";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import VenuePage from "./pages/VenuePage";
import Archive from "./pages/Archive";
import AgendaPage from "./pages/AgendaPage";
import SponsorsPage from "./pages/SponsorsPage";
import ApplyPage from "./pages/ApplyPage";
import HomeHeader from "./components/HomeHeader";
import BecomeASponsorPage from "./pages/BecomeASponsorPage";
import SmoothScroll, { useLenis } from "./components/SmoothScroll";
import PrivacyAndTerms from "./pages/PrivacyAndTerms";

function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // A deep link carries its own destination — `useScrollToHash` owns the
    // scroll for those, and jumping to the top here would fight it.
    if (location.hash) return;

    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location, lenis]);

  return null;
}

function AppHeader() {
  const location = useLocation();
  return location.pathname === "/" ? <HomeHeader /> : <Header />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col relative ">
        <SmoothScroll>
          <ScrollToTop />
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route
              path="/speakers/:speakerId"
              element={<SpeakerDetailPage />}
            />
            <Route path="/venue/:cityId" element={<VenuePage />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/become-a-sponsor" element={<BecomeASponsorPage />} />
            <Route path="/privacy-and-terms" element={<PrivacyAndTerms />} />
          </Routes>
          <Footer />
        </SmoothScroll>
      </div>
    </Router>
  );
}

export default App;
