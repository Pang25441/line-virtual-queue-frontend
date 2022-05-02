export default interface TicketGroup {
  id?: number | null | undefined;
  queue_setting_id?: number | null | undefined;
  ticket_group_code?: string | null | undefined;
  active: number | null | undefined;
  active_count?: number | null | undefined;
  ticket_group_prefix?: string | null | undefined;
  description: string | null | undefined;
  updated_at?: string | null | undefined;
}
