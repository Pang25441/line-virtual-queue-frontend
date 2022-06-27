import OriginProps from "../../../models/util/OriginProps";

import { Box, Button, Typography } from "@mui/material";

import DocumentContainer from "../DocumentContainer";
import DocumentImage from "../DocumentImage";

import img001Start from "../../../public/user_guide/admin/001-start.png";
import img002Signin from "../../../public/user_guide/admin/002-signin.png";
import img003Landing from "../../../public/user_guide/admin/003-landing.png";
import ScienceIcon from "@mui/icons-material/Science";

interface Props extends OriginProps {
	id: string;
	title: string;
}

// Get Start
const UserGuide01: React.FC<Props> = (props) => {
	const { id, title } = props;

	return (
		<DocumentContainer id={id} title={title}>
			<Typography paragraph>
				{"Goto "}
				<Button color="inherit" variant="text" href="/" target="_blank">
					Home Page
				</Button>
				{" then click "}
				<Button color="success" variant="contained" href="/auth" target="_blank" size="small">
					<ScienceIcon />
					Start Demo
				</Button>
			</Typography>
			<DocumentImage src={img001Start} alt="Home Page" caption="Home Page" />

			<Box sx={{my:5}} />

			<Typography paragraph>
				Sign In
			</Typography>
			<DocumentImage src={img002Signin} alt="Sign In" caption="Sign In" />
			<DocumentImage src={img003Landing} alt="Landing Page" caption="Landing Page" />
		</DocumentContainer>
	);
};

export default UserGuide01;
