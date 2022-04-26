export default interface CalendarSetting {
  id: number;
  queue_setting_id: number;
  calendar_date: string;
  business_time_open: string;
  business_time_close: string;
  day_off: string[] | number[];
  allocate_time: string;
  booking_limit: number;
  active: number;
  updated_at: string;
}
