import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useContextLang } from "../../contexts/LangContext";
import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps {
	open: boolean;
	onConfirm: () => void;
	onReject: () => void;
	title?: string;
	confirmLabel?: string;
	rejectLabel?: string;
	maxWidth?: string;
}

const ConfirmDialog: React.FC<Props> = (props) => {
	const { open, rejectLabel, confirmLabel, title, children, onConfirm, onReject, maxWidth } = props;

	const maxWidthParam:any = maxWidth ? maxWidth : "sm";

	const lang = useContextLang();

	return (
		<Dialog open={open} onClose={onReject} fullWidth={true} maxWidth={maxWidthParam} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{title ? title : lang.common.dialog.confirm.title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{children ? children : lang.common.dialog.confirm.message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onReject} autoFocus>
					{rejectLabel ? rejectLabel : lang.common.dialog.confirm.cancelBtn}
				</Button>
				<Button onClick={onConfirm}>{confirmLabel ? confirmLabel : lang.common.dialog.confirm.confirmBtn}</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
