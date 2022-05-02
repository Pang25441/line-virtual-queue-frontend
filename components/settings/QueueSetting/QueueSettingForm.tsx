import { Box, Button, TextField, Typography } from "@mui/material";

import OriginProps from "../../../models/util/OriginProps";
import React, { Fragment } from "react";
import QueueSetting from "../../../models/QueueSetting";
import Divider from "@mui/material/Divider";
import { LangAdminDesc } from "../../../lang/en/admin";
import TabHeading from "../../layout/TabHeading";

interface Props extends OriginProps {
	onSaveQueueSetting: (data: any) => void;
	queueSetting: QueueSetting | null;
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

	const heading = <TabHeading heading="Account Setting"></TabHeading>;

	if (!queueSetting) {
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
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					Display Name
				</Typography>
				<TextField type="text" value={queueSetting.display_name} label="Required" variant="outlined" required fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{LangAdminDesc.queueSetting.display_name}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					Description
				</Typography>
				<TextField type="text" value={queueSetting.detail} label="Required" variant="outlined" required fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{LangAdminDesc.queueSetting.detail}
				</Typography>
				<Divider sx={{ my: dividerMargin }}></Divider>
				<Button variant="contained" type="submit" size="large" sx={{ fontWeight: "bold" }}>
					Save
				</Button>
			</Box>
		</Fragment>
	);
};

export default QueueSettingFrom;
