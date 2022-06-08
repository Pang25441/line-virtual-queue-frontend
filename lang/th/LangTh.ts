import { LangAdmin } from "../en/LangAdmin";
import LangEn from "../en/LangEn";
import { LangLiff } from "../en/LangLiff";
import { LangTicket } from "../en/LangTicket";
import { LangCommon } from "./LangCommon";
import { LangCommon as LangCommonDefault } from "../en/LangCommon";

const LangTh = {
	...LangEn,
    LangAdmin : LangAdmin,
	LangTicket : LangTicket,
	LangLiff : LangLiff,
	LangCommon : {...LangCommonDefault, ...LangCommon},
};

export default LangTh;
