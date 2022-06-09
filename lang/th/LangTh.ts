import LangEn from "../en/LangEn";
import { LangAdmin } from "./LangAdmin";
import { LangCommon } from "./LangCommon";
import { LangCommon as LangCommonDefault } from "../en/LangCommon";
import { LangLiff } from "./LangLiff";
import { LangTicket } from "./LangTicket";

const LangTh = {
	...LangEn,
    LangAdmin : LangAdmin,
	LangTicket : LangTicket,
	LangLiff : LangLiff,
	LangCommon : {...LangCommonDefault, ...LangCommon},
};

export default LangTh;
