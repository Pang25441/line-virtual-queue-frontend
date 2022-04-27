import { Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { OriginProps } from "next/document";
import React from "react";
import LineConfig from "../../../models/LineConfig";

interface Props extends OriginProps {
  lineConfig: LineConfig;
}

const LineConfigForm: React.FC<Props> = (props) => {
  const { lineConfig } = props;
  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" component="p" sx={{ my: 2 }}>
        LINE ID
      </Typography>
      <TextField type="text" value={lineConfig.line_id} label="" variant="outlined" disabled fullWidth></TextField>
      <Typography variant="subtitle2" component="p" sx={{ mt: 3 }}>
        Field description
      </Typography>

      <Divider sx={{ my: 3 }}></Divider>

      <Typography variant="h5" component="p" sx={{ my: 2 }}>
        Channel Id
      </Typography>
      <TextField type="password" value={lineConfig.channel_id} label="" variant="outlined" disabled fullWidth></TextField>
      <Typography variant="subtitle2" component="p" sx={{ mt: 3 }}>
        Field description
      </Typography>

      <Divider sx={{ my: 3 }}></Divider>

      <Typography variant="h5" component="p" sx={{ my: 2 }}>
        Channel Access Token
      </Typography>
      <TextField type="password" value={lineConfig.channel_access_token} label="" variant="outlined" disabled fullWidth></TextField>
      <Typography variant="subtitle2" component="p" sx={{ mt: 3 }}>
        Field description
      </Typography>

      <Divider sx={{ my: 3 }}></Divider>

      <Typography variant="h5" component="p" sx={{ my: 2 }}>
        LINE Login Channel Id
      </Typography>
      <TextField type="password" value={lineConfig.login_channel_id} label="" variant="outlined" disabled fullWidth></TextField>
      <Typography variant="subtitle2" component="p" sx={{ mt: 3 }}>
        Field description
      </Typography>
    </Box>
  );
};

export default LineConfigForm;
