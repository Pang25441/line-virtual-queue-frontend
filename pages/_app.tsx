import "../styles/globals.css";
import type { AppProps } from "next/app";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Topbar from "../components/layout/Topbar";
import AuthContextProvider from "../contexts/AuthContext";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import HttpContextProvider from "../contexts/HttpContext";
import LangContextProvider from "../contexts/LangContext";

const theme = createTheme({ palette: { mode: "dark" } });

function MyApp({ Component, pageProps }: AppProps) {
	const nofollow = process.env.NEXT_PUBLIC_NO_FOLLOW;
	return (
		<>
			<Head>
				<title>LVQ - LINE Virtual Queue</title>
				<meta name="description" content="Manage Queue Ticket with Web Console and notify to your customer via LINE Official Account" />
				{nofollow == "yes" && (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>
			<LangContextProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000}>
						<HttpContextProvider>
							<AuthContextProvider>
								<Component {...pageProps} />
							</AuthContextProvider>
						</HttpContextProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</LangContextProvider>
		</>
	);
}

export default MyApp;
