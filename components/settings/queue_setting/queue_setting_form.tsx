import { Box, TextField, Typography } from "@mui/material";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { OriginProps } from "next/document";
import React from "react";
import QueueSetting from "../../../models/QueueSetting";
import Divider from "@mui/material/Divider";

interface Props extends OriginProps {
  onSaveQueueSetting: (data: any) => void;
  queueSetting: QueueSetting;
}

const QueueSettingFrom: React.FC<Props> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      display_name: data.get("display_name"),
      detail: data.get("detail"),
    });

    const queueSettingData = {
      display_name: data.get("display_name"),
      detail: data.get("detail"),
    };
    props.onSaveQueueSetting(queueSettingData);
  };

  const { queueSetting } = props;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" component="p" sx={{ my: 2 }}>
        Display Name
      </Typography>
      <TextField type="text" value={queueSetting.display_name} label="Required" variant="outlined" required fullWidth></TextField>
      <Typography variant="subtitle2" component="p" sx={{ mt: 3 }}>
        Field description
      </Typography>

      <Divider sx={{ my: 3 }}></Divider>

      <Typography variant="h5" component="p" sx={{ my: 2 }}>
        Description
      </Typography>
      <TextField type="text" value={queueSetting.detail} label="Required" variant="outlined" required fullWidth></TextField>
      <Typography variant="subtitle2" component="p" sx={{ mt: 3 }}>
        Field description
      </Typography>
      <Divider sx={{ my: 3 }}></Divider>
    </Box>
  );
};

export default QueueSettingFrom;
