import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Container from "@mui/material/Container";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import TabPanel from "../../../components/ui/TabPanel";
import QueueSettingFrom from "../../../components/settings/QueueSetting/QueueSettingForm";
import LineConfigForm from "../../../components/settings/LineSetting/LineConfigForm";
import TicketGroupComponent from "../../../components/settings/TicketGroup/TicketGroupComponent";
import TicketGroupContextProvider from "../../../contexts/TicketGroupContext";
import CalendarSettingComponent from "../../../components/settings/CalendarSetting/CalendarSettingComponent";

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const QueueSettingPage: NextPage = () => {
	const [value, setValue] = React.useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Container component="main" maxWidth="lg">
			<Head>
				<title>LVQ - Account Setting</title>
				<meta name="description" content="Account Settings" />
			</Head>
			<Typography component="h1" variant="h5" sx={{ marginTop: 4 }}>
				Account Settings
			</Typography>
			<Box sx={{ marginTop: 4, flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
				<Tabs orientation="vertical" variant="standard" value={value} onChange={handleTabChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
					<Tab label="Line Configuration" sx={{ alignSelf: "end" }} {...a11yProps(0)} />
					<Tab label="Account Detail" sx={{ alignSelf: "end" }} {...a11yProps(1)} />
					<Tab label="Ticket Group" sx={{ alignSelf: "end" }} {...a11yProps(2)} />
					<Tab label="Booking Calendar" sx={{ alignSelf: "end" }} {...a11yProps(3)} />
				</Tabs>
				<Box sx={{ flexGrow: 1 }}>
					<TabPanel value={value} index={0}>
						<LineConfigForm />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<QueueSettingFrom />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<TicketGroupContextProvider>
							<TicketGroupComponent></TicketGroupComponent>
						</TicketGroupContextProvider>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<CalendarSettingComponent />
					</TabPanel>
				</Box>
			</Box>
		</Container>
	);
};

export default QueueSettingPage;
