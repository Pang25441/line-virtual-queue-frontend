import { Box, Divider, Typography } from "@mui/material";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
	id: string;
	title: string;
	component?: any;
}

const DocumentContainer: React.FC<Props> = (props) => {
	const id = props.id || "";
	const title = props.title || "001";
	const component = props.component || "h3"

	return (
		<>
			<div id={id+"-div"} style={{ paddingTop: "80px" }}>
				<Typography component={component} variant={component}>
					{title}
				</Typography>
				<Box sx={{ p: 4, height: "auto" }}>{props.children}</Box>
			</div>
			{!props.component && <Divider />}
		</>
	);
};

export default DocumentContainer;
