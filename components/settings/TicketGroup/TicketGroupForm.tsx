import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import { OriginProps } from "../../../models/util/OriginProps";

interface Props extends OriginProps {}

export const TicketGroupForm: React.FC = (props) => {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText>
				<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClose}>Subscribe</Button>
			</DialogActions>
		</Dialog>
	);
};
