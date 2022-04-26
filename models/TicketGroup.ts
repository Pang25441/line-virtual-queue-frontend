export default interface TicketGroup {
  id: number;
  queue_setting_id: number;
  ticket_group_code: string;
  active: number;
  active_count: number;
  ticket_group_prefix: string;
  description: string;
  updated_at: string;
}
