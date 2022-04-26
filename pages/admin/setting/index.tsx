import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Container from "@mui/material/Container";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import TabPanel from "../../../components/ui/TabPanel";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const QueueSetting: NextPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Head>
        <title>LVQ - Account Setting</title>
        <meta name="description" content="Account Settings" />
      </Head>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          marginTop: 4,
        }}
      >
        Account Settings
      </Typography>
      <Box
        sx={{
          marginTop: 4,
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="LINE Setting" {...a11yProps(1)} />
          <Tab label="Ticket Group" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Box>
    </Container>
  );
};

export default QueueSetting;
