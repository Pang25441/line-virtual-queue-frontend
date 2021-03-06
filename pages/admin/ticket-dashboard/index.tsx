import { NextPage } from "next";
import React, { Fragment, useState } from "react";
import Head from "next/head";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useContextAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useContextLang } from "../../../contexts/LangContext";
import TicketDashboardComponent from "../../../components/ticket-dashboard/TicketDashboardComponent";
import TicketAdminContextProvider from "../../../contexts/TicketAdminContext";
import Topbar from "../../../components/layout/Topbar";
import Footer from "../../../components/layout/Footer";

const TicketDashboard: NextPage = () => {
	const [progress, setProgress] = useState<number>(0);
	const auth = useContextAuth();
	const lang = useContextLang();
	const router = useRouter();

	if (!auth.isLogin) {
		router.push("/auth");
		return null;
	}

	const countdownHandler = (value: number) => {
		setProgress((prevState) => {
			if (prevState > value || prevState === 0) {
				return value;
			}

			return prevState;
		});
	};

	const head = (
		<Head>
			<title>LVQ - {lang.common.menu.ticketDashboard}</title>
			<meta name="description" content={lang.common.menu.ticketDashboard} />
		</Head>
	);

	return (
		<Fragment>
			<Topbar />
			{head}
			<Container component="main" maxWidth="lg" sx={{minHeight:"calc(100vh - 180px)"}}>
				{/* Heading */}
				<Box sx={{ marginTop: 12, marginBottom: 4 }}>
					<Typography component="h1" variant="h4">
						{lang.common.menu.ticketDashboard}
						<CircularProgress sx={{ marginLeft: 2 }} variant="determinate" color="info" thickness={6} size={20} value={progress} />
					</Typography>
				</Box>

				{/* Content */}
				<TicketAdminContextProvider>
					<TicketDashboardComponent onCountdownUpdate={countdownHandler}></TicketDashboardComponent>
				</TicketAdminContextProvider>
			</Container>
			<Footer />
		</Fragment>
	);
};

export default TicketDashboard;
