import React from "react";
import LangEn from "../lang/en/LangEn";
import LangTh from "../lang/th/LangTh";
import OriginProps from "../models/util/OriginProps";

type LangType = "en" | "th" | "EN" | "TH";

// type LangContextObject = {
// 	common: any;
// 	admin: any;
// 	ticket: any;
// 	liff: any;
// 	setLang: (lang: LangType) => void;
// };
const LangContextObjectInitial = {
	currentLanguage: 'en',
	common: LangEn.LangCommon,
	admin: LangEn.LangAdmin,
	ticket: {},
	liff: {},
	setLang: (lang: LangType) => {},
};

export const LangContext = React.createContext(LangContextObjectInitial);

const LangContextProvider: React.FC<OriginProps> = (props) => {
	const [currentLanguage, setCurrentLanguage] = React.useState<string>("");
	const [adminLang, setAdminLang] = React.useState(LangEn.LangAdmin);
	const [commonLang, setCommonLang] = React.useState(LangEn.LangCommon);
	const [ticketLang, setTicketLang] = React.useState({});
	const [liffLang, setLiffLang] = React.useState({});

	const setLang = (lang: LangType) => {
		const label: string = lang.toString().toLocaleLowerCase();

		let language: any;
		switch (label) {
			case "th":
				language = LangTh;
				break;

			case "en":
				language = LangEn;
				break;

			default:
				break;
		}

		if (language) {
			if (currentLanguage != label) {
				localStorage.setItem("language", label);
			}
			setCurrentLanguage(label);
			setCommonLang(language?.LangCommon);
			setAdminLang(language?.LangAdmin);
			setTicketLang(language?.LangTicket);
			setLiffLang(language?.LangLiff);
		}
	};

	React.useEffect(() => {
		const getSetting = async () => {
			const savedLanguage: any = await localStorage.getItem("language");
			if (!savedLanguage) {
				localStorage.setItem("language", "en");
			}
			const lang = savedLanguage || "en";
			setCurrentLanguage(lang);
			return lang;
		};

		getSetting().then((lang: any) => {
			try {
				setLang(lang);
			} catch (error) {
				setLang("en");
			}
		});
	}, []);

	const contextValue = {
		currentLanguage,
		common: commonLang,
		admin: adminLang,
		ticket: ticketLang,
		liff: liffLang,
		setLang,
	};
	return <LangContext.Provider value={contextValue}>{props.children}</LangContext.Provider>;
};

export default LangContextProvider;

export const useContextLang = () => {
	return React.useContext(LangContext);
};
