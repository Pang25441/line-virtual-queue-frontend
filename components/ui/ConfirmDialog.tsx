import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
	open: boolean;
	onConfirm: () => void;
	onReject: () => void;
	title?: string;
	confirmLabel?: string;
	rejectLabel?: string;
}

const ConfirmDialog: React.FC<Props> = (props) => {
	const { open, rejectLabel, confirmLabel, title, children, onConfirm, onReject } = props;

	return (
		<Dialog open={open} onClose={onReject} fullWidth={true} maxWidth="sm" aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{title ? title : "Confirm?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{children ? children : "Confirm?"}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onReject} autoFocus>
					{rejectLabel ? rejectLabel : "Cancel"}
				</Button>
				<Button onClick={onConfirm}>{confirmLabel ? confirmLabel : "Confirm"}</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
