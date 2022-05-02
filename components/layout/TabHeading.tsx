import React, { Fragment } from "react";

import { OriginProps } from "../../models/util/OriginProps";
import { Divider, Typography } from "@mui/material";

interface Props extends OriginProps {
	heading: string;
}

const TabHeading: React.FC<Props> = (props) => {
	const headingText = props.heading;
	return (
		<Fragment>
			<Typography variant="h4" component="h4" sx={{ my: 0 }}>
				{headingText}
			</Typography>
			<Divider sx={{ my: 3 }}></Divider>
		</Fragment>
	);
};

export default TabHeading;
