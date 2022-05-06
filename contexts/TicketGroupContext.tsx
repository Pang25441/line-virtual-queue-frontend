import React from "react";
import { useRouter } from "next/router";
import TicketGroup from "../models/TicketGroup";
import OriginProps from "../models/util/OriginProps";
import StatusCode from "../models/util/StatusCode";
import { useContextHttp } from "./HttpContext";

// const TICKET_GROUP_DUMMY: TicketGroup[] = [
// 	{ id: 1, queue_setting_id: 1, ticket_group_code: "hsmdtgras", ticket_group_prefix: "A", active_count: 11, active: 0, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
// 	{ id: 2, queue_setting_id: 1, ticket_group_code: "5h6wbtby3", ticket_group_prefix: "B", active_count: 35, active: 0, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
// 	{ id: 3, queue_setting_id: 1, ticket_group_code: "gfhjlhsdc", ticket_group_prefix: "C", active_count: 12, active: 1, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
// 	{ id: 4, queue_setting_id: 1, ticket_group_code: "xmys54esr", ticket_group_prefix: "D", active_count: 90, active: 0, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
// ];

type TicketGroupContextObj = {
	errMessage: string | null;
	getTicketGroupList: () => Promise<TicketGroup[] | false>;
	getTicketGroup: (ticketGroupId: number) => Promise<TicketGroup | false>;
	createTicketGroup: (data: TicketGroup) => Promise<TicketGroup | false>;
	updateTicketGroup: (data: TicketGroup) => Promise<TicketGroup | false>;
	deleteTicketGroup: (ticketGroupId: number) => Promise<boolean>;
};

export const TicketGroupContext = React.createContext<TicketGroupContextObj>({
	errMessage: "",
	getTicketGroupList: async () => false,
	getTicketGroup: async () => false,
	createTicketGroup: async () => false,
	updateTicketGroup: async () => false,
	deleteTicketGroup: async () => false,
});

const TicketGroupContextProvider: React.FC<OriginProps> = (props) => {
	const [errMessage, setErrMessage] = React.useState<string | null>(null);
	
	const router = useRouter();
	const http = useContextHttp();

	const getTicketGroupListHandler = async () => {
		const response = await http.get("admin/setting/ticket");

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			return false;
		}

		return content.data;
	};

	const getTicketGroupHandler = async (ticketGroupId: number) => {
		const response = await http.get("admin/setting/ticket/" + ticketGroupId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const createTicketGroupHandler = async (data: TicketGroup) => {
		const response = await http.post("admin/setting/ticket", data);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const updateTicketGroupHandler = async (data: TicketGroup) => {
		const response = await http.put("admin/setting/ticket/" + data.id, data);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const deleteTicketGroupHandler = async (ticketGroupId: number) => {
		const response = await http.delete("admin/setting/ticket/" + ticketGroupId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return true;
	};

	const handleHttpStatus = async (HttpStatus: number) => {
		if (HttpStatus === 200 || HttpStatus === 204) {
			return true;
		}
		if (HttpStatus === 401) {
			router.push("/auth");
			setErrMessage("Unauthenticate");
			return false;
		} else {
			setErrMessage("Something went Wrong");
			return false;
		}
	};

	const contextValue: TicketGroupContextObj = {
		errMessage,
		getTicketGroupList: getTicketGroupListHandler,
		getTicketGroup: getTicketGroupHandler,
		createTicketGroup: createTicketGroupHandler,
		updateTicketGroup: updateTicketGroupHandler,
		deleteTicketGroup: deleteTicketGroupHandler,
	};

	return <TicketGroupContext.Provider value={contextValue}>{props.children}</TicketGroupContext.Provider>;
};

export default TicketGroupContextProvider;

export const useContextTicketGroup = () => {
	return React.useContext(TicketGroupContext);
};
