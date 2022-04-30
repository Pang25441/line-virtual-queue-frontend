import { Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { OriginProps } from "next/document";
import React, { Fragment } from "react";
import { LangAdminDesc } from "../../../lang/en/admin";
import LineConfig from "../../../models/LineConfig";
import TabHeading from "../../layout/TabHeading";

interface Props extends OriginProps {
	lineConfig: LineConfig;
}

const LineConfigForm: React.FC<Props> = (props) => {
	const { lineConfig } = props;

	const fieldLabelMargin = 3;
	const fieldDescMargin = 2;
	const dividerMargin = 3;

	const emptyOutput = (
		<Box component="div" sx={{ mt: 1 }}>
			<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin, alignContent: "center" }}>
				{LangAdminDesc.listDataEmpty}
			</Typography>
		</Box>
	);

	const heading = <TabHeading heading="LINE Configuration"></TabHeading>;

	if (!lineConfig) {
		return (
			<Fragment>
				{heading}
				{emptyOutput}
			</Fragment>
		);
	}

	return (
		<Fragment>
			{heading}
			<Box component="form" noValidate sx={{ mt: 1 }}>
				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					LINE ID
				</Typography>
				<TextField type="text" value={lineConfig.line_id} label="" variant="outlined" disabled fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{LangAdminDesc.lineConfig.line_id}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					Channel Id
				</Typography>
				<TextField type="password" value={lineConfig.channel_id} label="" variant="outlined" disabled fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{LangAdminDesc.lineConfig.channel_id}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					Channel Access Token
				</Typography>
				<TextField type="password" value={lineConfig.channel_access_token} label="" variant="outlined" disabled fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{LangAdminDesc.lineConfig.channel_access_token}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					LINE Login Channel Id
				</Typography>
				<TextField type="password" value={lineConfig.login_channel_id} label="" variant="outlined" disabled fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{LangAdminDesc.lineConfig.login_channel_id}
				</Typography>
			</Box>
		</Fragment>
	);
};

export default LineConfigForm;
