import OriginProps from "../../../models/util/OriginProps";

import { Box, Button, Typography } from "@mui/material";

import DocumentContainer from "../DocumentContainer";
import DocumentImage from "../DocumentImage";
import AddIcon from "@mui/icons-material/Add";

import img004Settings from "../../../public/user_guide/admin/004-settings.png";
import img005LineConfig from "../../../public/user_guide/admin/005-line-config.png";
import img006AccountSetting from "../../../public/user_guide/admin/006-account-setting.png";
import img007TicketGroupSetting from "../../../public/user_guide/admin/007-ticket-group-setting.png";
import img008TicketGroupAdd from "../../../public/user_guide/admin/008-ticket-group-add.png";
import img009TicketGroupAdded from "../../../public/user_guide/admin/009-ticket-group-added.png";

interface Props extends OriginProps {
	id: string;
	title: string;
}

// Set up
const UserGuide02: React.FC<Props> = (props) => {
	const { id, title } = props;

	return (
		<DocumentContainer id={id} title={title}>
			<Typography paragraph>
				{"Goto menu "}
				<Button color="primary" variant="text" href="/admin/setting" target="_blank">
					Settings
				</Button>
			</Typography>
			<DocumentImage src={img004Settings} alt="Setting Menu" />

			<DocumentContainer id="021-line-config" title="2.1 LINE Configuration">
				<Typography paragraph>
					LINE Config not available right now. LINE OA For demo already pre-configured.
				</Typography>
				<Box sx={{ ml: 0 }}>
					{/* <DocumentImage src={img005LineConfig} alt="LINE Config" caption="LINE Config not available in demo" /> */}
				</Box>
				<Typography></Typography>
			</DocumentContainer>

			<DocumentContainer id="022-account-setting" title="2.2 Account Setting">
				<Typography paragraph>
					{"Fill the form and then "}
					<Button color="primary" variant="contained" size="small">
						Save
					</Button>
				</Typography>
				<Box sx={{ ml: 0 }}>
					<DocumentImage src={img006AccountSetting} alt="Account Setting" caption="Setup Account detail" />
				</Box>
			</DocumentContainer>

			<DocumentContainer id="023-ticket-group-setting" title="2.3 Ticket Group Setting">
				<Box sx={{ ml: 0 }}>
					<Typography paragraph>
						{"Click "}
						<Button color="primary" variant="contained" size="small" startIcon={<AddIcon />} sx={{ fontWeight: "bold" }}>
							Add Ticket Group
						</Button>
					</Typography>
					<DocumentImage src={img007TicketGroupSetting} alt="Ticket Group Setting" caption="Ticket Group Setting" />

					<Box sx={{ my: 5 }} />

					<Typography paragraph>
						{"Fill ticket group form then click "}
						<Button color="primary" variant="text" size="medium">
							Save
						</Button>
					</Typography>
					<DocumentImage src={img008TicketGroupAdd} alt="Add Ticket Group" caption="Add Ticket Group" />

					<Box sx={{ my: 5 }} />

					<Typography paragraph>And done</Typography>
					<DocumentImage src={img009TicketGroupAdded} alt="Ticket Group Added" caption="Ticket Group Added" />
				</Box>
			</DocumentContainer>
		</DocumentContainer>
	);
};

export default UserGuide02;
