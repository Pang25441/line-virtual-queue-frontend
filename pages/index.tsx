import type { NextPage } from "next";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useContextAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useContextLang } from "../contexts/LangContext";
import Head from "next/head";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ScienceIcon from "@mui/icons-material/Science";
import LangChanger from "../components/ui/LangChanger";
import lvqFlowEn from "../public/LVQ-Flow-FlowEN.drawio.svg";
import lvqFlowTh from "../public/LVQ-Flow-FlowTH.drawio.svg";

const Home: NextPage = () => {
	const [isInit, setIsInit] = useState(false);
	const [getStartUrl, setGetStartUrl] = useState<string | null>(null);
	const [flowImage, setFlowImage] = useState<any>();

	const auth = useContextAuth();
	const router = useRouter();
	const lang = useContextLang();

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

	useEffect(() => {
		switch (lang.currentLanguage.toLowerCase()) {
			case "th":
				setFlowImage(lvqFlowTh);
				break;
			default:
				setFlowImage(lvqFlowEn);
		}
	}, [lang.currentLanguage]);

	const getStartBtn = (
		<Button onClick={getStartHandler} startIcon={<ScienceIcon />} color="success" variant="contained" size="large" sx={{ fontWeight: "bold" }}>
			{lang.common.indexPage.buttonLabel.demo || "Demo"}
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

				<Box sx={{ my: 6, display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center", justifyItems: "center" }}>
					<Typography variant="h2" sx={{ mb: 3 }}>
						Work Flow
					</Typography>
					<Box sx={{display: "flex",flexDirection: "row", justifyContent: "center"}}>
						{flowImage && <Image src={flowImage} alt="Flow Chart" layout="fixed" width={571} priority />}
					</Box>
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

				<Box sx={{ textAlign: "center", py: 2, px: 2, position: "fixed", right: 0, top: 0 }}>
					<LangChanger />
				</Box>
			</Container>
		</>
	);
};

export default Home;
