import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Footer from "@/components/Footer";

import { RouteChangeProvider } from "@/services/providers/RouteChangeProvider";
import { LocationProvider } from "@/services/providers/LocationProvider";
import Toast from "@/components/Toast";

const LayoutPage = () => {
  return (
    <LocationProvider>
      <RouteChangeProvider>
        {/* Toast for Notifications */}
        <Toast />

        <div className="flex justify-center items-center">
          {/* For React Router to render children components */}
          <div className="flex max-w-[62rem] w-full pt-[2rem] sm:pt-[140px] font-light justify-center items-center flex-col relative">
            {/* Navigation Bar (Upper Most Bar) */}
            <Navbar />

            {/* Top Title Bar (Go Back, Search, Sort etc.) */}
            <Topbar />

            {/* CarDetails, TradeInForm will be rendered here */}
            {/* Animate route changes in the Outlet */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </RouteChangeProvider>
    </LocationProvider>
  );
};

export default LayoutPage;
