import React, { Fragment } from "react";

import OriginProps from "../../../models/util/OriginProps";
import TicketGroup from "../../../models/TicketGroup";
import { Box, Button, IconButton, Typography } from "@mui/material";
import TabHeading from "../../layout/TabHeading";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { LangAdminDesc } from "../../../lang/en/admin";
import { EmptyBox } from "../../layout/EmptyBox";

interface Props extends OriginProps {
	ticketGroups: TicketGroup[] | null;
	onCreateAction?: () => void;
	onUpdateAction?: (ticketGroupId: number) => void;
	onDeleteAction?: (ticketGroupId: number) => void;
}

const TicketGroupList: React.FC<Props> = (props) => {
	const { ticketGroups } = props;

	const fieldLabelMargin = 3;
	const fieldDescMargin = 2;
	const dividerMargin = 3;

	const handleCreate = () => {
		if (typeof props.onCreateAction == "function") props.onCreateAction();
	};

	const handleUpdate = (id: number) => {
		if (typeof props.onUpdateAction == "function") props.onUpdateAction(id);
	};

	const handleDelete = (id: number) => {
		if (typeof props.onDeleteAction == "function") props.onDeleteAction(id);
	};

	const gridActionColumn = (id: number) => {
		return (
			<Fragment>
				<IconButton onClick={handleUpdate.bind(null, id)} color="default">
					<EditIcon />
				</IconButton>
				<IconButton onClick={handleDelete.bind(null, id)} color="error">
					<DeleteForeverIcon />
				</IconButton>
			</Fragment>
		);
	};

	const gridActiveStatus = (active: any) => {
		return active == 1 ? (
			<Typography color="green" component="span" fontWeight="bold">
				Active
			</Typography>
		) : (
			<Typography color="error" component="span" fontWeight="bold">
				Inactive
			</Typography>
		);
	};

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", maxWidth: 40, headerAlign: "center", align: "right" },
		{ field: "ticket_group_prefix", headerName: "Prefix", headerAlign: "center", align: "center", flex: 1 },
		{ field: "ticket_group_code", headerName: "Code", headerAlign: "center", sortable: false, flex: 2 },
		// { field: "active_count", headerName: "Count", headerAlign: "center", align: "right", flex: 1 },
		{ field: "active", headerName: "Active", headerAlign: "center", align: "center", flex: 1, renderCell: (params: GridValueGetterParams) => gridActiveStatus(params.row.active) },
		{ field: "description", headerName: "Description", headerAlign: "center", sortable: false, flex: 2 },
		{ field: "action", headerName: "Action", headerAlign: "center", align: "center", sortable: false, flex: 1, renderCell: (params: GridValueGetterParams) => gridActionColumn(params.row.id) },
	];

	const heading = <TabHeading heading="Ticket Group"></TabHeading>;

	const emptyOutput = <EmptyBox>{LangAdminDesc.listDataEmpty}</EmptyBox>;

	const controlPanel = (
		<Box component="div" sx={{ my: 1 }}>
			<Button onClick={handleCreate} color="primary" variant="contained" sx={{ fontWeight: "bold" }}>
				<AddIcon></AddIcon>
				Add Ticket Group
			</Button>
		</Box>
	);

	if (!ticketGroups) {
		return (
			<Fragment>
				{heading}
				{controlPanel}
				{emptyOutput}
			</Fragment>
		);
	}

	return (
		<Box component="div" sx={{ mt: 1 }}>
			{heading}
			{controlPanel}
			<DataGrid rows={ticketGroups} columns={columns} disableSelectionOnClick autoHeight showColumnRightBorder showCellRightBorder hideFooterSelectedRowCount hideFooter disableColumnSelector />
		</Box>
	);
};

export default TicketGroupList;
