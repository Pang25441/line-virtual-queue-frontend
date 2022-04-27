import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Container from "@mui/material/Container";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import TabPanel from "../../../components/ui/TabPanel";
import QueueSettingFrom from "../../../components/settings/queue_setting/queue_setting_form";
import QueueSetting from "../../../models/QueueSetting";
import LineConfigForm from "../../../components/settings/line_setting/line_config_form";
import LineConfig from "../../../models/LineConfig";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const QUEUE_SETTING_DUMMY: QueueSetting = {
  id: 1,
  user_id: 1,
  display_name: "Queue Setting Dummy",
  detail: "Queue Setting Detail",
  line_config_id: 1,
};

const LINE_CONFIG_DUMMY: LineConfig = {
  id: 1,
  line_id: "@abcd",
  channel_id: "12345678",
  channel_access_token: "asjhqibfsbdfasfasfasf",
  login_channel_id: "6543210"
};

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
        <Tabs orientation="vertical" variant="standard" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab label="Line Setting" sx={{ alignSelf: "end" }} {...a11yProps(0)} />
          <Tab label="Account Detail" sx={{ alignSelf: "end" }} {...a11yProps(1)} />
          <Tab label="Ticket Group" sx={{ alignSelf: "end" }} {...a11yProps(2)} />
          <Tab label="Booking Calendar" sx={{ alignSelf: "end" }} {...a11yProps(3)} />
        </Tabs>
        <Box sx={{ flexGrow: 1 }}>
          <TabPanel value={value} index={0}>
            <LineConfigForm lineConfig={LINE_CONFIG_DUMMY}></LineConfigForm>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <QueueSettingFrom onSaveQueueSetting={() => {}} queueSetting={QUEUE_SETTING_DUMMY}></QueueSettingFrom>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default QueueSetting;
