import Link from "next/link";
import { Typography } from "@mui/material";

import OriginProps from "../../../models/util/OriginProps";
import DocumentContainer from "../DocumentContainer";
import DocumentImage from "../DocumentImage";

import img010ReadyToGo from "../../../public/user_guide/admin/010-add-line.png";
import img011AddLine from "../../../public/user_guide/admin/011-line-oa-preview.png";

interface Props extends OriginProps {
	id: string;
	title: string;
}

// Ready to go
const UserGuide03: React.FC<Props> = (props) => {
	const { id, title } = props;

	return (
		<DocumentContainer id={id} title={title}>
			<Typography paragraph>{"You're Ready to go"}</Typography>
			<DocumentImage src={img010ReadyToGo} alt="You're ready to go" caption="You're ready to go" />

			<Typography paragraph>Use QR Code to add LINE official account</Typography>
			<DocumentImage
				src={img011AddLine}
				alt="Add LINE OA"
				caption={
					<>
						{"See "}
						<Link href="#050-add-line-oa" passHref>
							<Typography component="span" variant="caption" sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
								5. Add LINE Official Account
							</Typography>
						</Link>
						{" for LINE OA guide"}
					</>
				}
			/>
		</DocumentContainer>
	);
};

export default UserGuide03;
