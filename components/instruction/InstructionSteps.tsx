import { Box, Button, Chip, CircularProgress, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useContextHttp } from "../../contexts/HttpContext";
import { useContextLang } from "../../contexts/LangContext";
import classes from "../../styles/Stepper.module.css";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import Link from "next/link";
import lvaLineOADemo from "../../public/lvq-line-official-account-demo.png";
import Image from "next/image";

const statusSettingObj = {
	line: false,
	queue: false,
	ticket_group: 0,
};

const InstructionStepComponent: React.FC = () => {
	const [isInit, setIsinit] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [settingStatus, setSettingStatus] = useState<typeof statusSettingObj | undefined>();
	const [settingStatusError, setSettingStatusError] = useState(false);
	const [steps, setSteps] = useState<any[]>([]);
	const [activeStep, setActiveStep] = useState(0);
	const [readyToGo, setReadyToGo] = useState(false);

	const http = useContextHttp();
	const lang = useContextLang();

	const checkSettingStatus = useCallback(async () => {
		const res = await http.get("admin/setting/check");

		if (res.status == 200) {
			return res.data.data;
		} else {
			return false;
		}
	}, [http]);

	useEffect(() => {
		if (isInit) return;
		setIsinit(true);

		// console.log("initial");

		checkSettingStatus().then((data) => {
			if (data) {
				// console.log(data);
				setSettingStatus(data);
			} else {
				console.log("err");
				setSettingStatusError(true);
			}
			setIsLoading(false);
		});
	}, [checkSettingStatus, isInit]);

	useEffect(() => {
		const step1 = { order: 0, label: lang.admin.lineConfig.heading, page: "/admin/setting/line" };
		const step2 = { order: 1, label: lang.admin.queueSetting.heading, page: "/admin/setting/account" };
		const step3 = { order: 2, label: lang.admin.ticketGroup.heading, page: "admin/setting/ticket" };
		const step4 = { order: 3, label: "Ready to Go", page: "admin/ticket-dashboard" };

		let steps = [];

		steps.push(step1);
		steps.push(step2);
		steps.push(step3);
		steps.push(step4);

		setSteps(steps);
	}, [lang]);

	useEffect(() => {
		if (!settingStatus) return;

		let activeStep = 0;

		if (settingStatus.line) {
			activeStep = 1;
		}

		if (settingStatus.queue) {
			activeStep = 2;
		}

		if (settingStatus.ticket_group) {
			activeStep = 3 + 1;
			setReadyToGo(true);
		}

		setActiveStep(activeStep);
		// console.log("activeStep =", activeStep);
	}, [settingStatus]);

	const stepRender = (step: any) => {
		return (
			<Step key={"step-" + step.order + "-" + step.label}>
				<StepLabel
					StepIconProps={{
						classes: {
							root: classes.step,
							active: classes.stepActive,
							completed: classes.stepComplete,
						},
					}}
				>
					<Typography>{step.label}</Typography>
					{activeStep == step.order && step.order != 4 && (
						<Link href={step.page} passHref>
							<Button variant="contained" color="success" size="small">
								Setup
							</Button>
						</Link>
					)}
					{step.order == 3 && activeStep == 4 && (
						<Link href={step.page} passHref>
							<Button variant="contained" color="success" size="small">
								Go
							</Button>
						</Link>
					)}
				</StepLabel>
			</Step>
		);
	};

	if (isLoading) {
		return (
			<Box component="div" sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
				<CircularProgress color="inherit" />
			</Box>
		);
	}

	return (
		<>
			{readyToGo && (
				<Typography variant="h4" component="h4">
					{"You're Ready to go"}
				</Typography>
			)}
			{!readyToGo && (
				<Typography variant="h4" component="h4">
					{"Some setting are missing"}
				</Typography>
			)}
			{settingStatus && (
				<Box sx={{ my: 3 }}>
					<Stepper sx={{ display: { xs: "none", sm: "flex" } }} activeStep={activeStep} alternativeLabel>
						{steps.map((step) => stepRender(step))}
					</Stepper>

					<Stepper sx={{ display: { xs: "flex", sm: "none" } }} activeStep={activeStep} orientation="vertical">
						{steps.map((step) => stepRender(step))}
					</Stepper>
				</Box>
			)}

			{settingStatusError && <>{"Error"}</>}

            <Box sx={{mt:4, mb:1}}>
                <Image src={lvaLineOADemo} alt="Add friend" />
            </Box>
            <Box sx={{mb:4}}>
                <Chip label="LINE Official Account for demo" />
            </Box>
            

			<Box sx={{ my: 8 }}>
				<Button href="/documents" target="_blank" startIcon={<MenuBookRoundedIcon />} color="info" variant="contained" size="large" sx={{ fontWeight: "bold" }}>
					Documents
				</Button>
			</Box>
		</>
	);
};

export default InstructionStepComponent;
