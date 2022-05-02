import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {}

export const EmptyBox: React.FC<Props> = (props) => {
	return (
		<Box component="div" sx={{ mt: 1 }}>
			<Typography variant="h5" component="p" sx={{ my: 3, alignContent: "center" }}>
				{props.children}
			</Typography>
		</Box>
	);
};
