import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";

import OriginProps from "../../../models/util/OriginProps";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import QueueSetting from "../../../models/QueueSetting";
import Divider from "@mui/material/Divider";
import TabHeading from "../../layout/TabHeading";
import { useContextHttp } from "../../../contexts/HttpContext";
import { useSnackbar } from "notistack";
import ProgressBackdrop from "../../ui/ProgressBackdrop";
import StatusCode from "../../../models/util/StatusCode";
import { useRouter } from "next/router";
import { useContextLang } from "../../../contexts/LangContext";

const QUEUE_SETTING_DUMMY: QueueSetting = {
	id: 1,
	user_id: 1,
	display_name: "Queue Setting Dummy",
	detail: "Queue Setting Detail",
	line_config_id: 1,
};

interface Props extends OriginProps {
	// onSaveQueueSetting: (data: any) => void;
	// queueSetting: QueueSetting | null;
}

const QueueSettingFrom: React.FC<Props> = (props) => {
	const [isInit, setIsInit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [queueSetting, setQueueSetting] = useState<QueueSetting | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const http = useContextHttp();
	const router = useRouter();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const lang = useContextLang();

	const getQueueSetting = useCallback(async () => {
		const response = await http.get("admin/setting/queue");

		if (response.status !== 200) {
			// Http not ok
			if (response.status === 401) {
				await router.push("/auth");
				return;
			}
			setQueueSetting(null);
			setErrorMsg("Something went wrong");
			enqueueSnackbar("Something went wrong", { variant: "error" });
			return;
		}

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			// API Status Not ok
			setErrorMsg(content.message);
			setQueueSetting(null);
		}

		setQueueSetting(content.data);
	}, [enqueueSnackbar, http, router]);

	const saveQueueSetting = async (queueSettingData: QueueSetting) => {
		const response = queueSettingData.id ? await http.put("admin/setting/queue", queueSettingData) : await http.post("admin/setting/queue", queueSettingData);

		if (response.status !== 200) {
			// Http status not ok
			if (response.status === 401) {
				await router.push("/auth");
				return;
			}
			setErrorMsg("Something went wrong");
			enqueueSnackbar("Something went wrong", { variant: "error" });
			return;
		}

		const content = response.data;

		if (content.status !== 200) {
			// Api status not ok
			setErrorMsg(content.message);
			enqueueSnackbar(content.message, { variant: "error" });
		}

		enqueueSnackbar("Save data success", { variant: "success" });
		setQueueSetting(content.data);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const queueSettingData: QueueSetting = {
			id: queueSetting && queueSetting.id ? queueSetting.id : null,
			display_name: data.get("display_name")?.toString() || "",
			detail: data.get("detail")?.toString() || "",
		};
		// props.onSaveQueueSetting(queueSettingData);

		console.log(queueSettingData);

		setIsLoading(true);
		const snackKey = enqueueSnackbar("Saveing data", { variant: "default" });
		saveQueueSetting(queueSettingData).then(() => {
			closeSnackbar(snackKey);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		// Initialize Component
		if (!isInit && !isLoading) {
			console.log("QueueSettingFrom", "useEffect", "Initialize");
			setIsLoading(true);
			getQueueSetting()
				.then(() => {
					console.log("QueueSettingFrom", "useEffect ok");
				})
				.catch((e) => {
					console.log("QueueSettingFrom", "useEffect error");
					console.log(e);
				})
				.finally(() => {
					setIsLoading(false);
					setIsInit(true);
				});
		}
	}, [getQueueSetting, isInit, isLoading]);

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

	const heading = <TabHeading heading={lang.admin.queueSetting.heading}></TabHeading>;
	const errorFeedback = errorMsg && (
		<Alert variant="filled" severity="error">
			{errorMsg}
		</Alert>
	);

	if (!queueSetting && isLoading) {
		return (
			<Fragment>
				{heading}
				<Box component="div" sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
					<CircularProgress color="inherit" />
				</Box>
			</Fragment>
		);
	}

	if (!queueSetting) {
		return (
			<Fragment>
				{heading}
				{errorFeedback}
				{!errorFeedback && emptyOutput}
			</Fragment>
		);
	}

	return (
		<Fragment>
			{heading}
			{errorFeedback}
			{isLoading && <ProgressBackdrop open={isLoading} />}
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					{lang.admin.queueSetting.display_name || "Display Name"}
				</Typography>
				<TextField type="text" name="display_name" defaultValue={queueSetting.display_name} label="Required" variant="outlined" required fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{lang.admin.queueSetting.display_name}
				</Typography>

				<Divider sx={{ my: dividerMargin }}></Divider>

				<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
					{lang.admin.queueSetting.detail || "Description"}
				</Typography>
				<TextField type="text" name="detail" defaultValue={queueSetting.detail} label="Required" variant="outlined" required fullWidth></TextField>
				<Typography variant="subtitle2" component="p" sx={{ mt: fieldDescMargin }}>
					{lang.admin.queueSetting.detail}
				</Typography>
				<Divider sx={{ my: dividerMargin }}></Divider>
				<Button variant="contained" type="submit" size="large" sx={{ fontWeight: "bold" }}>
					{lang.admin.queueSetting.saveBtn || "Save"}
				</Button>
			</Box>
		</Fragment>
	);
};

export default QueueSettingFrom;
