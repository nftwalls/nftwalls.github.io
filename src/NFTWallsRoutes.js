import { useEffect } from "react";
import { Route, HashRouter, Routes, HashRouter } from "react-router-dom";

import ReactGA from "react-ga";

import NFTWallsAbout from "./NFTWallsAbout.js";
import NFTWallsCreator from "./NFTWallsCreator.js";

const TRACKING_ID = "G-V7KB62EYZY";
ReactGA.initialize(TRACKING_ID);

const NFTWallsRoutes = () => {
	useEffect(() => {
		console.log(window.location.pathname + window.location.search)
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

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
