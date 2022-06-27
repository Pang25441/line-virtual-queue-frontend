import OriginProps from "../../../models/util/OriginProps";
import { Button, Typography } from "@mui/material";

import DocumentContainer from "../DocumentContainer";
import DocumentImage from "../DocumentImage";

import img011AddLine from "../../../public/user_guide/admin/011-line-oa-preview.png";

interface Props extends OriginProps {
	id: string;
	title: string;
}

// 050 Add LINE
const UserGuide05: React.FC<Props> = (props) => {
	const { id, title } = props;

	return <DocumentContainer id={id} title={title}>
        <Typography component="div" paragraph>
            {"At "}
            <Button color="primary" variant="text" href="/auth" target="_blank">landing page</Button>
            {" after signed in"}
            <Typography>Use QR Code below to add LINE Official Account</Typography>
        </Typography>
        <DocumentImage src={img011AddLine} alt="Add line Official Account"  caption="Add line Official Account" />
    </DocumentContainer>;
};

export default UserGuide05;
