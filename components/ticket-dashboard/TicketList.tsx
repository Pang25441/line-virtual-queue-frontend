import { Button, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useContextLang } from "../../contexts/LangContext";
import Ticket from "../../models/Ticket";
import OriginProps from "../../models/util/OriginProps";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

interface Props extends OriginProps {
	label?: string;
	tickets: Ticket[];
	onRecall?: (ticket: Ticket) => {};
	onReject?: (ticket: Ticket) => {};
	onFinish?: (ticket: Ticket) => {};
}

const TicketList: React.FC<Props> = (props) => {
	const { tickets, label } = props;

	const lang = useContextLang();


	const timeStr = (datetime: string | null) => {
		if (datetime === null) return "";
		const date = dayjs(datetime, "YYYY-MM-DD HH:mm:ss");
		return date.format("HH:mm");
	};

	const ticketRecallHandler = (ticket: Ticket) => {
		if (props.onRecall) props.onRecall(ticket);
	};

	const ticketRejectHandler = (ticket: Ticket) => {
		if (props.onReject) props.onReject(ticket);
	};

	const ticketFinishHandler = (ticket: Ticket) => {
		if (props.onFinish) props.onFinish(ticket);
	};

	const secondaryAction = (ticket: Ticket) => {
		const rejectBtn =
			ticket.ticket_status.code == lang.ticket.status.calling && ticket.is_postpone === 1 ? (
				<IconButton onClick={ticketRejectHandler.bind(null, ticket)} color="error">
					<DeleteForeverRoundedIcon />
				</IconButton>
			) : null;

		const recallBtn =
			ticket.ticket_status.code == lang.ticket.status.calling && ticket.is_postpone === 1 ? (
				<Button onClick={ticketRecallHandler.bind(null, ticket)} variant="outlined" size="small" color="secondary">
					{lang.ticket.button.recall}
				</Button>
			) : null;

		const finishBtn =
			ticket.ticket_status.code == lang.ticket.status.calling && ticket.is_postpone === 0 ? (
				<Button onClick={ticketFinishHandler.bind(null, ticket)} variant="outlined" size="small" color="success">
					{lang.ticket.button.finish}
				</Button>
			) : null;

		const isFinished = ticket.ticket_status.code == lang.ticket.status.executed;
		const isReject = ticket.ticket_status.code == lang.ticket.status.rejected;

		return (
			<Fragment>
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
			</Fragment>
		);
	};

	if (tickets.length === 0)
		return (
			<Typography component="h6" variant="h6" sx={{ textAlign: "center" }}>
				No data
			</Typography>
		);

	return (
		<Fragment>
			{/* <Typography component="h6" variant="h6">
				{label}
			</Typography> */}
			{tickets.map((ticket) => (
				<List key={"ticket-" + ticket.id} sx={{ width: "100%", bgcolor: "background.paper", fontSize: "small" }} aria-label="contacts">
					<ListItem disablePadding secondaryAction={secondaryAction(ticket)}>
						<ListItemButton>
							<ListItemText primary={ticket.ticket_number + " , " + timeStr(ticket.pending_time)} secondary={ticket.line_member.display_name + "ssssssssssssssssssssssss"} />
						</ListItemButton>
					</ListItem>
				</List>
			))}
		</Fragment>
	);
};

export default TicketList;
