import QueueSetting from "./QueueSetting";

export default interface LineConfig {
	id: number | null | undefined;
	line_id: string | null | undefined;
	channel_id: string | null | undefined;
	channel_access_token: string | null | undefined;
	login_channel_id: string | null | undefined;

	queue_setting: QueueSetting | null | undefined;
}
