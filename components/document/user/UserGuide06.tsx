import OriginProps from "../../../models/util/OriginProps";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

import DocumentContainer from "../DocumentContainer";
import DocumentImage from "../DocumentImage";

import img000LvqLine from "../../../public/user_guide/user/000-lvq-line-account.png";
import img001LvqLine from "../../../public/user_guide/user/001-lvq-line-oa.png";
import img002GetTicket from "../../../public/user_guide/user/002-get-ticket.png";
import img003AllowCam from "../../../public/user_guide/user/003-allow-cam.png";
import img004ScanCode from "../../../public/user_guide/user/004-scan-code.png";
import img005GetTicket from "../../../public/user_guide/user/005-get-ticket.png";
import img006TicketReceive from "../../../public/user_guide/user/006-ticket-received.png";
import img007TicketOnChat from "../../../public/user_guide/user/007-ticket-on-chat.png";
import img008Calling from "../../../public/user_guide/user/008-calling.png";
import img009ReCalling from "../../../public/user_guide/user/009-re-calling.png";

interface Props extends OriginProps {
	id: string;
	title: string;
}

const UserGuide06: React.FC<Props> = (props) => {
	const { id, title } = props;

	return (
		<DocumentContainer id={id} title={title}>
			<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, flexWrap: "wrap" }}>
				<Box sx={{ mx: 1 }}>
					<Typography paragraph>1. Go to LVQ Line Official Account</Typography>
					<DocumentImage src={img000LvqLine} alt="Get ticket On the menu" caption="Add line Official Account" />
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>
						2. Go to the chat then click menu <b>{' "Get Ticket" '}</b>
					</Typography>
					<DocumentImage src={img001LvqLine} alt="Get ticket Menu" caption="Click Get Ticket to open ticket App" />
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>
						3. Click <b>Scan Code</b> Button
					</Typography>
					<DocumentImage src={img002GetTicket} alt="Get Ticket Page" caption="Click Scan Code to open camera" />
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>4. Allow Camera to scan QR Code</Typography>
					<DocumentImage src={img003AllowCam} alt="QR Code Reader" caption="Allow camera access" />
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>5. Scan Ticket Group QR Code</Typography>
					<DocumentImage
						src={img004ScanCode}
						alt="Scan QR Code"
						caption={
							<>
								{"Scan QR Code from "}
								<Link href="#041-active-ticket-group-div" passHref>
									<Typography component="span" variant="caption" sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
										4.1 Active Ticket Group
									</Typography>
								</Link>
							</>
						}
					/>
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>
						6. Click{" "}
						<Button color="primary" variant="contained" sx={{}}>
							Get Queue Ticket
						</Button>
						{" to get Ticket"}
					</Typography>
					<DocumentImage src={img005GetTicket} alt="Confirm Get Ticket" caption="Confirm to get ticket" />
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>
						7. Ticket Received then click <b>Close</b>
					</Typography>
					<DocumentImage src={img006TicketReceive} alt="Ticket Received" caption="Ticket Received" />
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>8. Ticket already sent to chat</Typography>
					<DocumentImage
						src={img007TicketOnChat}
						alt="Ticket In Chat"
						caption={
							<>
								{"Ticket will display at "}
								<Link href="#042-calling-queue-div" passHref>
									<Typography component="span" variant="caption" sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
										4.2 Calling Queue
									</Typography>
								</Link>
							</>
						}
					/>
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>9. Notify when queue is calling</Typography>
					<DocumentImage
						src={img008Calling}
						alt="Queue Ticket Call"
						caption={
							<>
								{"Queue Ticket Called "}
								<Link href="#042-calling-queue-div" passHref>
									<Typography component="span" variant="caption" sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
										4.2 Calling Queue
									</Typography>
								</Link>
							</>
						}
					/>
					<Box sx={{ my: 5 }} />
				</Box>

				<Box sx={{ mx: 2 }}>
					<Typography paragraph>10. Notify when queue is re-calling after postpone</Typography>
					<DocumentImage
						src={img009ReCalling}
						alt="Queue Ticket Re Call"
						caption={
							<>
								{"Queue Ticket Re-Called "}
								<Link href="#043-re-calling-queue-div" passHref>
									<Typography component="span" variant="caption" sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
										4.3 Re-Calling Queue
									</Typography>
								</Link>
							</>
						}
					/>
					<Box sx={{ my: 5 }} />
				</Box>
			</Box>
		</DocumentContainer>
	);
};

export default UserGuide06;
