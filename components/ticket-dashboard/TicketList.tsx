import { Button, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useContextLang } from "../../contexts/LangContext";
import Ticket from "../../models/Ticket";
import OriginProps from "../../models/util/OriginProps";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ConfirmDialog from "../ui/ConfirmDialog";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

interface Props extends OriginProps {
	label?: string;
	tickets: Ticket[];
	onRecall?: (ticket: Ticket) => Promise<Ticket | false>;
	onReject?: (ticket: Ticket) => Promise<Ticket | false>;
	onFinish?: (ticket: Ticket) => Promise<Ticket | false>;
	onCheckCurrentQueue?: () => Promise<boolean>;
}

const confirmDefaultState: { open: boolean; ticket: Ticket | null; hasCurrent: boolean } = { open: false, ticket: null, hasCurrent: false };

const TicketList: React.FC<Props> = (props) => {
	const [recallConfirm, setRecallConfirm] = React.useState(confirmDefaultState);
	const [rejectConfirm, setRejectConfirm] = React.useState(confirmDefaultState);
	const [finishConfirm, setFinishConfirm] = React.useState(confirmDefaultState);

	const { tickets, label } = props;

	const lang = useContextLang();

	const timeStr = (datetime: string | null) => {
		if (datetime === null) return "";
		const date = dayjs(datetime, "YYYY-MM-DD HH:mm:ss");
		return date.format("HH:mm");
	};

	const ticketRecallConfirm = (ticket: Ticket) => {
		setRecallConfirm({ ...confirmDefaultState, open: true, ticket });
	};

	const ticketRecallClose = () => {
		setRecallConfirm(confirmDefaultState);
	};

	const ticketRecallHandler = (ticket: Ticket | null) => {
		ticketRecallClose();
		if (ticket && props.onRecall) props.onRecall(ticket);
	};

	const ticketRejectConfirm = async (ticket: Ticket) => {
		const hasCurrent = props.onCheckCurrentQueue ? await props.onCheckCurrentQueue() : false;
		setRejectConfirm({ open: true, ticket, hasCurrent });
	};

	const ticketRejectClose = () => {
		setRejectConfirm(confirmDefaultState);
	};

	const ticketRejectHandler = (ticket: Ticket | null) => {
		ticketRejectClose();
		if (ticket && props.onReject) props.onReject(ticket);
	};

	const ticketFinishConfirm = (ticket: Ticket) => {
		setFinishConfirm({ ...confirmDefaultState, open: true, ticket });
	};

	const ticketFinishClose = () => {
		setFinishConfirm(confirmDefaultState);
	};

	const ticketFinishHandler = (ticket: Ticket | null) => {
		ticketFinishClose();
		if (ticket && props.onFinish) props.onFinish(ticket);
	};

	const secondaryAction = (ticket: Ticket) => {
		const rejectBtn =
			ticket.ticket_status.code == lang.ticket.status.calling && ticket.is_postpone === 1 ? (
				<IconButton onClick={ticketRejectConfirm.bind(null, ticket)} color="error">
					<DeleteForeverRoundedIcon />
				</IconButton>
			) : null;

		const recallBtn =
			ticket.ticket_status.code == lang.ticket.status.calling && ticket.is_postpone === 1 ? (
				<Button onClick={ticketRecallConfirm.bind(null, ticket)} variant="outlined" size="small" color="secondary">
					{lang.ticket.button.recall}
				</Button>
			) : null;

		const finishBtn =
			ticket.ticket_status.code == lang.ticket.status.calling && ticket.is_postpone === 0 ? (
				<Button onClick={ticketFinishConfirm.bind(null, ticket)} variant="outlined" size="small" color="success">
					{lang.ticket.button.finish}
				</Button>
			) : null;

		const isFinished = ticket.ticket_status.code == lang.ticket.status.executed;
		const isReject = ticket.ticket_status.code == lang.ticket.status.rejected;

		return (
			<React.Fragment>
				{rejectBtn}
				{recallBtn}
				{finishBtn}
				{isFinished && (
					<Typography component="span" variant="body1" color="green">
						{lang.ticket.statusLabel.executed}
					</Typography>
				)}
				{isReject && (
					<Typography component="span" variant="body1" color="red">
						{lang.ticket.statusLabel.rejected}
					</Typography>
				)}
			</React.Fragment>
		);
	};

	if (tickets.length === 0)
		return (
			<Typography component="h6" variant="h6" sx={{ textAlign: "center" }}>
				{lang.ticket.listEmpty}
			</Typography>
		);

	return (
		<React.Fragment>
			{/* <Typography component="h6" variant="h6">
				{label}
			</Typography> */}
			<ConfirmDialog open={recallConfirm.open} onConfirm={ticketRecallHandler.bind(null, recallConfirm.ticket)} onReject={ticketRecallClose}>
				{recallConfirm.hasCurrent ? lang.ticket.confirm.finishAndrecall : lang.ticket.confirm.recall} {recallConfirm.ticket?.ticket_number}
			</ConfirmDialog>
			<ConfirmDialog open={rejectConfirm.open} onConfirm={ticketRejectHandler.bind(null, rejectConfirm.ticket)} onReject={ticketRejectClose}>
				{lang.ticket.confirm.reject} {rejectConfirm.ticket?.ticket_number}
			</ConfirmDialog>
			<ConfirmDialog open={finishConfirm.open} onConfirm={ticketFinishHandler.bind(null, finishConfirm.ticket)} onReject={ticketFinishClose}>
				{lang.ticket.confirm.finish} {finishConfirm.ticket?.ticket_number}
			</ConfirmDialog>
			{tickets.map((ticket) => (
				<List key={"ticket-" + ticket.id} sx={{ width: "100%", bgcolor: "background.paper", fontSize: "small" }} aria-label="contacts">
					<ListItem disablePadding secondaryAction={secondaryAction(ticket)}>
						<ListItemButton>
							<ListItemText primary={ticket.ticket_number + " , " + timeStr(ticket.pending_time)} secondary={ticket.line_member.display_name + "ssssssssssssssssssssssss"} />
						</ListItemButton>
					</ListItem>
				</List>
			))}
		</React.Fragment>
	);
};

export default TicketList;
