import LineMember from "./LineMember";
import TicketStatus from "./TicketStatus";

export default interface Ticket {
	id: number | null;
	ticket_group_id: number | null;
	line_member_id: number | null;
	status: number | null;
	ticket_group_active_count: number | null;
	count: number | null;
	ticket_number: string | null;
	pending_time: string | null;
	calling_time: string | null;
	executed_time: string | null;
	postpone_time: string | null;
	reject_time: string | null;
	lost_time: string | null;
	is_postpone: number | null;

	ticket_status: TicketStatus;
  line_member: LineMember;
}
