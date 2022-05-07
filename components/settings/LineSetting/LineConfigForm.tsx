import { CircularProgress, Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import OriginProps from "../../../models/util/OriginProps";
import React, { Fragment, useEffect, useState } from "react";
import LineConfig from "../../../models/LineConfig";
import TabHeading from "../../layout/TabHeading";
import { useContextLang } from "../../../contexts/LangContext";

const LINE_CONFIG_DUMMY: LineConfig = {
	id: 1,
	line_id: "@abcd",
	channel_id: "12345678",
	channel_access_token: "asjhqibfsbdfasfasfasf",
	login_channel_id: "6543210",
};

interface Props extends OriginProps {}

const LineConfigForm: React.FC<Props> = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [lineConfig, setLineConfig] = useState<LineConfig | null>(null);

	const lang = useContextLang();

	useEffect(() => {
		// Loading Config
		setLineConfig(LINE_CONFIG_DUMMY);
		setIsLoading(false);
	}, []);

	const fieldLabelMargin = 3;
	const fieldDescMargin = 2;
	const dividerMargin = 3;

	const emptyOutput = (
		<Box component="div" sx={{ mt: 1 }}>
			<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin, alignContent: "center" }}>
				{lang.admin.listDataEmpty}
			</Typography>
		</Box>
	);

	const heading = <TabHeading heading="LINE Configuration"></TabHeading>;

	if (isLoading) {
		return (
			<Fragment>
				{heading}
				<Box component="div" sx={{ mt: 1, display: "flex" }}>
					<CircularProgress color="inherit" />
				</Box>
			</Fragment>
		);
	}

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
					{lang.admin.lineConfig.line_id}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					Channel Id
				</Typography>
				<TextField type="password" value={lineConfig.channel_id} label="" variant="outlined" disabled fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{lang.admin.lineConfig.channel_id}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					Channel Access Token
				</Typography>
				<TextField type="password" value={lineConfig.channel_access_token} label="" variant="outlined" disabled fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{lang.admin.lineConfig.channel_access_token}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					LINE Login Channel Id
				</Typography>
				<TextField type="password" value={lineConfig.login_channel_id} label="" variant="outlined" disabled fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{lang.admin.lineConfig.login_channel_id}
				</Typography>
			</Box>
		</Fragment>
	);
};

export default LineConfigForm;
