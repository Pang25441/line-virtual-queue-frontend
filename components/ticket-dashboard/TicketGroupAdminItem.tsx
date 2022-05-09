import { Box, Button, ButtonGroup, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useContextLang } from "../../contexts/LangContext";
import TicketGroup from "../../models/TicketGroup";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
	ticketGroup: TicketGroup;
}

const TicketGroupAdminItem: React.FC<Props> = (props) => {
    const [tabValue, setTabValue] = React.useState(0);
	const { ticketGroup } = props;
    const lang = useContextLang();

    const currentQueue = ticketGroup.current_tickets?.filter(ticket=>ticket.status==2)

	return (
		<Card sx={{ width: "320px" }}>
			<CardContent>
				<Box component="div" sx={{ margin: 1 }}>
					<Grid container spacing={2}>
						<Grid md={4} xs={12}>
							<Typography component="h3" variant="h3" sx={{ textAlign: "center" }}>
								{ticketGroup.ticket_group_prefix}
							</Typography>
						</Grid>
						<Grid md={8} xs={12}>
							<Typography component="small" variant="caption">
								{ticketGroup.description}
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Divider />
				<Box component="div" sx={{ margin: 1 }}>
					<Typography component="h6" variant="h6" sx={{ textAlign: "center" }}>
						{lang.ticket.currentQueue}
					</Typography>
				</Box>
				<Box component="div" sx={{ margin: 1 }}>
					<Typography component="h1" variant="h1" sx={{ textAlign: "center" }}>
						A01
					</Typography>
				</Box>
				<Divider />
				<Box component="div" sx={{ margin: 1 }}>
					<ButtonGroup variant="text" color="inherit" sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between", textAlign: "Center" }} aria-label="text button group">
						<Button sx={{ display: "flex", flexGrow: 1 }}>Waiting</Button>
						<Button sx={{ display: "flex", flexGrow: 1 }}>Postpone</Button>
						<Button sx={{ display: "flex", flexGrow: 1 }}>Past</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
};

export default TicketGroupAdminItem;
