import TicketGroup from "./TicketGroup";

export default interface QueueSetting {
	id: number | null | undefined;
	line_config_id?: number | null | undefined;
	user_id?: number | null | undefined;
	display_name: string | null | undefined;
	detail: string | null | undefined;

	ticket_groups: TicketGroup[] | null | undefined;
}
