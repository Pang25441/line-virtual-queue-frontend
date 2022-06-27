import OriginProps from "../../../models/util/OriginProps";
import { Box, Button, Chip, Typography } from "@mui/material";
import Link from "next/link";
import DocumentContainer from "../DocumentContainer";
import DocumentImage from "../DocumentImage";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import img012Dashboard from "../../../public/user_guide/admin/012-dashboard.png";
import img013ActiveTicketGroup from "../../../public/user_guide/admin/013-active-ticket-group.png";
import img014ActiveConfirm from "../../../public/user_guide/admin/014-active-confirm.png";
import img015TicketGroupReady from "../../../public/user_guide/admin/015-ticket-group-ready.png";
import img016TicketGroupDetail from "../../../public/user_guide/admin/016-ticket-group-detail.png";
import img017WaitingQueue from "../../../public/user_guide/admin/017-waiting-queue.png";
import img018CallingQueue from "../../../public/user_guide/admin/018-calling-queue.png";
import img019FinishNext from "../../../public/user_guide/admin/019-finish-next.png";
import img020Postpone from "../../../public/user_guide/admin/020-postpone.png";

interface Props extends OriginProps {
	id: string;
	title: string;
}

// 040 Ticket Dashboard
const UserGuide04: React.FC<Props> = (props) => {
	const { id, title } = props;

	return (
		<DocumentContainer id={id} title={title}>
			<Typography paragraph>
				{"Goto menu "}
				<Button color="primary" variant="text" href="/admin/ticket-dashboard" target="_blank">
					Ticket Dashboard
				</Button>
			</Typography>
			<DocumentImage src={img012Dashboard} alt="You're ready to go" />

			<DocumentContainer id="041-active-ticket-group" title="4.1 Active Ticket Group" component="h4">
				<Box sx={{ ml: 0 }}>
					<Typography paragraph>Activate ticket group to make it ready to use</Typography>
					<DocumentImage src={img013ActiveTicketGroup} alt="Activate Ticket Group" caption="Activate Ticket Group" />
					<br />
					<DocumentImage src={img014ActiveConfirm} alt="Activate Ticket Group Confirm" caption="Confirm to active" />

					<Typography paragraph>Ticket Group is ready to go</Typography>
					<DocumentImage src={img015TicketGroupReady} alt="Ticket Group is ready" caption="Ticket Group is ready" />

					<Typography paragraph>Click at Group Prefix Label to show ticket group detail</Typography>
					<DocumentImage
						src={img016TicketGroupDetail}
						alt="Ticket Group Detail"
						caption={
							<>
								{"See "}
								<Link href="#060-get-queue-ticket-div" passHref>
									<Typography component="span" variant="caption" sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
										6. Get Queue Ticket
									</Typography>
								</Link>
								{" for using Ticket Group QR Code guide"}
							</>
						}
					/>
				</Box>
			</DocumentContainer>

			<DocumentContainer id="042-calling-queue" title="4.2 Calling Queue" component="h4">
				<Box sx={{ ml: 0 }}>
					<Typography component="div" paragraph>
						{"Click "}
						<Button color="primary" variant="contained" size="small" sx={{ fontWeight: "bold" }}>
							Next Queue
						</Button>
						{" To call next queue if in a list of "}
						<Chip color="warning" label="WAITING" />
						{" ticket"}
					</Typography>
					<DocumentImage src={img017WaitingQueue} alt="Call a queue ticket" caption="Call a queue ticket" />

					<Typography component="div" paragraph>
						<Typography>
							You can <b>Finish</b> queue
						</Typography>
						<Typography>
							<b>Finish and Next queue</b> {"(if there is more waiting queue ticket)"}
						</Typography>
						<Typography>
							Or <b>Postpone</b> queue {"(if want to skip to next ticket)"}
						</Typography>
					</Typography>
					<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
						<Box sx={{ mx: 2 }}>
							<DocumentImage src={img018CallingQueue} alt="Finish or Postpone" />
						</Box>
						<Box sx={{ mx: 2 }}>
							<DocumentImage src={img019FinishNext} alt="Finish and Next Queue" />
						</Box>
					</Box>
				</Box>
			</DocumentContainer>

			<DocumentContainer id="043-re-calling-queue" title="4.3 Re-Calling Queue" component="h4">
				<Typography paragraph>Re-Calling use for Postponed ticket</Typography>
				<Typography component="div" paragraph>
					Go to <Chip color="warning" label="POSTPONE" /> tab
				</Typography>
				<Typography paragraph>
					{"Click "}
					<Button color="secondary" variant="outlined" size="small">
						CALL
					</Button>
					{" to re-calling the ticket"}
					{" and go back to the "}
                    <b>current queue</b>
				</Typography>
				<Typography paragraph>
                    {"Click "}
                    <DeleteForeverRoundedIcon color="error" />
                    {" to reject the ticket"}
                </Typography>
				<DocumentImage src={img020Postpone} alt="Finish and Next Queue" />
			</DocumentContainer>
		</DocumentContainer>
	);
};

export default UserGuide04;
