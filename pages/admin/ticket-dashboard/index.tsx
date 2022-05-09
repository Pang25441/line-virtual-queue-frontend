import { NextPage } from "next";
import React, { Fragment } from "react";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { useContextAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useContextLang } from "../../../contexts/LangContext";
import TicketDashboardComponent from "../../../components/ticket-dashboard/TicketDashboardComponent";
import TicketAdminContextProvider from "../../../contexts/TicketAdminContext";

const TicketDashboard: NextPage = () => {
	const auth = useContextAuth();
	const lang = useContextLang();
	const router = useRouter();

	if (!auth.isLogin) {
		router.push("/auth");
		return null;
	}

	const head = (
		<Head>
			<title>LVQ - {lang.common.menu.ticketDashboard}</title>
			<meta name="description" content={lang.common.menu.ticketDashboard} />
		</Head>
	);

	return (
		<Fragment>
			{head}
			<Container component="main" maxWidth="lg">
				{/* Heading */}
				<Box sx={{ marginTop: 12, marginBottom: 4 }}>
					<Typography component="h1" variant="h4">
						{lang.common.menu.ticketDashboard}
					</Typography>
				</Box>

				{/* Content */}
				<TicketAdminContextProvider>
					<TicketDashboardComponent></TicketDashboardComponent>
				</TicketAdminContextProvider>
			</Container>
		</Fragment>
	);
};

export default TicketDashboard;
