import { Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { Fragment } from "react";
import Ticket from "../../models/Ticket";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
	label?: string;
	tickets: Ticket[];
	onRecall?: (ticket: Ticket) => {};
}

const TicketList: React.FC<Props> = (props) => {
	const { tickets, label } = props;

	const secondaryAction = (ticket: Ticket) => {
		if (ticket.is_postpone !== 1) return null;

		return (
			<Button variant="outlined" size="small">
				Recall
			</Button>
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
			<Typography component="h6" variant="h6">
				{label}
			</Typography>
			{tickets.map((ticket) => (
				<List sx={{ width: "100%", bgcolor: "background.paper", fontSize: "small" }} aria-label="contacts">
					<ListItem disablePadding secondaryAction={secondaryAction(ticket)}>
						<ListItemButton>
							<ListItemText primary={ticket.ticket_number} />
							<ListItemText primary={ticket.line_member.display_name} />
						</ListItemButton>
					</ListItem>
				</List>
			))}
		</Fragment>
	);
};

export default TicketList;
