import { Image, Button, Card, CardHeader, CardFooter } from "grommet";

import { SiTwitter } from "react-icons/si";
import { FaInstagram, FaDiscord, FaGlobe } from "react-icons/fa";

const NFTWallsProjectCard = ({
	collection_image,
	twitter_username,
	instagram_username,
	website_link,
	discord_link,
	asset_count,
}) => {
	return (
		<Card width="60vh" background="light-1">
			<CardHeader>
				<Image fit="contain" src={collection_image} />
			</CardHeader>
			<CardFooter
				pad={{ vertical: "medium", horizontal: "medium" }}
				background="light-1"
				justify="center"
			>
				{[null, undefined].includes(twitter_username) ? (
					null
				) : (
					<Button href={`https://twitter.com/${twitter_username}`}>
						<SiTwitter />
					</Button>
				)}
				{[null, undefined].includes(instagram_username) ? (
					null
				) : (
					<Button href={`https://instagram.com/${instagram_username}`}>
						<FaInstagram />
					</Button>
				)}
				{[null, undefined].includes(discord_link) ? (
					null
				) : (
					<Button href={discord_link}>
						<FaDiscord />
					</Button>
				)}
				{[null, undefined].includes(website_link) ? (
					null
				) : (
					<Button href={website_link}>
						<FaGlobe />
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default NFTWallsProjectCard;
