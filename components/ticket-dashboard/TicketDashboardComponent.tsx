import { Box, Paper, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useContextLang } from "../../contexts/LangContext";
import { useContextTicketAdmin } from "../../contexts/TicketAdminContext";
import TicketGroup from "../../models/TicketGroup";
import OriginProps from "../../models/util/OriginProps";
import TicketGroupAdminItem from "./TicketGroupAdminItem";

interface Props extends OriginProps {
	onCountdownUpdate?: (value: number) => void;
}

const TicketDashboardComponent: React.FC<Props> = (props) => {
	const [ticketGroups, setTicketGroups] = React.useState<TicketGroup[]>([]);
	const [countdown, setCountdown] = React.useState(0);
	const [isInit, setIsInit] = React.useState(false);

	const { onCountdownUpdate } = props;

	const lang = useContextLang();
	const ticketAdminCtx = useContextTicketAdmin();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const delay = 15000;

	useEffect(() => {
		if(isInit) return;
		
		const init = async () => {
			const result = await ticketAdminCtx.getTicketGroupList();
			return result;
		};

		init().then((result) => {
			if (result) setTicketGroups(result);
			setCountdown(delay);
			setIsInit(true);
		});
	}, [isInit, ticketAdminCtx]);

	useEffect(() => {
		const timeout = 100;
		if (countdown > 0) {
			setTimeout(() => {
				const newValue = countdown - timeout;
				const oldPercentage = Math.ceil((countdown / delay) * 100);
				const newPercentage = Math.ceil((newValue / delay) * 100);

				setCountdown(newValue);
			}, timeout);
		}
	}, [countdown]);

	useEffect(() => {
		const newPercentage = Math.ceil((countdown / delay) * 100);
		if (onCountdownUpdate) onCountdownUpdate(newPercentage);
	}, [countdown, onCountdownUpdate]);

	useEffect(() => {
		if (countdown === 0) {
			console.log("Refresh");
			ticketAdminCtx.getTicketGroupList().then((result) => {
				if (result) setTicketGroups(result);
				setCountdown(delay);
			});
		}
	}, [countdown, ticketAdminCtx]);

	return (
		<Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
			{ticketGroups.map((ticketGroup) => (
				<TicketGroupAdminItem key={ticketGroup.ticket_group_code} ticketGroup={ticketGroup}></TicketGroupAdminItem>
			))}
		</Stack>
	);
};

export default TicketDashboardComponent;
