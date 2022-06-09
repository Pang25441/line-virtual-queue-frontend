import React, { Fragment, useCallback, useEffect, useState } from "react";
import TicketGroup from "../../../models/TicketGroup";
import OriginProps from "../../../models/util/OriginProps";
import { useContextTicketGroup } from "../../../contexts/TicketGroupContext";
import ConfirmDialog from "../../ui/ConfirmDialog";
import TicketGroupForm from "./TicketGroupForm";
import TicketGroupList from "./TicketGroupList";
import TabHeading from "../../layout/TabHeading";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProgressBackdrop from "../../ui/ProgressBackdrop";
import { useSnackbar } from "notistack";
import TicketGroupDetail from "./TicketGroupDetail";
import { useContextLang } from "../../../contexts/LangContext";

interface Props extends OriginProps {}

const TicketGroupComponent: React.FC<Props> = (props) => {
	const [isInit, setIsInit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedTicketGroup, setSelectedTicketGroup] = useState<TicketGroup | null>(null);
	const [formOpen, setFormOpen] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [detailDialog, setDetailDialog] = useState(false);
	const [deletingID, setDeletingID] = useState<number>(0);
	const [ticketGroups, setTicketGroups] = useState<TicketGroup[]>([]);
	const [errMessage, setErrMessage] = useState<string | null>(null);

	const ticketGroupCtx = useContextTicketGroup();
	const lang = useContextLang();
	const { enqueueSnackbar } = useSnackbar();

	const reloadTicketGroupList = useCallback(async () => {
		const result = await ticketGroupCtx.getTicketGroupList();
		console.log("reloadTicketGroupList", result);
		const list = result || [];
		setTicketGroups(list);
		return list;
	}, [ticketGroupCtx]);

	const handleOpenCreateForm = () => {
		setSelectedTicketGroup(null);
		setFormOpen(true);
	};

	const handleCloseForm = () => {
		setSelectedTicketGroup(null);
		setFormOpen(false);
	};

	const handleOpenUpdateForm = (id: number) => {
		let selected = ticketGroups.find((data) => data.id === id) || null;
		console.log("find id ", id, !!selected);
		setSelectedTicketGroup(selected);
		setFormOpen(true);
	};

	const handleSave = async (data: TicketGroup) => {
		setIsLoading(true);
		console.log("handleSave", "data", data);
		const result = data.id ? await ticketGroupCtx.updateTicketGroup(data) : await ticketGroupCtx.createTicketGroup(data);
		console.log("handleSave", "result", result);
		setFormOpen(false);
		enqueueSnackbar("Ticket Group Saved Successful", { variant: "success" });
		if (result) {
			reloadTicketGroupList().finally(() => {
				setIsLoading(false);
			});
		}
	};

	const handleDelete = (id: number) => {
		setDeletingID(id);
		setDeleteDialog(true);
	};

	const handleConfirmDelete = async () => {
		setDeleteDialog(false);
		if (!deletingID) {
			enqueueSnackbar("Ticket Group deleted failed", { variant: "error" });
			return;
		}
		setIsLoading(true);
		const result = await ticketGroupCtx.deleteTicketGroup(deletingID);
		setDeletingID(0);
		if (result) {
			reloadTicketGroupList().finally(() => {
				setIsLoading(false);
				enqueueSnackbar("Ticket Group Deleted Successful", { variant: "success" });
			});
		}
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialog(false);
	};

	const handleDetail = (ticketGroupId: number) => {
		let selected = ticketGroups.find((data) => data.id === ticketGroupId) || null;
		setSelectedTicketGroup(selected);
		setDetailDialog(true);
	};

	const handleDetailClose = () => {
		// setSelectedTicketGroup(null);
		setDetailDialog(false);
	};

	useEffect(() => {
		// Initial Component
		console.log("Initialize Ticket Group Component");
		if (!isInit && !isLoading) {
			console.log("TicketGroupComponent", "reloadTicketGroupList");
			setIsLoading(true);
			reloadTicketGroupList()
				.then(() => {
					console.log("TicketGroupComponent", "ok");
				})
				.finally(() => {
					console.log("TicketGroupComponent", "finally");
					setIsInit(true);
					setIsLoading(false);
				});
		}
	}, [isInit, isLoading, reloadTicketGroupList]);

	useEffect(() => {
		// On Error Message Changed
		setErrMessage(ticketGroupCtx.errMessage);
		if (ticketGroupCtx.errMessage) enqueueSnackbar(ticketGroupCtx.errMessage, { variant: "error" });
	}, [enqueueSnackbar, ticketGroupCtx.errMessage]);

	const heading = <TabHeading heading={lang.admin.ticketGroup.heading}></TabHeading>;

	const controlPanel = (
		<Box component="div" sx={{ my: 1 }}>
			<Button onClick={handleOpenCreateForm} color="primary" variant="contained" sx={{ fontWeight: "bold" }}>
				<AddIcon></AddIcon>
				{lang.admin.ticketGroup.addBtn || "Add Ticket Group"}
			</Button>
		</Box>
	);

	const errBox = (
		<Alert variant="filled" severity="error">
			{errMessage}
		</Alert>
	);

	if (!isInit) {
		return (
			<Fragment>
				{heading}
				<Box component="div" sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
					<CircularProgress color="inherit" />
				</Box>
			</Fragment>
		);
	}

	return (
		<Fragment>
			{heading}
			{errMessage && errBox}
			{controlPanel}
			{ticketGroups.length > 0 && <TicketGroupList onUpdateAction={handleOpenUpdateForm} onDeleteAction={handleDelete} onDetailAction={handleDetail} ticketGroups={ticketGroups} />}
			<TicketGroupDetail ticketGroup={selectedTicketGroup} onClose={handleDetailClose} open={detailDialog} />
			<TicketGroupForm ticketGroup={selectedTicketGroup} onSave={handleSave} onClose={handleCloseForm} open={formOpen} isLoading={isLoading}></TicketGroupForm>
			<ConfirmDialog open={deleteDialog} onConfirm={handleConfirmDelete} onReject={handleDeleteDialogClose}>
				{lang.admin.ticketGroup.confirmDeleteText}
			</ConfirmDialog>
			{isLoading && <ProgressBackdrop></ProgressBackdrop>}
		</Fragment>
	);
};

export default TicketGroupComponent;
