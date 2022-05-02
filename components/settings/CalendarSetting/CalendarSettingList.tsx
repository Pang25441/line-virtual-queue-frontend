import React, { Fragment } from "react";

import { OriginProps } from "../../../models/util/OriginProps";
import CalendarSetting from "../../../models/CalendarSetting";
import { Box, Button, IconButton, Typography } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import TabHeading from "../../layout/TabHeading";
import { LangAdminDesc } from "../../../lang/en/admin";
import { EmptyBox } from "../../layout/EmptyBox";

import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

interface Props extends OriginProps {
	calendarSettings: CalendarSetting[] | null;
}

const CalendarSettingList: React.FC<Props> = (props) => {
	const { calendarSettings } = props;

	const fieldLabelMargin = 3;
	const fieldDescMargin = 2;
	const dividerMargin = 3;

	const handleEdit = (id: number) => {
		alert("edit " + id);
	};
	const handleDelete = (id: number) => {
		alert("delete " + id);
	};

	const actionColumn = (id: number) => {
		return (
			<Fragment>
				<IconButton onClick={handleEdit.bind(null, id)} color="default">
					<EditIcon />
				</IconButton>
				<IconButton onClick={handleDelete.bind(null, id)} color="error">
					<DeleteForeverIcon />
				</IconButton>
			</Fragment>
		);
	};

	const activeStatus = (active: any) => {
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

	const business_time = (business_time_open: string, business_time_close: string) => {
		const time_open = dayjs(business_time_open, "HH:mm:ss");
		const time_close = dayjs(business_time_close, "HH:mm:ss");
		return (
			<Fragment>
				{time_open.format("HH:mm")} - {time_close.format("HH:mm")}
			</Fragment>
		);
	};

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", maxWidth: 40, headerAlign: "center", align: "right" },
		{ field: "calendar_date", headerName: "Calendar", headerAlign: "center", align: "center", flex: 1, valueGetter: (params:GridValueGetterParams) => dayjs(params.row.calendar_date, "YYYY-MM-DD").format("YYYY / MM") },
		{
			field: "buisiness_time",
			headerName: "Buisiness Time",
			headerAlign: "center",
			align: "center",
			flex: 1,
			renderCell: (params: GridValueGetterParams) => business_time(params.row.business_time_open, params.row.business_time_close),
		},
		{ field: "day_off", headerName: "Day off", headerAlign: "center", align: "center", flex: 1, valueGetter: (params: GridValueGetterParams) => params.row.day_off.length },
		{ field: "active", headerName: "Active", headerAlign: "center", align: "center", flex: 1, renderCell: (params: GridValueGetterParams) => activeStatus(params.row.active) },
		{ field: "action", headerName: "Action", headerAlign: "center", align: "center", sortable: false, flex: 1, renderCell: (params: GridValueGetterParams) => actionColumn(params.row.id) },
	];

	const heading = <TabHeading heading="Booking Calendar" />;

	const emptyOutput = <EmptyBox>{LangAdminDesc.listDataEmpty}</EmptyBox>;

	const controlPanel = (
		<Box component="div" sx={{ my: 1 }}>
			<Button color="primary" variant="contained" sx={{ fontWeight: "bold" }}>
				<AddIcon></AddIcon>
				Add Calendar
			</Button>
		</Box>
	);

	if (!calendarSettings) {
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
			<DataGrid rows={calendarSettings} columns={columns} disableSelectionOnClick autoHeight showColumnRightBorder showCellRightBorder hideFooterSelectedRowCount hideFooter disableColumnSelector />
		</Box>
	);
};

export default CalendarSettingList;
