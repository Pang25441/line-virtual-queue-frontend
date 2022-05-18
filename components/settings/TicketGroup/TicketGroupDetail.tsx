import React from "react";
import { Box, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from "@mui/material";
import TicketGroup from "../../../models/TicketGroup";
import OriginProps from "../../../models/util/OriginProps";
import { useContextLang } from "../../../contexts/LangContext";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface Props extends OriginProps {
	ticketGroup: TicketGroup | null;
	open: boolean;
	onClose: () => void;
}

const TicketGroupDetail: React.FC<Props> = (props) => {
	const { ticketGroup, open } = props;
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

	const lang = useContextLang();

	if (!ticketGroup) return null;

	const qrCodeUrl = baseUrl + "ticket_group_code/" + ticketGroup.ticket_group_code + ".svg";

	return (
		<Dialog open={open} onClose={props.onClose} maxWidth="md" fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{lang.admin.ticketGroupDetail.heading}</DialogTitle>
			<DialogContent>
				<IconButton aria-label="close" onClick={props.onClose} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
					<CloseIcon />
				</IconButton>
				<Grid container spacing={2}>
					<Grid item xs={5}>
						{qrCodeUrl && <Image src={qrCodeUrl} alt="Ticket Group QR Code" objectFit="contain" layout="responsive" width="100%" height="100%" />}
					</Grid>
					<Grid item xs={7}>
						<Box component="div">
							<Typography component="h4" variant="h4">
								{lang.admin.ticketGroup.column.prefix}: {ticketGroup.ticket_group_prefix}
							</Typography>
						</Box>
						<Divider sx={{ mt: 3, mb: 3 }} />
						<Box component="div">
							<Typography component="h5" variant="h5">
								{lang.admin.ticketGroup.column.description}
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
