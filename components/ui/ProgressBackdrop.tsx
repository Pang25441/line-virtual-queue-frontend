import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
    open?: boolean
}

const ProgressBackdrop:React.FC<Props> = (props) => {
    const open = props?.open ? props.open : true;

	return (
		<Backdrop sx={{ color: "#FFF", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default ProgressBackdrop;
