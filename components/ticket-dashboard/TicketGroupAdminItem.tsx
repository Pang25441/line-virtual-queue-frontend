import { Box, Button, ButtonGroup, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useContextLang } from "../../contexts/LangContext";
import TicketGroup from "../../models/TicketGroup";
import OriginProps from "../../models/util/OriginProps";
import TicketList from "./TicketList";

interface Props extends OriginProps {
	ticketGroup: TicketGroup;
}

const isLoadingObj = {
	nextQueue: false,
	postpone: false,
};

const TicketGroupAdminItem: React.FC<Props> = (props) => {
	const [tabValue, setTabValue] = React.useState(1);
	const [nextQueueDelay, setNextQueueDelay] = React.useState<any>(null);
	const [delayRemain, setDelayRemain] = React.useState<number>(0);
	const [isLoading, setIsLoading] = React.useState(isLoadingObj);
	const { ticketGroup } = props;
	const lang = useContextLang();

	const pastStatus = [lang.ticket.status.executed, lang.ticket.status.rejected, lang.ticket.status.lost];

	const currentQueue = ticketGroup.tickets?.filter((ticket) => ticket.status == 2)[0] || null;
	const waitingQueue = ticketGroup.tickets?.filter((ticket) => ticket.ticket_status.code == lang.ticket.status.pending && ticket.is_postpone === 0) || [];
	const postponeQueue = ticketGroup.tickets?.filter((ticket) => ticket.is_postpone === 1) || [];
	const pastQueue = ticketGroup.tickets?.filter((ticket) => pastStatus.indexOf(ticket.ticket_status.code || "") > -1) || [];

	const changeTabHandler = (newValue: number) => {
		const value = tabValue == newValue ? 0 : newValue;
		setTabValue(value);
	};

	const nextQueueHandler = () => {
		console.log("Next Queue Start Process");
		setNextQueueDelay(true);
		setDelayRemain(3);
	};

	const nextQueueAction = () => {
		console.log("Execute Next Queue Trigger");
		setNextQueueDelay(false);
		setIsLoading((prevState) => {
			return { ...prevState, nextQueue: true };
		});
	};

	const aboartQueueHandler = () => {
		console.log("Next Queue Abort");
		setNextQueueDelay(false);
	};

	const postponeQueueHandler = () => {};

	useEffect(() => {
		if (nextQueueDelay && delayRemain > 0) {
			setTimeout(() => {
				setDelayRemain(delayRemain - 1);
			}, 1000);
		}
		if (nextQueueDelay && delayRemain === 0) {
			nextQueueAction();
		}
	}, [delayRemain]);

	const inactiveContents = (
		<Box component="div" sx={{ marginTop: 3, textAlign: "center" }}>
			<Typography component="h5" variant="h5" color="error">
				Inactive
			</Typography>
		</Box>
	);

	const contents = (
		<Fragment>
			<Box component="div" sx={{ margin: 1 }}>
				<Typography component="h6" variant="h6" sx={{ textAlign: "center" }}>
					{lang.ticket.currentQueue}
				</Typography>
			</Box>
			<Box component="div" sx={{ margin: 1 }}>
				<Typography component="h1" variant="h1" sx={{ textAlign: "center" }}>
					{currentQueue?.ticket_number || "--"}
				</Typography>
			</Box>
			<Box component="div" sx={{ margin: 1 }}>
				<Stack spacing={2} direction="row" sx={{ justifyContent: "center" }}>
					{!nextQueueDelay && (
						<Button onClick={nextQueueHandler} disabled={isLoading.nextQueue} sx={{ fontWeight: "bolder", flex: 1 }} variant="contained">
							{lang.ticket.button.next}
						</Button>
					)}
					{nextQueueDelay && (
						<Button onClick={aboartQueueHandler} sx={{ fontWeight: "bolder", flex: 1 }} variant="contained" color="error">
							{lang.ticket.button.abort}({delayRemain})
						</Button>
					)}
					<Button sx={{ fontWeight: "bolder" }} variant="outlined">
						{lang.ticket.button.postpone}
					</Button>
				</Stack>
			</Box>
			<Divider />
			<Box component="div" sx={{ margin: 1 }}>
				<ButtonGroup variant="text" color="inherit" sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between", textAlign: "Center", borderRadius: "none" }} aria-label="text button group">
					<Button onClick={changeTabHandler.bind(null, 1)} sx={{ display: "flex", flexGrow: 1, borderRadius: 0 }} {...(tabValue === 1 ? { variant: "contained", color: "warning" } : {})}>
						{lang.ticket.waitingQueueShort}
						<br />({waitingQueue.length})
					</Button>
					<Button onClick={changeTabHandler.bind(null, 2)} sx={{ display: "flex", flexGrow: 1, borderRadius: 0 }} {...(tabValue === 2 ? { variant: "contained", color: "warning" } : {})}>
						{lang.ticket.postponeQueueShort}
						<br />({postponeQueue.length})
					</Button>
					<Button onClick={changeTabHandler.bind(null, 3)} sx={{ display: "flex", flexGrow: 1, borderRadius: 0 }} {...(tabValue === 3 ? { variant: "contained", color: "warning" } : {})}>
						{lang.ticket.pastQueueShort}
						<br />({pastQueue.length})
					</Button>
				</ButtonGroup>
			</Box>
		</Fragment>
	);

	const tabPanel = (
		<Box component="div" sx={{ margin: 0, padding: 1 }}>
			{tabValue === 1 && <TicketList label="waitingQueue" tickets={waitingQueue}></TicketList>}
			{tabValue === 2 && <TicketList label="postponeQueue" tickets={postponeQueue}></TicketList>}
			{tabValue === 3 && <TicketList label="pastQueue" tickets={pastQueue}></TicketList>}
		</Box>
	);

	return (
		<Card sx={{ width: "320px" }}>
			<CardContent sx={{ paddingBottom: 0 }}>
				<Box component="div" sx={{ margin: 1 }}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={12}>
							<Typography component="h3" variant="h3" sx={{ textAlign: "center" }}>
								{ticketGroup.ticket_group_prefix}
							</Typography>
						</Grid>
						<Grid item md={8} xs={12}>
							<Typography component="small" variant="caption">
								{ticketGroup.description}
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Divider />
				{ticketGroup.active === 0 && inactiveContents}
				{ticketGroup.active === 1 && contents}
			</CardContent>
			{ticketGroup.active === 1 && tabPanel}
		</Card>
	);
};

export default TicketGroupAdminItem;
