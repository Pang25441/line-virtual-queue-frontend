import { Box, Button, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import lvqFlowEnSvg from "../public/LVQ-Flow-FlowEN.drawio.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { useContextAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "../components/ui/Link";

const Home: NextPage = () => {
	const [isInit, setIsInit] = useState(false);
	const [getStartUrl, setGetStartUrl] = useState<string | null>(null);

	const auth = useContextAuth();
	const router = useRouter();

	const getStartHandler = () => {
		if (getStartUrl) router.push(getStartUrl);
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
		<Box sx={{ my: 6, textAlign: "center" }}>
			<Button onClick={getStartHandler} variant="contained" size="large" sx={{ fontWeight: "bold" }}>
				Get Start
			</Button>
		</Box>
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

				{getStartBtn}

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

				{getStartBtn}
			</Container>
		</>
	);
};

export default Home;
