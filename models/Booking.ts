export default interface Booking {
  id: number;
  calendar_setting_id: number;
  line_member_id: number;
  status: number;
  booking_code: string;
  customer_name: string;
  customer_contact: string;
  booking_date: string;
  confirm_date: string;
  confirm_by: number;
  reject_date: string;
  reject_by: number;
  revise_date: string;
  revise_by: number;
  complete_date: string;
  complete_by: number;
  cancel_date: string;
  lost_date: string;
  created_at: string;
  updated_at: string;
}
