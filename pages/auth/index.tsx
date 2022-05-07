import type { NextPage } from "next";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "../../components/ui/Link";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useContextAuth } from "../../contexts/AuthContext";
import { useSnackbar } from "notistack";
import { Alert, CircularProgress } from "@mui/material";
import { useContextLang } from "../../contexts/LangContext";

const LoginPage: NextPage = () => {
	const [loginResult, setLoginResult] = useState<null | boolean>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [tempEmail, setTempEmail] = useState<string | null>("");

	const auth = useContextAuth();
	const lang = useContextLang();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		if (auth.isLogin) {
			setLoginResult(null);
			setIsLoading(false);
		}
	}, [auth.isLogin]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoginResult(null);

		const data = new FormData(event.currentTarget);

		setTempEmail(data.get("email")?.toString() || "");

		if (!data.get("email")?.toString() || !data.get("password")?.toString()) {
			enqueueSnackbar("Please input email and password", { variant: "warning" });
			return;
		}
		// console.log({
		// 	email: data.get("email"),
		// 	password: data.get("password"),
		// });

		setIsLoading(true);

		const snackKey = enqueueSnackbar("Singing in");

		const cred = {
			email: data.get("email")?.toString() || "",
			password: data.get("password")?.toString() || "",
		};

		console.log("Clear password input");
		var pwd = event.currentTarget.elements.namedItem("password") as HTMLInputElement;
		if (pwd) pwd.value = "";

		const result = await auth.onLogin(cred);

		closeSnackbar(snackKey);

		if (result) {
			const profile = await auth.setProfile();
			const name = profile ? profile.name : "";
			enqueueSnackbar("Welcome, " + name, { variant: "success" });
			setLoginResult(true);
		} else {
			enqueueSnackbar("Something went wrong", { variant: "error" });
			setLoginResult(false);
			setIsLoading(false);
		}
	};

	const loadingDialog = (
		<Box component="div" sx={{ mt: 10, display: "flex" }}>
			<CircularProgress color="inherit" />
		</Box>
	);

	// Is already log in
	if (auth.isLogin) {
		return (
			<Box sx={{ marginTop: 15, display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Typography component="h1" variant="h1">
					Welcome
				</Typography>
			</Box>
		);
	}

	// Default jsx
	return (
		<Fragment>
			<Head>
				<title>LVQ - {lang.common.auth.loginTitle || "Log in"}</title>
			</Head>
			<Container component="main" maxWidth="xs">
				<Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{lang.common.auth.loginTitle || "Log in"}
					</Typography>
					{isLoading && loadingDialog}
					{!isLoading && (
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" defaultValue={tempEmail} autoFocus={!tempEmail} />
							<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" autoFocus={!!tempEmail} />
							{/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}

							{loginResult === false && (
								<Alert
									variant="filled"
									severity="error"
									onClose={() => {
										setLoginResult(null);
									}}
								>
									{auth.message}
								</Alert>
							)}

							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								{lang.common.auth.loginTitle || "Log in"}
							</Button>
							<Grid container>
								<Grid item xs>
									{/* <Link href="#" variant="body2">Forgot password?</Link> */}
								</Grid>
								<Grid item>
									<Link href="/auth/register" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					)}
				</Box>
			</Container>
		</Fragment>
	);
};

export default LoginPage;
