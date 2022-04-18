import { Grommet } from "grommet";
import { grommet } from 'grommet/themes';
import NFTWallsRoutes from './NFTWallsRoutes.js';
import './index.css';

function App() {
	return (
		<Grommet theme={grommet} >
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Varela Round" />
			<NFTWallsRoutes />
		</Grommet>
	);
}

export default App;