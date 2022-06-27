import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import GroupIcon from "@mui/icons-material/Group";
import CodeIcon from "@mui/icons-material/Code";
import Footer from "../../components/layout/Footer";

const DocumentPage: NextPage = () => {
	const sx = { px: "50px", py: "40px", m: 3, display: "flex", flexDirection: "column", minWidth: { xs: "auto", sm: "260px" }, maxWidth: { xs: "100%", sm: "260px" } };
	const cardUser = (
		<>
			<Link href="documents/user" passHref>
				<Button color="success" variant="contained" size="large" sx={{ ...sx }}>
					<GroupIcon sx={{ fontSize: "3em", display: "block" }} />
					<Typography sx={{ mt: 1, fontWeight: "bold" }}>User Guide</Typography>
					<Typography color="GrayText" fontSize="smaller" sx={{ mt: 1 }}>
						&nbsp;
					</Typography>
				</Button>
			</Link>
		</>
	);

	const cardDev = (
		<>
			<Link href="documents" passHref>
				<Button color="secondary" variant="outlined" size="large" sx={{ ...sx }}>
					<CodeIcon sx={{ fontSize: "3em", display: "block" }} />
					<Typography sx={{ mt: 1, fontWeight: "bold" }}>Developer Guide</Typography>
					<Typography color="GrayText" fontSize="smaller" sx={{ mt: 1 }}>
						{"(Coming Soon)"}
					</Typography>
				</Button>
			</Link>
		</>
	);
	return (
		<>
			<Container sx={{ mt: 0,}}>
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 90px)", maxWidth: { xs: "100%", sm: "auto" }, flexDirection: "column" }}>
					<Box sx={{ display: "flex", justifyContent: "center", flexDirection: { md: "row", xs: "column" } }}>
						{cardUser}
						{cardDev}
					</Box>
					<Box sx={{ mt: 2 }}>
						<Link href="/" passHref>
							<Button color="primary" variant="outlined">
								Home
							</Button>
						</Link>
					</Box>
				</Box>
			</Container>
			<Footer />
		</>
	);
};

export default DocumentPage;
