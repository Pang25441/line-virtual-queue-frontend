export default interface Ticket {
  id: number;
  ticket_group_id: number;
  line_member_id: number;
  status: number;
  ticket_group_active_count: number;
  count: number;
  ticket_number: string;
  pending_time: string;
  calling_time: string;
  executed_time: string;
  postpone_time: string;
  reject_time: string;
  lost_time: string;
  is_postpone: number;
}
