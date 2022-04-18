import { Footer, Text } from "grommet";

const NFTWallsFooter = () => {
	return (
		<Footer
			background="light-1"
			pad="medium"
			alignContent="center"
            style={{
                position: "fixed",
                bottom: "0",
                width: "100%",
            }}
		>
            <Text weight="bold">🧱 NFTWalls</Text>
			<Text weight="bold">🤍☕️👨🏻‍💻 </Text>
		</Footer>
	);
};

export default NFTWallsFooter;
