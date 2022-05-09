import Ticket from "./Ticket";

export default interface TicketGroup {
  id?: number | null;
  queue_setting_id?: number | null;
  ticket_group_code?: string | null;
  active: number | null;
  active_count?: number | null;
  ticket_group_prefix?: string | null;
  description: string | null;
  updated_at?: string | null;

  tickets?: Ticket[];
  current_tickets?: Ticket[];
}
