import { Alert, AlertTitle, Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useContextLang } from "../../contexts/LangContext";
import { useContextTicketAdmin } from "../../contexts/TicketAdminContext";
import TicketGroup from "../../models/TicketGroup";
import OriginProps from "../../models/util/OriginProps";
import Link from "../ui/Link";
import TicketGroupAdminItem from "./TicketGroupAdminItem";

interface Props extends OriginProps {
	onCountdownUpdate?: (value: number) => void;
}

const TicketDashboardComponent: React.FC<Props> = (props) => {
	const [ticketGroups, setTicketGroups] = React.useState<TicketGroup[]>([]);
	const [countdown, setCountdown] = React.useState(15000);
	const [isInit, setIsInit] = React.useState(false);
	const [isInitDone, setIsInitDone] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const { onCountdownUpdate } = props;

	const lang = useContextLang();
	const ticketAdminCtx = useContextTicketAdmin();

	const delay = 15000;

	useEffect(() => {
		if (isInit) return;
		setIsInit(true);
		console.log("initial");

		const init = async () => {
			const result = await ticketAdminCtx.getTicketGroupList();
			return result;
		};

		init().then((result) => {
			setIsInitDone(true);
			if (result) {
				setTicketGroups(result);
				setCountdown(delay);
			}
		});
	}, [isInit, ticketAdminCtx]);

	useEffect(() => {
		// Countdown Interval
		const timeout = 100;
		if (countdown > 0 && ticketGroups.length > 0) {
			setTimeout(() => {
				const newValue = countdown - timeout;
				setCountdown(newValue);
			}, timeout);
		}
	}, [countdown, ticketGroups.length]);

	useEffect(() => {
		// Countdonw Progress calculate
		const newPercentage = Math.ceil((countdown / delay) * 100);
		if (onCountdownUpdate) onCountdownUpdate(newPercentage);
	}, [countdown, onCountdownUpdate]);

	useEffect(() => {
		// countdown finish
		if (!isInitDone) return;
		if (countdown === 0 && !isLoading) {
			console.log("Refresh");
			setIsLoading(true);
			ticketAdminCtx
				.getTicketGroupList()
				.then((result) => {
					if (result) setTicketGroups(result);
					setCountdown(delay);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [countdown, isInitDone, isLoading, ticketAdminCtx]);

	if (!isInitDone) {
		return (
			<Box sx={{ display: "flex", justifyItems: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isInitDone && ticketGroups.length === 0) {
		return (
			<Box>
				<Alert severity="warning">
					<AlertTitle>{"Setup isn't ready"}</AlertTitle>
					Please proceed —{" "}
					<strong>
						<Link href="/admin/setting/ticket" variant="">
							{lang.admin.ticketGroup.heading}
						</Link>
					</strong>
				</Alert>
				<Typography></Typography>
			</Box>
		);
	}

	return (
		<Stack direction="row" justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap" spacing={0}>
			{ticketGroups.map((ticketGroup) => (
				<TicketGroupAdminItem key={ticketGroup.ticket_group_code} ticketGroup={ticketGroup}></TicketGroupAdminItem>
			))}
		</Stack>
	);
};

export default TicketDashboardComponent;
