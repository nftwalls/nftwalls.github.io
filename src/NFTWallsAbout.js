import {
	Anchor,
	Box,
	Card,
	CardBody,
	Heading,
	Image,
	Main,
	Paragraph,
} from "grommet";

import NFTWallsNavbar from "./NFTWallsNavbar";
import NFTWallsFooter from "./NFTWallsFooter";

const NFTWallsAbout = () => {
	return (
		<Box>
			<NFTWallsNavbar />
			<Main pad="xlarge" gap="large">
				<Box
					direction="row-responsive"
					justify="center"
					pad="medium"
					gap="xlarge"
				>
					<Box justify="center">
						<Card width="medium" height="medium" background="light-1">
							<CardBody>
								<Image
									fit="contain"
									src={"https://paranormies.io/imagedata/Sincere_Mailbox.png"}
								/>
							</CardBody>
						</Card>
					</Box>
					<Box justify="center" direction="row">
						<Paragraph size="medium">
							<Heading level="3">
								GM, thanks for checking out NFTWalls! 🎨🧱
							</Heading>
							The idea of NTFWalls came to me when I bought my first NFT
							(shoutout{" "}
							<Anchor href="https://paranormies.io" target="_blank">
								Paranormies
							</Anchor>
							!). I thought it would be cool to have a website that could
							dynamically generate wallpapers based on NFTs so that you could
							rock these awesome pieces of art on your phone. Feel free to{" "}
							<Anchor href="https://twitter.com/UjjuSinghania" target="_blank">
								reach out to me
							</Anchor>{" "}
							if you have any suggestions, or want me to add support for your
							favorite project 😊 Going to try and add new collections and
							features as and when I get time!
							<br />
							<br />
							Also, my wallet address is linked above if you're feeling
							generous! Always love contributing to new communities and projects. Any and all allowlists are highly appreciated.
						</Paragraph>
					</Box>
				</Box>
			</Main>
			<NFTWallsFooter />
		</Box>
	);
};

export default NFTWallsAbout;
