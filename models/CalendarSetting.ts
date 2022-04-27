export default interface CalendarSetting {
  id: number | null | undefined;
  queue_setting_id: number | null | undefined;
  calendar_date: string | null | undefined;
  business_time_open: string | null | undefined;
  business_time_close: string | null | undefined;
  day_off: string[] | number[] | null | undefined;
  allocate_time: string | null | undefined;
  booking_limit: number | null | undefined;
  active: number | null | undefined;
  updated_at: string | null | undefined;
}
