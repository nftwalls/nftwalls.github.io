import { Header, Nav, Anchor, Box, Tip } from "grommet";
import { useState } from "react";

const NFTWallsNavbar = () => {
	const [walletMessage, setWalletMessage] = useState("👾 wallet address");

	return (
		<Header>
			<Nav direction="row" pad="medium" fill={true} justify="center">
				<Box pad="small" justify="center">
					<Anchor size="large" color="black" label="🎨  creator" href="#/" />
				</Box>
				<Box pad="small" justify="center">
					<Anchor size="large" color="black" label="🙋🏻‍♂️ about" href="#/about" />
				</Box>
				<Box pad="small" justify="end" round="large">
					<Tip content="Click to copy address">
						<Anchor
							size="large"
							color="black"
							label={walletMessage}
							onClick={() => {
								setWalletMessage("📄 address copied");
								navigator.clipboard.writeText(
									"0x9b7B206b63B1478D5E3f59627617702c4DFa1555"
								);
								setTimeout(() => setWalletMessage("👾 wallet address"), 2000);
							}}
						/>
					</Tip>
				</Box>
			</Nav>
		</Header>
	);
};

export default NFTWallsNavbar;
