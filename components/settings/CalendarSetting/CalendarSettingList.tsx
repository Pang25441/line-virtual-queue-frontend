import React, { Fragment } from "react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { OriginProps } from "next/document";
import CalendarSetting from "../../../models/CalendarSetting";

interface Props extends OriginProps {
	calendarSettings: CalendarSetting[] | null;
}

const CalendarSettingList: React.FC<Props> = (props) => {
	return <Fragment></Fragment>;
};

export default CalendarSettingList;
