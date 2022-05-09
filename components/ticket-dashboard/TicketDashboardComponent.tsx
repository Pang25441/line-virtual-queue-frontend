import { Box, Paper, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useContextLang } from "../../contexts/LangContext";
import { useContextTicketAdmin } from "../../contexts/TicketAdminContext";
import TicketGroup from "../../models/TicketGroup";
import OriginProps from "../../models/util/OriginProps";
import TicketGroupAdminItem from "./TicketGroupAdminItem";

interface Props extends OriginProps {}

const TicketDashboardComponent: React.FC<Props> = (props) => {
	const [ticketGroups, setTicketGroups] = React.useState<TicketGroup[]>([]);

	const lang = useContextLang();
	const ticketAdminCtx = useContextTicketAdmin();

	useEffect(() => {
		const init = async () => {
			const result = await ticketAdminCtx.getTicketGroupList();
			return result;
		};

		init().then((result) => {
			if (result) setTicketGroups(result);
		});
	}, []);

	return (
		<Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
			{ticketGroups.map((ticketGroup) => (
				// <Box component="div" sx={{ display: "flex", flexWrap: "wrap" }}></Box>
                <TicketGroupAdminItem key={ticketGroup.ticket_group_code} ticketGroup={ticketGroup}></TicketGroupAdminItem>
			))}
		</Stack>
	);
};

export default TicketDashboardComponent;
