import React, { useEffect } from "react";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
	ticketGroupIds: number[];
	onFilterChange: (filteredTicketGroupId: number[]) => void;
}

const TicketGroupDisplayFilter: React.FC<Props> = (props) => {
	const [isInit, setIsInit] = React.useState(false);
	const [filteredTicketGroupId, setFilteredTicketGroupId] = React.useState([]);
	const { ticketGroupIds } = props;

	useEffect(() => {}, []);

	return <></>;
};

export default TicketGroupDisplayFilter;
