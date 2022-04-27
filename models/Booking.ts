export default interface Booking {
  id: number | null | undefined;
  calendar_setting_id: number | null | undefined;
  line_member_id: number | null | undefined;
  status: number | null | undefined;
  booking_code: string | null | undefined;
  customer_name: string | null | undefined;
  customer_contact: string | null | undefined;
  booking_date: string | null | undefined;
  confirm_date: string | null | undefined;
  confirm_by: number | null | undefined;
  reject_date: string | null | undefined;
  reject_by: number | null | undefined;
  revise_date: string | null | undefined;
  revise_by: number | null | undefined;
  complete_date: string | null | undefined;
  complete_by: number | null | undefined;
  cancel_date: string | null | undefined;
  lost_date: string | null | undefined;
  created_at: string | null | undefined;
  updated_at: string | null | undefined;
}
