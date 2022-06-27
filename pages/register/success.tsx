import { Box, Button, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
import { useContextLang } from "../../contexts/LangContext";
import Footer from "../../components/layout/Footer";

const RegisterSuccessPage: NextPage = () => {
	const lang = useContextLang();
	return (
		<>
		<Container component="main" maxWidth="xs"sx={{ minHeight: "calc(100vh - 120px)" }}>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<CheckCircleIcon color="success" fontSize="large" sx={{ fontSize: "6em" }} />
				<Typography component="h3" variant="h3" color="white" sx={{ textAlign: "center", my: 5 }}>
					{lang.common.register.text.success}
				</Typography>
				<Link href="/auth" passHref>
					<Button color="primary" variant="contained">
						{lang.common.auth.loginBtn}
					</Button>
				</Link>
			</Box>
		</Container>
		<Footer />
		</>
	);
};

export default RegisterSuccessPage;
