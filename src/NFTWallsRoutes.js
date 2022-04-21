import { Route, HashRouter, Routes } from "react-router-dom";

import ReactGA from "react-ga4";

import NFTWallsAbout from "./NFTWallsAbout.js";
import NFTWallsCreator from "./NFTWallsCreator.js";

const TRACKING_ID = "G-V7KB62EYZY";
ReactGA.initialize([{
    trackingId: TRACKING_ID,
  }]);

const NFTWallsRoutes = () => {
	console.log(window.location)
	ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search});

	return (
		<HashRouter>
			<Routes>
				<Route path="/about" element={<NFTWallsAbout />} />
				<Route path="*" element={<NFTWallsCreator />} />
			</Routes>
		</HashRouter>
	);
};

export default NFTWallsRoutes;
