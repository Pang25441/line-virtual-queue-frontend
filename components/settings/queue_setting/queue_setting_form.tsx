import { Box } from "@mui/material";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { OriginProps } from "next/document";
import React from "react";
import QueueSetting from "../../../models/QueueSetting";

interface Props extends OriginProps {
  queueSetting: QueueSetting
}

const QueueSettingFrom: React.FC<Props> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    });
  };

  return <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}></Box>;
};

export default QueueSettingFrom;
