import { Box, Button, ButtonGroup, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useContextLang } from "../../contexts/LangContext";
import { useContextTicketAdmin } from "../../contexts/TicketAdminContext";
import Ticket from "../../models/Ticket";
import TicketGroup from "../../models/TicketGroup";
import OriginProps from "../../models/util/OriginProps";
import ConfirmDialog from "../ui/ConfirmDialog";
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
	const [postPoneDialog, setPostPoneDialog] = React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState(isLoadingObj);
	const [currentQueue, setCurrentQueue] = React.useState<Ticket | null>(null);
	const [waitingQueueList, setWaitingQueueList] = React.useState<Ticket[]>([]);
	const [postponeQueueList, setPostponeQueueList] = React.useState<Ticket[]>([]);
	const [pastQueueList, setPastQueueList] = React.useState<Ticket[]>([]);
	const [cardSize, setCardSize] = React.useState<string>("380px");

	const lang = useContextLang();
	const ticketAdminCtx = useContextTicketAdmin();

	const { ticketGroup } = props;
	const pastStatus = [lang.ticket.status.calling, lang.ticket.status.executed, lang.ticket.status.rejected, lang.ticket.status.lost];

	React.useEffect(() => {
		const _currentQueue = ticketGroup.tickets?.filter((ticket) => ticket.status === 2 && ticket.is_postpone === 0)[0] || null;

		const _waitingQueue = ticketGroup.tickets?.filter((ticket) => ticket.ticket_status.code == lang.ticket.status.pending) || [];
		const _postponeQueue = ticketGroup.tickets?.filter((ticket) => ticket.is_postpone === 1) || [];
		const _pastQueue =
			ticketGroup.tickets?.filter((ticket) => pastStatus.indexOf(ticket.ticket_status.code || "") > -1 && !(ticket.ticket_status.code == lang.ticket.status.calling && ticket.is_postpone === 1)) || [];

		setCurrentQueue(_currentQueue);

		setWaitingQueueList(_waitingQueue);
		setPostponeQueueList(_postponeQueue);
		setPastQueueList(_pastQueue);
	}, [ticketGroup]);

	const changeTabHandler = (newValue: number) => {
		const value = tabValue == newValue ? 0 : newValue;
		setTabValue(value);
	};

	const nextQueueHandler = () => {
		console.log("Next Queue Start Process");
		setNextQueueDelay(true);
		setDelayRemain(3);
	};

	const nextQueueAction = async () => {
		console.log("Execute Next Queue Trigger");
		if (ticketGroup.id) {
			setNextQueueDelay(false);
			setIsLoading((prevState) => {
				return { ...prevState, nextQueue: true };
			});

			if (currentQueue) {
				const finish = await finishQueueHandler(currentQueue);
			}

			if (waitingQueueList.length > 0) {
				const result = await ticketAdminCtx.nextTicket(ticketGroup.id);

				if (result) {
					setWaitingQueueList((prevState) => {
						return prevState.filter((ticket) => ticket.id != result.id);
					});
					setPastQueueList((prevState) => {
						return [ result, ...prevState];
					});
					setCurrentQueue(result);
				}
			}

			setIsLoading((prevState) => {
				return { ...prevState, nextQueue: false };
			});
		}
	};

	const finishQueueHandler = async (ticket: Ticket) => {
		if (!ticket.id) return false;
		const result = await ticketAdminCtx.executeTicket(ticket.id);
		if (result) {
			console.log(result)
			if (currentQueue && currentQueue.id && ticket.id === currentQueue.id) {
				setCurrentQueue(null);
				setPastQueueList((prevState) => {
					const index = prevState.findIndex((item) => item.id == ticket.id);
					let newState = [...prevState];
					newState[index] = result;
					return newState;
				});
			}
		}
		return result;
	};

	const aboartQueueHandler = () => {
		console.log("Next Queue Abort");
		setNextQueueDelay(false);
	};

	const postponeQueueHandler = async () => {
		setPostPoneDialog(false);
		if (currentQueue && currentQueue.id) {
			setIsLoading((prevState) => {
				return { ...prevState, postpone: true };
			});

			const result = await ticketAdminCtx.postponeTicket(currentQueue.id);

			if (result) {
				setCurrentQueue(null);
				setPostponeQueueList((prevState) => {
					return [...prevState, result];
				});
			}

			setIsLoading((prevState) => {
				return { ...prevState, postpone: false };
			});
		}
	};

	const postponeConfirmDialog = () => {
		setPostPoneDialog(true);
	};

	const postponeDialogReject = () => {
		setPostPoneDialog(false);
	};

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
			<ConfirmDialog maxWidth="xs" open={postPoneDialog} onConfirm={postponeQueueHandler} onReject={postponeDialogReject}>
				<Typography component="p" variant="body1">
					Confirm postpone
				</Typography>
			</ConfirmDialog>
			<Box component="div" sx={{ margin: 1 }}>
				<Typography component="h6" variant="h6" sx={{ textAlign: "center" }}>
					{lang.ticket.currentQueue}
				</Typography>
			</Box>
			<Box component="div" sx={{ margin: 1 }}>
				<Typography component="h1" variant="h1" sx={{ textAlign: "center" }}>
					{currentQueue?.ticket_number || "---"}
				</Typography>
			</Box>
			<Box component="div" sx={{ margin: 1 }}>
				<Stack spacing={2} direction="row" sx={{ justifyContent: "center" }}>
					{!nextQueueDelay && (
						<Button onClick={nextQueueHandler} disabled={isLoading.nextQueue || isLoading.postpone} sx={{ fontWeight: "bolder", flex: 1 }} variant="contained">
							{currentQueue && waitingQueueList.length > 0 && lang.ticket.button.finishAndNext}
							{!currentQueue && waitingQueueList.length > 0 && lang.ticket.button.next}
							{waitingQueueList.length == 0 && lang.ticket.button.finish}
						</Button>
					)}
					{nextQueueDelay && (
						<Button onClick={aboartQueueHandler} sx={{ fontWeight: "bolder", flex: 1 }} variant="contained" color={currentQueue ? "error" : "error"}>
							{!currentQueue && lang.ticket.button.abort}
							{currentQueue && lang.ticket.button.finishAndNext} ({delayRemain})
						</Button>
					)}
					{currentQueue && (
						<Button onClick={postponeConfirmDialog} color="warning" disabled={!currentQueue || isLoading.nextQueue || isLoading.postpone} sx={{ fontWeight: "bolder" }} variant="outlined">
							{lang.ticket.button.postpone}
						</Button>
					)}
				</Stack>
			</Box>
			<Divider />
			<Box component="div" sx={{ margin: 1 }}>
				<ButtonGroup variant="text" color="inherit" sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between", textAlign: "Center", borderRadius: "none" }} aria-label="text button group">
					<Button onClick={changeTabHandler.bind(null, 1)} sx={{ display: "flex", flexGrow: 1, borderRadius: 0 }} {...(tabValue === 1 ? { variant: "contained", color: "warning" } : {})}>
						{lang.ticket.waitingQueueShort}
						<br />({waitingQueueList.length})
					</Button>
					<Button onClick={changeTabHandler.bind(null, 2)} sx={{ display: "flex", flexGrow: 1, borderRadius: 0 }} {...(tabValue === 2 ? { variant: "contained", color: "warning" } : {})}>
						{lang.ticket.postponeQueueShort}
						<br />({postponeQueueList.length})
					</Button>
					<Button onClick={changeTabHandler.bind(null, 3)} sx={{ display: "flex", flexGrow: 1, borderRadius: 0 }} {...(tabValue === 3 ? { variant: "contained", color: "warning" } : {})}>
						{lang.ticket.pastQueueShort}
						<br />({pastQueueList.length})
					</Button>
				</ButtonGroup>
			</Box>
		</Fragment>
	);

	const tabPanel = (
		<Box component="div" sx={{ margin: 0, padding: 1 }}>
			{tabValue === 1 && <TicketList label="waitingQueue" tickets={waitingQueueList}></TicketList>}
			{tabValue === 2 && <TicketList label="postponeQueue" tickets={postponeQueueList}></TicketList>}
			{tabValue === 3 && <TicketList label="pastQueue" tickets={pastQueueList}></TicketList>}
		</Box>
	);

	return (
		<Card sx={{ width: cardSize }}>
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
