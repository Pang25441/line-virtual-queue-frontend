import { formLabelClasses } from "@mui/material";
import React from "react";
import TicketGroup from "../models/TicketGroup";
import OriginProps from "../models/util/OriginProps";

const TICKET_GROUP_DUMMY: TicketGroup[] = [
	{ id: 1, queue_setting_id: 1, ticket_group_code: "hsmdtgras", ticket_group_prefix: "A", active_count: 11, active: 0, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
	{ id: 2, queue_setting_id: 1, ticket_group_code: "5h6wbtby3", ticket_group_prefix: "B", active_count: 35, active: 0, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
	{ id: 3, queue_setting_id: 1, ticket_group_code: "gfhjlhsdc", ticket_group_prefix: "C", active_count: 12, active: 1, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
	{ id: 4, queue_setting_id: 1, ticket_group_code: "xmys54esr", ticket_group_prefix: "D", active_count: 90, active: 0, description: "qoemsdif nvioue bnrnwn dsfa,s", updated_at: "" },
];

type TicketGroupContextObj = {
	isInitial: boolean;
    ticketGroupList: TicketGroup[];
	getTicketGroupList: () => Promise<TicketGroup[] | false> | false;
	getTicketGroup: (ticketGroupId: number) => TicketGroup | false;
	createTicketGroup: (data: TicketGroup) => TicketGroup| false;
	updateTicketGroup: (data: TicketGroup) => TicketGroup | false;
	deleteTicketGroup: (ticketGroupId: number) => boolean;
};

export const TicketGroupContext = React.createContext<TicketGroupContextObj>({
	isInitial: false,
    ticketGroupList: [],
	getTicketGroupList: () => false,
	getTicketGroup: () => false,
	createTicketGroup: () => false,
	updateTicketGroup: () => false,
	deleteTicketGroup: () => false,
});

const TicketGroupContextProvider: React.FC<OriginProps> = (props) => {
	const [initialized, setInitialized] = React.useState(false);
	const [ticketGroupList, setTicketGroupList] = React.useState<TicketGroup[]>([]);

	React.useEffect(() => {
		console.log("TicketGroupContextProvider", "useEffect");
        const list = getTicketGroupListHandler()
        list.then((data)=>{
            setTicketGroupList(data);
            setInitialized(true);
        })
	}, []);

	const getTicketGroupListHandler = async () => {
        if(!initialized) return TICKET_GROUP_DUMMY
		return ticketGroupList;
	};

	const getTicketGroupHandler = (ticketGroupId: number) => {
		return ticketGroupList.find((value) => value.id === ticketGroupId) || false;
	};

	const createTicketGroupHandler = (data: TicketGroup) => {
		setTicketGroupList((prevState) => {
			console.log("setTicketGroupList");
			let lastItem = [...prevState].pop();
			let newId = lastItem && lastItem.id ? lastItem.id + 1 : 1;
			data.id = newId;
			const newState = [...prevState].concat(data);
			return newState;
		});

		return data;
	};

	const updateTicketGroupHandler = (data: TicketGroup) => {
		setTicketGroupList((prevState) => {
			let newState = [...prevState];
			var index = newState.findIndex((value) => value.id === data.id);
			newState[index] = data;
			return newState;
		});

		return data;
	};

	const deleteTicketGroupHandler = (ticketGroupId: number) => {
		setTicketGroupList((prevState) => {
			const newState = prevState.filter((value) => value.id !== ticketGroupId);
			return newState;
		});
		return true;
	};

	const contextValue: TicketGroupContextObj = {
		isInitial: initialized,
        ticketGroupList: ticketGroupList,
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
