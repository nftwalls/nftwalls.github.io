import { useState } from "react";

import { Box, Main, Text, Button, Select, TextInput, CheckBox } from "grommet";

import NFTWallsNavbar from "./NFTWallsNavbar";
import { getProjectInformation, getSupportedProjects } from "./NFTWallsHelper";
import NFTWallsFooter from "./NFTWallsFooter";
import NFTWallsProjectCard from "./NFTWallsProjectCard";

const queryString = require("query-string");

const NFTWallsCreator = () => {
	const [assetProject, setAssetProject] = useState(undefined);
	const [assetID, setAssetID] = useState("");
	const [bannerWanted, setBannerWanted] = useState(false);
	const [selectedProjectInformation, setSelectedProjectInformation] = useState(
		{}
	);

	const [projectOptions, setProjectOptions] = useState(() => {
		getSupportedProjects((api_response_status, api_response_data) => {
			setProjectOptions(api_response_data);
		});
		return {};
	});

	const getWallpaperURL = () => {
		try {
			const queryParams = queryString.stringify(
				{
					asset_id: assetID,
					asset_project_name: projectOptions[assetProject].contract_name,
					banner_needed: bannerWanted,
				},
				{ skipNull: true, skipEmptyString: true }
			);

			return `https://api.nftwalls.art/getWallpaper?${queryParams}`;
		} catch {
			return undefined;
		}
	};

	return (
		<Box>
			<NFTWallsNavbar />
			<Main pad="xlarge" gap="xlarge">
				<Box
					direction="row-responsive"
					justify="center"
					pad="xlarge"
					gap="large"
				>
					<NFTWallsProjectCard
						collection_image={selectedProjectInformation.collection_image}
						twitter_username={selectedProjectInformation.twitter_username}
						instagram_username={selectedProjectInformation.instagram_username}
						website_link={selectedProjectInformation.website_link}
						discord_link={selectedProjectInformation.discord_link}
						asset_count={selectedProjectInformation.asset_count}
					/>
					<Box gap="medium" justify="center">
						<Box>
							<Select
								options={Object.keys(projectOptions)}
								value={assetProject}
								onChange={({ option }) => {
									setBannerWanted(false);
									setAssetProject(option);
									getProjectInformation(
										projectOptions[option].contract_name,
										(api_response_status, api_response_data) => {
											setSelectedProjectInformation(api_response_data);
										}
									);
								}}
								placeholder="Select Project"
							/>
						</Box>
						<Box>
							<TextInput
								disabled={assetProject === undefined}
								placeholder="Asset ID"
								value={assetID}
								onChange={(event) => setAssetID(event.target.value)}
							/>
						</Box>
						<Box gap="large" direction="row-responsive" justify="end">
							{projectOptions[assetProject] === undefined ? (
								<></>
							) : projectOptions[assetProject].banner_supported ? (
								<CheckBox
									checked={bannerWanted}
									label="Want Project Banner?"
									onChange={(event) => setBannerWanted(event.target.checked)}
								/>
							) : (
								<></>
							)}
							<Button
								primary
								size="large"
								label={<Text alignSelf="center" weight="bold">create wall</Text>}
								color="black"
								target="_blank"
								disabled={assetID === "" || assetProject === undefined}
								href={getWallpaperURL()}
							/>
						</Box>
					</Box>
				</Box>
			</Main>
			<NFTWallsFooter />
		</Box>
	);
};

export default NFTWallsCreator;
