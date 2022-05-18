import { Box, Button, ButtonGroup, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
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
	finish: false,
	recall: false,
};

const TicketGroupAdminItem: React.FC<Props> = (props) => {
	const [tabValue, setTabValue] = React.useState(1);
	const [ticketGroup, setTicketGroup] = React.useState<TicketGroup>(props.ticketGroup);
	const [nextQueueDelay, setNextQueueDelay] = React.useState<any>(null);
	const [delayRemain, setDelayRemain] = React.useState<number>(0);
	const [postPoneDialog, setPostPoneDialog] = React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState(isLoadingObj);
	const [currentQueue, setCurrentQueue] = React.useState<Ticket | null>(null);
	const [waitingQueueList, setWaitingQueueList] = React.useState<Ticket[]>([]);
	const [postponeQueueList, setPostponeQueueList] = React.useState<Ticket[]>([]);
	const [pastQueueList, setPastQueueList] = React.useState<Ticket[]>([]);
	const [cardSize, setCardSize] = React.useState<string>("380px");
	const [confirmActive, setConfirmActive] = React.useState<boolean>(false);
	const [confirmInactive, setConfirmInactive] = React.useState<boolean>(false);

	const lang = useContextLang();
	const ticketAdminCtx = useContextTicketAdmin();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const tabWaiting = 1;
	const tabPostpone = 2;
	const tabPast = 3;

	React.useEffect(() => {
		setTicketGroup(props.ticketGroup);
	}, [props.ticketGroup]);

	React.useEffect(() => {
		// Initialize Component
		if(props.ticketGroup.active !== 1) return
		console.log("Initialize ticket list");
		const ticketlang = lang.ticket;
		const pastStatus = [ticketlang.status.calling, ticketlang.status.executed, ticketlang.status.rejected, ticketlang.status.lost];
		const _currentQueue = ticketGroup.tickets?.filter((ticket) => ticket.status === 2 && ticket.is_postpone === 0)[0] || null;

		const _waitingQueue = ticketGroup.tickets?.filter((ticket) => ticket.ticket_status.code == ticketlang.status.pending) || [];

		const _postponeQueue = ticketGroup.tickets?.filter((ticket) => ticket.ticket_status.code == ticketlang.status.calling && ticket.is_postpone === 1) || [];

		const _pastQueue =
			ticketGroup.tickets?.filter((ticket) => pastStatus.indexOf(ticket.ticket_status.code || "") > -1 && !(ticket.ticket_status.code == ticketlang.status.calling && ticket.is_postpone === 1)) || [];

		setCurrentQueue(_currentQueue);

		setWaitingQueueList(_waitingQueue);
		setPostponeQueueList(_postponeQueue);
		setPastQueueList(_pastQueue);
	}, [lang.ticket, props.ticketGroup.active, ticketGroup.tickets]);

	const changeTabHandler = (newValue: number) => {
		if (tabValue == newValue) return false;
		const value = tabValue == newValue ? 0 : newValue;
		setTabValue(value);
	};

	const activeTicketGroupConfirm = () => {
		setConfirmActive(true);
	};

	const activeTicketGroupClose = () => {
		setConfirmActive(false);
	};

	const activeTicketGroupHandler = async () => {
		activeTicketGroupClose();
		const result = await ticketAdminCtx.activeTicketGroup(ticketGroup);
		if (result) {
			setTicketGroup(result);
		}
	};

	const inactiveTicketGroupConfirm = () => {
		setConfirmInactive(true);
	};

	const inactiveTicketGroupClose = () => {
		setConfirmInactive(false);
	};

	const inactiveTicketGroupHandler = async () => {
		inactiveTicketGroupClose();
		const result = await ticketAdminCtx.inactiveTicketGroup(ticketGroup);
		if (result) {
			setTicketGroup(result);
		}
	};

	const nextQueueHandler = () => {
		console.log("Next Queue Start Process");
		setNextQueueDelay(true);
		setDelayRemain(3);
	};

	const finishQueueHandler = React.useCallback(
		async (ticket: Ticket): Promise<Ticket | false> => {
			if (!ticket.id) return false;

			const snackKey = enqueueSnackbar("Finishing Queue", { variant: "default" });

			setIsLoading((prevState) => {
				return { ...prevState, finish: true };
			});
			const result = await ticketAdminCtx.executeTicket(ticket.id);
			closeSnackbar(snackKey);
			if (result) {
				// console.log(result);
				if (currentQueue && currentQueue.id && ticket.id === currentQueue.id) {
					setCurrentQueue(null);
					setPastQueueList((prevState) => {
						const index = prevState.findIndex((item) => item.id == ticket.id);
						let newState = [...prevState];
						newState[index] = result;
						return newState;
					});
				}
				enqueueSnackbar("Queue " + result.ticket_number + " finished", { variant: "success" });
			} else {
				enqueueSnackbar(ticketAdminCtx.errMessage, { variant: "error" });
			}
			setIsLoading((prevState) => {
				return { ...prevState, finish: false };
			});

			return result;
		},
		[closeSnackbar, currentQueue, enqueueSnackbar, ticketAdminCtx]
	);

	const nextQueueAction = React.useCallback(async () => {
		console.log("Execute Next Queue Trigger");
		if (ticketGroup.id && waitingQueueList.length > 0) {
			setNextQueueDelay(false);
			setIsLoading((prevState) => {
				return { ...prevState, nextQueue: true };
			});

			if (currentQueue) {
				const finish = await finishQueueHandler(currentQueue);
			}

			const snackKey = enqueueSnackbar("Calling Next Queue", { variant: "default" });

			const result = await ticketAdminCtx.nextTicket(ticketGroup.id);

			closeSnackbar(snackKey);
			if (result) {
				setWaitingQueueList((prevState) => {
					return prevState.filter((ticket) => ticket.id != result.id);
				});
				setPastQueueList((prevState) => {
					return [result, ...prevState];
				});
				setCurrentQueue(result);
				enqueueSnackbar("Queue " + result.ticket_number + " called", { variant: "success" });
			} else {
				enqueueSnackbar(ticketAdminCtx.errMessage, { variant: "error" });
			}

			setIsLoading((prevState) => {
				return { ...prevState, nextQueue: false };
			});
		}
	}, [closeSnackbar, currentQueue, enqueueSnackbar, finishQueueHandler, ticketAdminCtx, ticketGroup.id, waitingQueueList.length]);

	const aboartQueueHandler = () => {
		console.log("Next Queue Abort");
		enqueueSnackbar("Aborted", { variant: "default" });
		setNextQueueDelay(false);
	};

	const postponeQueueHandler = async () => {
		setPostPoneDialog(false);
		if (currentQueue && currentQueue.id) {
			const snackKey = enqueueSnackbar("Postpone Queue", { variant: "default" });
			setIsLoading((prevState) => {
				return { ...prevState, postpone: true };
			});

			const result = await ticketAdminCtx.postponeTicket(currentQueue.id);
			closeSnackbar(snackKey);

			if (result) {
				setCurrentQueue(null);
				setPostponeQueueList((prevState) => {
					return [...prevState, result];
				});
				setPastQueueList((prevState) => {
					return prevState.filter((item) => item.id != result.id);
				});
				enqueueSnackbar("Queue " + result.ticket_number + " postponed", { variant: "success" });
			} else {
				enqueueSnackbar(ticketAdminCtx.errMessage, { variant: "error" });
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

	const rejectQueueHandler = async (ticket: Ticket): Promise<Ticket | false> => {
		if (ticket && ticket.id) {
			const snackKey = enqueueSnackbar("Reject Queue " + ticket.ticket_number, { variant: "default" });

			const result = await ticketAdminCtx.rejectTicket(ticket.id);
			closeSnackbar(snackKey);

			if (result) {
				setPostponeQueueList((prevState) => {
					return prevState.filter((item) => item.id !== ticket.id);
				});
				setPastQueueList((prevState) => {
					const newState = [...prevState, result];
					return newState;
				});
				enqueueSnackbar("Queue " + result.ticket_number + " rejected", { variant: "success" });
				return result;
			} else {
				enqueueSnackbar(ticketAdminCtx.errMessage, { variant: "error" });
			}

			return result;
		}

		return false;
	};

	const recallQueueHandler = async (ticket: Ticket): Promise<Ticket | false> => {
		if (ticket && ticket.id) {
			const snackKey = enqueueSnackbar("Re-call Queue " + ticket.ticket_number, { variant: "default" });

			setIsLoading((prevState) => {
				return { ...prevState, recall: true };
			});
			const result = await ticketAdminCtx.recallTicket(ticket.id);
			closeSnackbar(snackKey);

			if (result) {
				setPostponeQueueList((prevState) => {
					return prevState.filter((item) => item.id != result.id);
				});
				setPastQueueList((prevState) => {
					return [...prevState, result];
				});
				setCurrentQueue(result);
				enqueueSnackbar("Queue " + result.ticket_number + " re-called", { variant: "success" });
				return result;
			} else {
				enqueueSnackbar(ticketAdminCtx.errMessage, { variant: "error" });
			}
			setIsLoading((prevState) => {
				return { ...prevState, recall: false };
			});
		}
		return false;
	};

	const currentQueueCheck = async () => {
		return currentQueue ? true : false;
	};

	React.useEffect(() => {
		// Delay next queue execute
		if (nextQueueDelay && delayRemain > 0) {
			setTimeout(() => {
				setDelayRemain(delayRemain - 1);
			}, 1000);
		}
	}, [delayRemain, nextQueueDelay]);

	React.useEffect(() => {
		if (nextQueueDelay && delayRemain === 0) {
			nextQueueAction();
		}
	}, [delayRemain, nextQueueAction, nextQueueDelay]);

	const inactiveContents = (
		<Box component="div" sx={{ marginTop: 3, textAlign: "center" }}>
			{/* <Typography component="h5" variant="h5" color="error">
				{lang.admin.ticketGroup.status.inactive}
			</Typography> */}
		</Box>
	);

	const contents = (
		<React.Fragment>
			<ConfirmDialog maxWidth="xs" open={postPoneDialog} onConfirm={postponeQueueHandler} onReject={postponeDialogReject}>
				<Typography component="p" variant="body1">
					{lang.ticket.confirm.postpone} {currentQueue?.ticket_number}
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
						<Button
							onClick={nextQueueHandler}
							disabled={isLoading.nextQueue || isLoading.postpone || isLoading.finish || (!currentQueue && waitingQueueList.length == 0)}
							sx={{ fontWeight: "bolder", flex: 1 }}
							variant="contained"
						>
							{currentQueue && waitingQueueList.length > 0 && lang.ticket.button.finishAndNext}
							{!currentQueue && lang.ticket.button.next}
							{currentQueue && waitingQueueList.length == 0 && lang.ticket.button.finish}
						</Button>
					)}
					{nextQueueDelay && (
						<Button onClick={aboartQueueHandler} sx={{ fontWeight: "bolder", flex: 1 }} variant="contained" color={currentQueue ? "error" : "error"}>
							{!currentQueue && lang.ticket.button.abort}
							{currentQueue && lang.ticket.button.finishAndNext} ({delayRemain})
						</Button>
					)}
					{currentQueue && (
						<Button
							onClick={postponeConfirmDialog}
							color="warning"
							disabled={!currentQueue || isLoading.nextQueue || isLoading.postpone || isLoading.finish}
							sx={{ fontWeight: "bolder" }}
							variant="outlined"
						>
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
		</React.Fragment>
	);

	const tabPanel = (
		<Box component="div" sx={{ margin: 0, padding: 1 }}>
			{tabValue === tabWaiting && <TicketList onReject={rejectQueueHandler} onRecall={recallQueueHandler} onFinish={finishQueueHandler} label="waitingQueue" tickets={waitingQueueList}></TicketList>}
			{tabValue === tabPostpone && (
				<TicketList
					onReject={rejectQueueHandler}
					onRecall={recallQueueHandler}
					onFinish={finishQueueHandler}
					onCheckCurrentQueue={currentQueueCheck}
					label="postponeQueue"
					tickets={postponeQueueList}
				></TicketList>
			)}
			{tabValue === tabPast && <TicketList onReject={rejectQueueHandler} onRecall={recallQueueHandler} onFinish={finishQueueHandler} label="pastQueue" tickets={pastQueueList}></TicketList>}
		</Box>
	);

	return (
		<Card sx={{ width: cardSize }}>
			<ConfirmDialog open={confirmActive} onConfirm={activeTicketGroupHandler} onReject={activeTicketGroupClose}></ConfirmDialog>
			<ConfirmDialog open={confirmInactive} onConfirm={inactiveTicketGroupHandler} onReject={inactiveTicketGroupClose}></ConfirmDialog>
			<CardContent sx={{ paddingBottom: 0 }}>
				<Box component="div" sx={{ marginBottom: 1 }}>
					{ticketGroup.active === 0 && (
						<Button onClick={activeTicketGroupConfirm} color="error" variant="contained" fullWidth>
							{lang.admin.ticketGroup.status.inactive}
						</Button>
					)}
					{ticketGroup.active === 1 && (
						<Button onClick={inactiveTicketGroupConfirm} color="success" variant="contained" fullWidth>
							{lang.admin.ticketGroup.status.active}
						</Button>
					)}
				</Box>
				<Box component="div" sx={{ margin: 0 }}>
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
