import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import lvqFlowEnSvg from "../public/LVQ-Flow-FlowEN.drawio.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { useContextAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ScienceIcon from '@mui/icons-material/Science';

const Home: NextPage = () => {
	const [isInit, setIsInit] = useState(false);
	const [getStartUrl, setGetStartUrl] = useState<string | null>(null);

	const auth = useContextAuth();
	const router = useRouter();

	const getStartHandler = () => {
		if (getStartUrl) router.push(getStartUrl);
	};

	const documentHandler = () => {
		router.push("/documents");
	};

	useEffect(() => {
		if (auth.isLogin) {
			router.replace("/auth");
			setGetStartUrl("/auth");
		} else {
			setGetStartUrl("/auth");
		}
		setIsInit(true);
	}, [auth.isLogin, router]);

	const getStartBtn = (
		<Button onClick={getStartHandler} startIcon={<ScienceIcon />} color="success" variant="contained" size="large" sx={{ fontWeight: "bold" }}>
			Get Start
		</Button>
	);

	const documentBtn = (
		<Button onClick={documentHandler} startIcon={<MenuBookRoundedIcon />} color="info" variant="contained" size="large" sx={{ fontWeight: "bold" }}>
			Documents
		</Button>
	);

	if (!isInit || auth.isLogin) {
		return <></>;
	}

	return (
		<>
			<Head>
				<title>LVQ - Home</title>
			</Head>
			<Container maxWidth="lg">
				<Box sx={{ mt: 6, textAlign: "center", cursor: "default" }}>
					<Typography variant="h1" sx={{ fontWeight: "bold" }}>
						LVQ
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: "normal" }}>
						LINE Virtual Queue
					</Typography>
				</Box>

				<Stack sx={{ my: 6, textAlign: "center" }} direction="row" spacing={1} justifyContent="center">
					{documentBtn}
					{getStartBtn}
				</Stack>

				<Box sx={{ textAlign: "center" }}>
					<MoreHorizIcon fontSize="large" />
				</Box>

				<Box sx={{ my: 6, display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
					<Typography variant="h2" sx={{ mb: 3 }}>
						Work Flow
					</Typography>
					<Image src={lvqFlowEnSvg} alt="Flow Chart" />
				</Box>

				<Box sx={{ textAlign: "center" }}>
					<MoreHorizIcon fontSize="large" />
				</Box>

				<Stack sx={{ my: 6, textAlign: "center" }} direction="row" spacing={1} justifyContent="center">
					{documentBtn}
					{getStartBtn}
				</Stack>

				<Box sx={{ textAlign: "center", py: 2, px: 2, position: "fixed", right: 0, bottom: 0 }}>
					<Typography variant="caption" sx={{ color: "#aaa" }}>
						Coming Soon
					</Typography>
					<br />
					{/* <Link href="https://github.com/stars/Pang25441/lists/line-virtual-queue" target="_blank" underline="none"> */}
					<Button startIcon={<GitHubIcon />} color="secondary" variant="contained" disabled>
						Source Code
					</Button>
					{/* </Link> */}
				</Box>
			</Container>
		</>
	);
};

export default Home;
