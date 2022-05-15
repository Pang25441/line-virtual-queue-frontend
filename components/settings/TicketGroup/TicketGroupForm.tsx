/**
 * TicketGroupForm
 *
 */
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useContextLang } from "../../../contexts/LangContext";
import { useContextTicketGroup } from "../../../contexts/TicketGroupContext";
import TicketGroup from "../../../models/TicketGroup";
import OriginProps from "../../../models/util/OriginProps";

interface Props extends OriginProps {
	open: boolean;
	ticketGroup: TicketGroup | null;
	isLoading?: boolean;
	onSave: (ticketGroup: TicketGroup) => void;
	onClose?: () => void;
}

const TicketGroupForm: React.FC<Props> = (props) => {
	const { open, ticketGroup } = props;
	const [isInit, setIsInit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [ticketGroupData, setTicketGroupData] = useState<TicketGroup | null>(ticketGroup);
	const [activeStatus, setActiveStatus] = useState(0);

	const fieldLabelMargin = 3;
	const fieldDescMargin = 2;
	const dividerMargin = 3;

	const ticketGroupCtx = useContextTicketGroup();
	const lang = useContextLang();

	useEffect(() => {
		console.log("TicketGroupForm", "useEffect");
		if (open) {
			if (ticketGroup && ticketGroup?.id) {
				ticketGroupCtx
					.getTicketGroup(ticketGroup?.id)
					.then((data: any) => {
						setTicketGroupData(data);
						if (data) {
							setActiveStatus(data.active || 0);
							console.log("ticketGroup", data.id);
						} else {
							setActiveStatus(0);
						}
					})
					.finally(() => {
						setIsInit(true);
					});
			} else {
				setIsInit(true);
				setActiveStatus(0);
			}
		} else {
			setTimeout(() => {
				setIsInit(false);
				setTicketGroupData(null);
			}, 500);
		}
	}, [open]);

	useEffect(() => {
		const loadingProps = props.isLoading || false;
		setIsLoading(loadingProps);
	}, [props.isLoading]);

	const handleActiveStatusChange = (event: React.MouseEvent<HTMLElement>, newActiveStatus: number) => {
		setActiveStatus(newActiveStatus);
	};

	const handleClose = (event?: any, reason?: string) => {
		if (reason && ["backdropClick", "escapeKeyDown"].indexOf(reason) != -1) return;
		if (typeof props.onClose == "function") props.onClose();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data: TicketGroup = {
			...ticketGroupData,
			id: ticketGroupData ? ticketGroupData.id : null,
			active: activeStatus,
			ticket_group_prefix: formData.get("ticket_group_prefix")?.toString(),
			description: formData.get("description")?.toString() || "",
		};
		props.onSave(data);
	};

	const loadingSpinner = (
		<Box component="div" sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
			<CircularProgress color="inherit" />
		</Box>
	);

	const formElement = (
		<Fragment>
			<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
				{lang.admin.ticketGroup.column.active}
			</Typography>
			{/* {ticketGroupData != null && (
				<ToggleButtonGroup disabled={ticketGroupData == null} color="primary" value={activeStatus} exclusive onChange={handleActiveStatusChange}>
					<ToggleButton color="success" value={1}>
						Active
					</ToggleButton>
					<ToggleButton color="error" value={0}>
						Inactive
					</ToggleButton>
				</ToggleButtonGroup>
			)} */}

			<Typography variant="body1" component="p" color={activeStatus == 1 ? "success" : "error"}>
				{activeStatus === 1 && lang.admin.ticketGroup.status.active}
				{activeStatus === 0 && lang.admin.ticketGroup.status.inactive}
			</Typography>

			<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
				{lang.admin.ticketGroup.column.prefix}
			</Typography>
			<TextField type="text" id="ticket_group_prefix" name="ticket_group_prefix" defaultValue={ticketGroupData?.ticket_group_prefix} label="Required" variant="outlined" required fullWidth />

			<Typography variant="h5" component="p" sx={{ my: fieldLabelMargin }}>
				{lang.admin.ticketGroup.column.description}
			</Typography>
			<TextField type="text" id="description" name="description" defaultValue={ticketGroupData?.description} label="" variant="outlined" fullWidth />
		</Fragment>
	);

	return (
		<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={isLoading || !isInit ? "sm" : "md"}>
			<Box component="form" onSubmit={handleSubmit}>
				<DialogTitle>Ticket Group Setting</DialogTitle>
				<DialogContent>
					{isInit && !isLoading && formElement}
					{!isInit && loadingSpinner}
					{isLoading && loadingSpinner}
				</DialogContent>
				{isInit && !isLoading && (
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Save</Button>
					</DialogActions>
				)}
			</Box>
		</Dialog>
	);
};

export default TicketGroupForm;
