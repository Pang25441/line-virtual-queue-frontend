import React, { Fragment, useContext, useEffect, useState } from "react";
import TicketGroup from "../../../models/TicketGroup";
import OriginProps from "../../../models/util/OriginProps";
import { useContextTicketGroup } from "../../../store/TicketGroupContext";
import ConfirmDialog from "../../ui/ConfirmDialog";
import TicketGroupForm from "./TicketGroupForm";
import TicketGroupList from "./TicketGroupList";

interface Props extends OriginProps {}

const TicketGroupComponent: React.FC<Props> = (props) => {
	// const [isInit, setIsInit] = useState(false);
	const [selectedTicketGroup, setSelectedTicketGroup] = useState<TicketGroup | null>(null);
	const [formOpen, setFormOpen] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [deletingID, setDeletingID] = useState<number>(0);
	const [ticketGroups, setTicketGroups] = useState<TicketGroup[]>([]);

	const ticketGroupCtx = useContextTicketGroup();

	useEffect(() => {
		if (ticketGroupCtx.isInitial) {
			console.log("TicketGroupComponent", "reloadTicketGroupList");
			reloadTicketGroupList();
		}
	}, [ticketGroupCtx.isInitial, ticketGroupCtx.ticketGroupList]);

	const reloadTicketGroupList = async () => {
		const result = await ticketGroupCtx.getTicketGroupList();
		console.log("reloadTicketGroupList", result);
		const list = result || [];
		setTicketGroups(list);
	};

	const handleOpenCreateForm = () => {
		setSelectedTicketGroup(null);
		setFormOpen(true);
	};

	const handleCloseForm = () => {
		setFormOpen(false);
	};

	const handleOpenUpdateForm = (id: number) => {
		let selected = ticketGroups.find((data) => data.id === id) || null;
		console.log("find id ", id, !!selected);
		setSelectedTicketGroup(selected);
		setFormOpen(true);
	};

	const handleSave = (data: TicketGroup) => {
		console.log("handleSave", "data", data);
		const result = data.id ? ticketGroupCtx.updateTicketGroup(data) : ticketGroupCtx.createTicketGroup(data);
		console.log("handleSave", "result", result);
		setFormOpen(false);
		if (result) {
		}
	};

	const handleDelete = (id: number) => {
		setDeletingID(id);
		setDeleteDialog(true);
	};

	const handleConfirmDelete = () => {
		const result = ticketGroupCtx.deleteTicketGroup(deletingID);
		setDeleteDialog(false);
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialog(false);
	};

	return (
		<Fragment>
			<TicketGroupList onCreateAction={handleOpenCreateForm} onUpdateAction={handleOpenUpdateForm} onDeleteAction={handleDelete} ticketGroups={ticketGroups} />
			<TicketGroupForm ticketGroup={selectedTicketGroup} onSave={handleSave} onClose={handleCloseForm} open={formOpen}></TicketGroupForm>
			<ConfirmDialog open={deleteDialog} onConfirm={handleConfirmDelete} onReject={handleDeleteDialogClose}>
				Confirm To Delete
			</ConfirmDialog>
		</Fragment>
	);
};

export default TicketGroupComponent;
