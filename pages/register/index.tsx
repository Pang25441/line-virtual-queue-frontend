import { NextPage } from "next";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "../../components/ui/Link";
import { useState } from "react";
import { useContextAuth } from "../../contexts/AuthContext";
import { useContextLang } from "../../contexts/LangContext";
import Register from "../../models/Register";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import LangChanger from "../../components/ui/LangChanger";

const verifiedObj = { error: false, message: "" };
const inputVerifyObj = {
	first_name: { ...verifiedObj },
	last_name: { ...verifiedObj },
	email: { ...verifiedObj },
	password: { ...verifiedObj },
	password_confirmation: { ...verifiedObj },
};

const RegisterPage: NextPage = () => {
	const [inputVerify, setInputVerify] = useState<typeof inputVerifyObj>({ ...inputVerifyObj });
	const [isSubmit, setIsSubmit] = useState(false);

	const auth = useContextAuth();
	const lang = useContextLang();
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	const verifyData = (register: Register) => {
		const verify = { ...inputVerify };
		let valid = true;

		if (register.first_name?.length == 0) {
			verify.first_name.error = true;
			verify.first_name.message = "Required";
			valid = false;
		}
		if (register.last_name?.length == 0) {
			verify.last_name.error = true;
			verify.last_name.message = "Required";
			valid = false;
		}

		if (register.email?.length == 0) {
			verify.email.error = true;
			verify.email.message = "Required";
			valid = false;
		}

		if (register.password?.length == 0) {
			verify.password.error = true;
			verify.password.message = "Required";
			valid = false;
		}

		if (register.password && register.password?.length < 4) {
			verify.password.error = true;
			verify.password.message = "The password must be at least 4 characters.";
			valid = false;
		}

		if (register.password_confirmation && register.password && register.password_confirmation != register.password) {
			verify.password_confirmation.error = true;
			verify.password_confirmation.message = "Password not match";
			valid = false;
		}

		setInputVerify(verify);

		if (valid) {
			console.log("Form Valid");
		} else {
			console.log("Form invalid");
		}

		return valid;
	};

	const resetErrorOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, identifier: keyof typeof inputVerifyObj) => {
		event.preventDefault();

		setInputVerify((prevState) => {
			let newState = { ...prevState };

			newState[identifier].error = false;

			return newState;
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmit(true);
		const data = new FormData(event.currentTarget);
		console.log({
			first_name: data.get("first_name"),
			last_name: data.get("last_name"),
			email: data.get("email"),
			password: data.get("password"),
			password_confirmation: data.get("password_confirmation"),
		});

		const register: Register = {
			first_name: data.get("first_name")?.toString() || "",
			last_name: data.get("last_name")?.toString() || "",
			email: data.get("email")?.toString() || "",
			password: data.get("password")?.toString() || "",
			password_confirmation: data.get("password_confirmation")?.toString() || "",
		};

		const isVerified = verifyData(register);

		if (isVerified) {
			const [result, response] = await auth.onRegister(register);
			if (result === true) {
				router.replace("/register/success");
			} else {
				if (typeof response == "object" && typeof response.errors == "object") {
					let newState = { ...inputVerifyObj };
					for (const [key, value] of Object.entries(response.errors)) {
						if (key in newState) {
							try {
								newState[key as keyof typeof newState].error = true;
								newState[key as keyof typeof newState].message = (value as any[]).join(", ");
							} catch (error) {}
						}
					}
					setInputVerify(newState);

					setIsSubmit(false);
					enqueueSnackbar("Something went wrong", { variant: "error" });
				} else {
					let msg = "Somthing went wrong";
					if (typeof response == "string") {
						msg = response;
					}
					enqueueSnackbar(msg, { variant: "error" });
				}
			}
		} else {
			setIsSubmit(false);
			return;
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<LockOutlinedIcon sx={{ m: 2, fontSize: "3em" }} />
				<Typography component="h1" variant="h5">
					{lang.common.register.registerTitle}
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
							<TextField
								required
								fullWidth
								error={inputVerify.first_name.error}
								helperText={inputVerify.first_name.error && inputVerify.first_name.message}
								id="first_name"
								label={lang.common.register.label.firstName}
								type="text"
								name="first_name"
								autoComplete="given-name"
								autoFocus
								disabled={isSubmit}
								onChange={(e) => resetErrorOnChange(e, "first_name")}
							/>
						</Grid>
						<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
							<TextField
								required
								fullWidth
								error={inputVerify.last_name.error}
								helperText={inputVerify.last_name.error && inputVerify.last_name.message}
								id="last_name"
								label={lang.common.register.label.lastName}
								type="text"
								name="last_name"
								autoComplete="given-name"
								disabled={isSubmit}
								onChange={(e) => resetErrorOnChange(e, "last_name")}
							/>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<TextField
								required
								fullWidth
								error={inputVerify.email.error}
								helperText={inputVerify.email.error && inputVerify.email.message}
								id="email"
								label={lang.common.register.label.email}
								type="email"
								name="email"
								autoComplete="email"
								disabled={isSubmit}
								onChange={(e) => resetErrorOnChange(e, "email")}
							/>
						</Grid>
						<Grid item xs={12} sx={{ mt: 4 }}>
							<TextField
								required
								fullWidth
								error={inputVerify.password.error}
								helperText={inputVerify.password.error && inputVerify.password.message}
								name="password"
								label={lang.common.register.label.password}
								type="password"
								id="password"
								autoComplete="false"
								disabled={isSubmit}
								onChange={(e) => resetErrorOnChange(e, "password")}
							/>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<TextField
								required
								fullWidth
								error={inputVerify.password_confirmation.error}
								helperText={inputVerify.password_confirmation.error && inputVerify.password_confirmation.message}
								name="password_confirmation"
								label={lang.common.register.label.confirmedPassword}
								type="password"
								id="password_confirmation"
								autoComplete="false"
								disabled={isSubmit}
								onChange={(e) => resetErrorOnChange(e, "password_confirmation")}
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
						</Grid> */}
					</Grid>
					<Button disabled={isSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 3 }}>
						{lang.common.register.registerTitle}
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="../auth" variant="body2">
								{lang.common.register.alreadyHasAccount}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Box sx={{ mt: 6, textAlign: "center" }}>
				<LangChanger />
			</Box>
		</Container>
	);
};

export default RegisterPage;
