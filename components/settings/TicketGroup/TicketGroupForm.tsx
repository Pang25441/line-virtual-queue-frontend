/**
 * TicketGroupForm
 *
 */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TicketGroup from "../../../models/TicketGroup";
import OriginProps from "../../../models/util/OriginProps";

interface Props extends OriginProps {
	open: boolean;
	ticketGroup: TicketGroup | null;
	onSave: (ticketGroup: TicketGroup) => void;
	onClose?: () => void;
}

const TicketGroupForm: React.FC<Props> = (props) => {
	const { open, ticketGroup } = props;

	const [activeStatus, setActiveStatus] = useState(0);

	const fieldLabelMargin = 3;
	const fieldDescMargin = 2;
	const dividerMargin = 3;

	useEffect(() => {
		if (ticketGroup) {
			setActiveStatus(ticketGroup.active || 0);
			console.log("ticketGroup", ticketGroup.id);
		} else {
			setActiveStatus(0);
		}
	}, [ticketGroup]);

	const handleActiveStatusChange = (event: React.MouseEvent<HTMLElement>, newActiveStatus: number) => {
		setActiveStatus(newActiveStatus);
	};

	const handleClose = () => {
		if (typeof props.onClose == "function") props.onClose();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: TicketGroup = {
			id: ticketGroup ? ticketGroup.id : null,
			active: activeStatus,
			ticket_group_prefix: formData.get("ticket_group_prefix")?.toString(),
			description: formData.get("description")?.toString(),
		};
		props.onSave(data);
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
			<Box component="form" onSubmit={handleSubmit}>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
						Active
					</Typography>
					<ToggleButtonGroup disabled={ticketGroup==null} color="primary" value={activeStatus} exclusive onChange={handleActiveStatusChange}>
						<ToggleButton color="success" value={1}>
							Active
						</ToggleButton>
						<ToggleButton color="error" value={0}>
							Inactive
						</ToggleButton>
					</ToggleButtonGroup>

					<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
						Ticket Group Prefix
					</Typography>
					<TextField type="text" id="ticket_group_prefix" name="ticket_group_prefix" defaultValue={ticketGroup?.ticket_group_prefix} label="Required" variant="outlined" required fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Save</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default TicketGroupForm;
