import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Container from "@mui/material/Container";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import TabPanel from "../../../components/ui/TabPanel";
import QueueSettingFrom from "../../../components/settings/QueueSetting/QueueSettingForm";
import QueueSetting from "../../../models/QueueSetting";
import LineConfigForm from "../../../components/settings/LineSetting/LineConfigForm";
import LineConfig from "../../../models/LineConfig";
import TicketGroupForm from "../../../components/settings/TicketGroup/TicketGroupForm";
import TicketGroup from "../../../models/TicketGroup";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const LINE_CONFIG_DUMMY: LineConfig = {
  id: 1,
  line_id: "@abcd",
  channel_id: "12345678",
  channel_access_token: "asjhqibfsbdfasfasfasf",
  login_channel_id: "6543210"
};

const QUEUE_SETTING_DUMMY: QueueSetting = {
  id: 1,
  user_id: 1,
  display_name: "Queue Setting Dummy",
  detail: "Queue Setting Detail",
  line_config_id: 1,
};

const TICKET_GROUP_LIST: TicketGroup[] = [
  {id:1, queue_setting_id:1, ticket_group_code:'hsmdtgras', ticket_group_prefix:'A', active_count:11, active:0, description:'', updated_at: ''},
  {id:2, queue_setting_id:1, ticket_group_code:'5h6wbtby3', ticket_group_prefix:'B', active_count:35, active:0, description:'', updated_at: ''},
  {id:3, queue_setting_id:1, ticket_group_code:'gfhjlhsdc', ticket_group_prefix:'C', active_count:12, active:1, description:'', updated_at: ''},
  {id:4, queue_setting_id:1, ticket_group_code:'xmys54esr', ticket_group_prefix:'D', active_count:90, active:0, description:'', updated_at: ''},
];

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
          <Tab label="Line Configuration" sx={{ alignSelf: "end" }} {...a11yProps(0)} />
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
            <TicketGroupForm ticketGroups={TICKET_GROUP_LIST}></TicketGroupForm>
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
