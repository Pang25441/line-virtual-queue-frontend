import "../styles/globals.css";
import type { AppProps } from "next/app";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Topbar from "../components/layout/Topbar";
import AuthContextProvider from "../contexts/AuthContext";
import Head from "next/head";
import { SnackbarProvider } from "notistack";

const theme = createTheme({ palette: { mode: "dark" } });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={5000}>
				<AuthContextProvider>
					<Topbar></Topbar>
					<Head>
						<title>LVQ</title>
					</Head>
					<Component {...pageProps} />
				</AuthContextProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default MyApp;
