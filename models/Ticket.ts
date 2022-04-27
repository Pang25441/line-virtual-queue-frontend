export default interface Ticket {
  id: number | null | undefined;
  ticket_group_id: number | null | undefined;
  line_member_id: number | null | undefined;
  status: number | null | undefined;
  ticket_group_active_count: number | null | undefined;
  count: number | null | undefined;
  ticket_number: string | null | undefined;
  pending_time: string | null | undefined;
  calling_time: string | null | undefined;
  executed_time: string | null | undefined;
  postpone_time: string | null | undefined;
  reject_time: string | null | undefined;
  lost_time: string | null | undefined;
  is_postpone: number | null | undefined;
}
