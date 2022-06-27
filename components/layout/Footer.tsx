import { Box, Button, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: React.FC = () => {
	return (
		<footer>
			<Box sx={{ display: "flex", flexDirection:{xs:"column",sm: "row"}, justifyContent: "space-between" }}>
				<Typography variant="body1" sx={{ lineHeight: "2.5em" }}>
					2022 Pontep Hiranrat
				</Typography>
				<Box>
					<Button href="https://github.com/Pang25441" target="_blank" startIcon={<GitHubIcon />} sx={{ fontSize: "smaller", textTransform: "none" }}>
						GitHub - Pang25441
					</Button>
					<Button href="https://line.me/ti/p/G6BC7a3wYD" target="_blank" sx={{ fontSize: "smaller", textTransform: "none" }}>
						LINE - Pang25441
					</Button>
				</Box>
			</Box>
		</footer>
	);
};

export default Footer;
