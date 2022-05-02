import React, { Fragment, useEffect, useState } from "react";
import TicketGroup from "../../../models/TicketGroup";
import OriginProps from "../../../models/util/OriginProps";
import TicketGroupForm from "./TicketGroupForm";
import TicketGroupList from "./TicketGroupList";

const TICKET_GROUP_DUMMY: TicketGroup[] = [
	{ id: 1, queue_setting_id: 1, ticket_group_code: "hsmdtgras", ticket_group_prefix: "A", active_count: 11, active: 0, description: "", updated_at: "" },
	{ id: 2, queue_setting_id: 1, ticket_group_code: "5h6wbtby3", ticket_group_prefix: "B", active_count: 35, active: 0, description: "", updated_at: "" },
	{ id: 3, queue_setting_id: 1, ticket_group_code: "gfhjlhsdc", ticket_group_prefix: "C", active_count: 12, active: 1, description: "", updated_at: "" },
	{ id: 4, queue_setting_id: 1, ticket_group_code: "xmys54esr", ticket_group_prefix: "D", active_count: 90, active: 0, description: "", updated_at: "" },
];

interface Props extends OriginProps {}

const TicketGroupComponent: React.FC<Props> = (props) => {
	// const [isInit, setIsInit] = useState(false);
	const [selectedTicketGroup, setSelectedTicketGroup] = useState<TicketGroup | null>(null);
	const [formOpen, setFormOpen] = useState(false);
	const [ticketGroups, setTicketGroups] = useState<TicketGroup[]>([]);

	useEffect(() => {
		setTicketGroups(TICKET_GROUP_DUMMY);
	}, []);

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

	const handleSave = (data: TicketGroup) => {};

	return (
		<Fragment>
			<TicketGroupList onCreateAction={handleOpenCreateForm} onUpdateAction={handleOpenUpdateForm} ticketGroups={ticketGroups} />
			<TicketGroupForm ticketGroup={selectedTicketGroup} onSave={handleSave} onClose={handleCloseForm} open={formOpen}></TicketGroupForm>
		</Fragment>
	);
};

export default TicketGroupComponent;
