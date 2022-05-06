import React, { Fragment } from "react";
import CalendarSetting from "../../../models/CalendarSetting";
import OriginProps from "../../../models/util/OriginProps";
import CalendarSettingList from "./CalendarSettingList";

const CALENDAR_SETTING_DUMMY: CalendarSetting[] = [
	{
		id: 1,
		queue_setting_id: 1,
		calendar_date: "2022-02-01",
		business_time_open: "09:30:00",
		business_time_close: "17:00:00",
		day_off: [1, 2, 3],
		allocate_time: "00:30:00",
		booking_limit: 1,
		active: 1,
		updated_at: "",
	},
	{
		id: 2,
		queue_setting_id: 1,
		calendar_date: "2022-03-01",
		business_time_open: "09:30:00",
		business_time_close: "17:00:00",
		day_off: [1, 2, 3],
		allocate_time: "00:30:00",
		booking_limit: 1,
		active: 1,
		updated_at: "",
	},
	{
		id: 3,
		queue_setting_id: 1,
		calendar_date: "2022-04-01",
		business_time_open: "09:30:00",
		business_time_close: "17:00:00",
		day_off: [1, 2, 3],
		allocate_time: "00:30:00",
		booking_limit: 1,
		active: 1,
		updated_at: "",
	},
	{
		id: 4,
		queue_setting_id: 1,
		calendar_date: "2022-04-01",
		business_time_open: "09:30:00",
		business_time_close: "17:00:00",
		day_off: [1, 2, 3],
		allocate_time: "00:30:00",
		booking_limit: 1,
		active: 1,
		updated_at: "",
	},
];

const CalendarSettingComponent: React.FC<OriginProps> = () => {
	return (
		<Fragment>
			<CalendarSettingList calendarSettings={CALENDAR_SETTING_DUMMY}></CalendarSettingList>
		</Fragment>
	);
};

export default CalendarSettingComponent;
