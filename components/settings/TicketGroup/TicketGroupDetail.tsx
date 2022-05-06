import React from "react";
import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, Typography } from "@mui/material";
import TicketGroup from "../../../models/TicketGroup";
import OriginProps from "../../../models/util/OriginProps";
import Image from "next/image";

interface Props extends OriginProps {
	ticketGroup: TicketGroup | null;
	open: boolean;
	onClose: () => void;
}

const TicketGroupDetail: React.FC<Props> = (props) => {
	const { ticketGroup, open } = props;
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

	if (!ticketGroup) return null;

	const qrCodeUrl = baseUrl + "ticket_group_code/" + ticketGroup.ticket_group_code;

	return (
		<Dialog open={open} onClose={props.onClose} maxWidth="md" fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Ticket Group Detail</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={5}>
						<img src={qrCodeUrl} />
					</Grid>
					<Grid item xs={7}>
						<Box component="div">
							<Typography component="h4" variant="h4">
								Prefix: {ticketGroup.ticket_group_prefix}
							</Typography>
						</Box>
						<Divider  sx={{ mt: 3, mb: 3 }} />
						<Box component="div">
							<Typography component="h5" variant="h5">
								Description
							</Typography>
						</Box>
						<Box component="div">
							<Typography component="p" variant="body1">
								{ticketGroup.description}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default TicketGroupDetail;
