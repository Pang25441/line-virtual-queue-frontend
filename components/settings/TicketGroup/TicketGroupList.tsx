import React, { Fragment } from "react";

import OriginProps from "../../../models/util/OriginProps";
import TicketGroup from "../../../models/TicketGroup";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { EmptyBox } from "../../layout/EmptyBox";
import InfoIcon from "@mui/icons-material/Info";
import { useContextLang } from "../../../contexts/LangContext";

interface Props extends OriginProps {
	ticketGroups: TicketGroup[] | null;
	onUpdateAction?: (ticketGroupId: number) => void;
	onDeleteAction?: (ticketGroupId: number) => void;
	onDetailAction?: (ticketGroupId: number) => void;
}

const TicketGroupList: React.FC<Props> = (props) => {
	const { ticketGroups } = props;

	const lang = useContextLang();

	const fieldLabelMargin = 3;
	const fieldDescMargin = 2;
	const dividerMargin = 3;

	const handleUpdate = (id: number) => {
		if (typeof props.onUpdateAction == "function") props.onUpdateAction(id);
	};

	const handleDelete = (id: number) => {
		if (typeof props.onDeleteAction == "function") props.onDeleteAction(id);
	};

	const handleDetail = (id: number) => {
		if (typeof props.onDetailAction == "function") props.onDetailAction(id);
	};

	const gridActionColumn = (ticketGroup: TicketGroup) => {
		const id = ticketGroup.id || 0;
		return (
			<Fragment>
				<IconButton onClick={handleDetail.bind(null, id)} color="default">
					<InfoIcon />
				</IconButton>
				<IconButton onClick={handleUpdate.bind(null, id)} color="default">
					<EditIcon />
				</IconButton>
				<IconButton disabled={ticketGroup.active == 1} onClick={handleDelete.bind(null, id)} color="error">
					<DeleteForeverIcon />
				</IconButton>
			</Fragment>
		);
	};

	const gridActiveStatus = (active: any) => {
		return (
			<Typography color={active === 1 ? "green" : "error"} component="span" fontWeight="bold">
				{active === 1 && lang.admin.ticketGroup.status.active}
				{active === 0 && lang.admin.ticketGroup.status.inactive}
			</Typography>
		);
	};

	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID", maxWidth: 40, headerAlign: "center", align: "right" },
		{ field: "ticket_group_prefix", headerName: lang.admin.ticketGroup.column.prefix, headerAlign: "center", align: "center", flex: 1 },
		// { field: "ticket_group_code", headerName: "Code", headerAlign: "center", sortable: false, flex: 2 },
		// { field: "active_count", headerName: "Count", headerAlign: "center", align: "right", flex: 1 },
		{ field: "description", headerName: lang.admin.ticketGroup.column.description, headerAlign: "center", sortable: false, flex: 2 },
		{
			field: "active",
			headerName: lang.admin.ticketGroup.column.active,
			headerAlign: "center",
			align: "center",
			flex: 1,
			renderCell: (params: GridValueGetterParams) => gridActiveStatus(params.row.active),
		},
		{
			field: "action",
			headerName: lang.admin.ticketGroup.column.action,
			headerAlign: "center",
			align: "center",
			sortable: false,
			flex: 1,
			renderCell: (params: GridValueGetterParams) => gridActionColumn(params.row),
		},
	];

	const emptyOutput = <EmptyBox>{lang.admin.listDataEmpty}</EmptyBox>;

	if (!ticketGroups) {
		return <Fragment>{emptyOutput}</Fragment>;
	}

	return (
		<Box component="div" sx={{ mt: 1 }}>
			<DataGrid rows={ticketGroups} columns={columns} disableSelectionOnClick autoHeight showColumnRightBorder showCellRightBorder hideFooterSelectedRowCount hideFooter disableColumnSelector />
		</Box>
	);
};

export default TicketGroupList;
