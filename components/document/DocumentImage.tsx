import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import React from "react";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
	src: StaticImageData;
	alt: string;
	caption?: string|ReactJSXElement;
}

const DocumentImage: React.FC<Props> = (props) => {
	const { src, alt, caption } = props;

	return (
		<Box sx={{ display: "inline-block", mb: 4 }}>
			<Box sx={{ border: "solid 1px white", overflow:"hidden", fontSize:0, mb: 1 }}>
				<Image src={src} alt={alt} />
			</Box>
			{caption && (
				<Typography component="p" variant="caption" sx={{ textAlign: "center", fontStyle: "italic" }}>
					{caption}
				</Typography>
			)}
		</Box>
	);
};

export default DocumentImage;
