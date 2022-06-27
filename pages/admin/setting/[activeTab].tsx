import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";

import Container from "@mui/material/Container";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import TabPanel from "../../../components/ui/TabPanel";
import QueueSettingFrom from "../../../components/settings/QueueSetting/QueueSettingForm";
import LineConfigForm from "../../../components/settings/LineSetting/LineConfigForm";
import TicketGroupComponent from "../../../components/settings/TicketGroup/TicketGroupComponent";
import TicketGroupContextProvider from "../../../contexts/TicketGroupContext";
import CalendarSettingComponent from "../../../components/settings/CalendarSetting/CalendarSettingComponent";
import { useContextAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useContextLang } from "../../../contexts/LangContext";
import Topbar from "../../../components/layout/Topbar";

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const tabIdentify = ["line", "account", "ticket"];

const QueueSettingPage: NextPage = () => {
	const [value, setValue] = React.useState(0);

	const auth = useContextAuth();
	const lang = useContextLang();
	const router = useRouter();

	const { activeTab } = router.query;

	useEffect(() => {
		// console.log(router)
		const needle: string = activeTab?.toString() || "";
		const tabValue = tabIdentify.indexOf(needle);

		if (tabValue > -1) setValue(tabValue);
	}, [activeTab]);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		// console.log("handleTabChange", newValue);
		// setValue(newValue);
		router.replace("/admin/setting/" + tabIdentify[newValue], undefined, { shallow: true });
	};

	if (!auth.isLogin) {
		router.push("/auth");
		return null;
	}

	const head = (
		<Head>
			<title>LVQ - Account Setting</title>
			<meta name="description" content="Account Settings" />
		</Head>
	);

	return (
		<>
			<Topbar />
			<Container component="main" maxWidth="lg">
				{head}
				<Typography component="h1" variant="h5" sx={{ marginTop: 4 }}>
					Account Settings
				</Typography>
				<Box sx={{ marginTop: 4, flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
					<Tabs orientation="vertical" variant="standard" value={value} onChange={handleTabChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
						<Tab label={lang.admin.lineConfig.heading} sx={{ alignSelf: "end" }} {...a11yProps(0)} />
						<Tab label={lang.admin.queueSetting.heading} sx={{ alignSelf: "end" }} {...a11yProps(1)} />
						<Tab label={lang.admin.ticketGroup.heading} sx={{ alignSelf: "end" }} {...a11yProps(2)} />
						{/* <Tab label="Booking Calendar" sx={{ alignSelf: "end" }} {...a11yProps(3)} /> */}
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
		</>
	);
};

export default QueueSettingPage;
