import React, { Fragment } from "react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { OriginProps } from "next/document";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

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
