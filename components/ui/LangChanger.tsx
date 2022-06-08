import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useContextLang } from "../../contexts/LangContext";

const LangChanger: React.FC = () => {
	const lang = useContextLang();

	const handleLangChange = (_lang: any) => {
        if(_lang == lang.currentLanguage) return;
		lang.setLang(_lang);
	};

	return (
		<ButtonGroup variant="text" aria-label="text button group">
			<Button disabled={lang.currentLanguage === "en"&&false} variant={lang.currentLanguage == "en" ? "contained" : undefined} onClick={handleLangChange.bind(null, "en")}>
				EN
			</Button>
			<Button disabled={lang.currentLanguage === "th"&&false} variant={lang.currentLanguage == "th" ? "contained" : undefined} onClick={handleLangChange.bind(null, "th")}>
				TH
			</Button>
		</ButtonGroup>
	);
};
export default LangChanger;
