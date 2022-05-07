import { NextPage } from "next";
import { Fragment } from "react";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import TicketGroupContextProvider from "../../../contexts/TicketGroupContext";

const Ticket: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>LVQ - Ticket</title>
			</Head>
			<Container component="main" maxWidth="lg">
				<Box sx={{ marginTop: 12 }}>
					<Typography component="h1" variant="h4">
						Ticket Groups
					</Typography>
				</Box>
				<Box sx={{ flexWrap: "wrap" }}>
					<TicketGroupContextProvider>
						
					</TicketGroupContextProvider>
				</Box>
			</Container>
		</Fragment>
	);
};

export default Ticket;
