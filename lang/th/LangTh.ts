import LangEn from "../en/LangEn";
import { LangAdmin } from "./LangAdmin";
import { LangCommon } from "./LangCommon";
import { LangLiff } from "./LangLiff";
import { LangTicket } from "./LangTicket";

const LangTh = {
	...LangEn,
    LangAdmin : LangAdmin,
	LangTicket : LangTicket,
	LangLiff : LangLiff,
	LangCommon : LangCommon,
};

export default LangTh;
