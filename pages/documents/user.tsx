import React, { MouseEventHandler, useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, SxProps, Tab, Tabs, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import UserGuide01 from "../../components/document/user/UserGuide01";
import UserGuide02 from "../../components/document/user/UserGuide02";
import UserGuide03 from "../../components/document/user/UserGuide03";
import UserGuide04 from "../../components/document/user/UserGuide04";
import UserGuide05 from "../../components/document/user/UserGuide05";
import UserGuide06 from "../../components/document/user/UserGuide06";
import Footer from "../../components/layout/Footer";

const drawerWidth = 240;

type Menu = {
	label: string;
	id: string;
	pos?: number;
	child?: Menu[];
};

const menus: Menu[] = [
	{ label: "1. Get Start", id: "010-start" },
	{
		label: "2. Setup",
		id: "020-setup",
		child: [
			{ label: "2.1 LINE Configuration", id: "021-line-config" },
			{ label: "2.2 Account Setting", id: "022-account-setting" },
			{ label: "2.3 Ticket Group Setting", id: "023-ticket-group-setting" },
		],
	},
	{ label: "3. Ready to go", id: "030-ready-to-go" },
	{
		label: "4. Ticket Dashboard",
		id: "040-ticket-dashboard",
		child: [
			{ label: "4.1 Active Ticket Group", id: "041-active-ticket-group" },
			{ label: "4.2 Calling Queue", id: "042-calling-queue" },
			{ label: "4.3 Re-Calling Queue", id: "043-re-calling-queue" },
		],
	},
	{ label: "5. Add LINE Official Account", id: "050-add-line-oa" },
	{ label: "6. Get Queue Ticket", id: "060-get-queue-ticket" },
];

var loadedGuideObject: Menu[] = [];
menus.map((menu) => {
	loadedGuideObject.push({ id: menu.id, label: menu.label, pos: 0 });
	if (menu.child) {
		menu.child.map((child) => {
			loadedGuideObject.push({ id: child.id, label: child.label, pos: 0 });
		});
	}
});

const UserDocumentPage: NextPage = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [loadedGuide, setLoadedGuide] = React.useState<any[]>(loadedGuideObject);
	const [activeId, setActiveId] = React.useState<string>("");
	const [targetId, setTargetId] = React.useState<string>("");

	const router = useRouter();

	const h = window.innerHeight;

	React.useEffect(() => {
		if (activeId.length == 0) {
			const hash = router.asPath.split("#")[1];
			const _activeId = hash || menus[0].id;
			// setActiveId(_activeId);
			muClickHandler(_activeId);
		}
	}, [activeId, router.asPath]);

	React.useEffect(() => {
		const offset = window.scrollY;
		loadedGuideObject.map((menu) => {
			const element = document.getElementById(menu.id + "-div");
			if (element) {
				const y = element.getBoundingClientRect().y;
				if (y) menu.pos = y + offset;
			} else {
				menu.pos = -1;
			}
		});

		// console.log(loadedGuideObject);
		setLoadedGuide(loadedGuideObject);
	}, [h]);

	const onScroll = React.useCallback(
		(event: Event) => {
			let _activeId = "";
			const y = window.scrollY;
			loadedGuide.map((menu) => {
				// console.log(menu.id,menu.pos,y)
				if (menu.pos >= 0 && menu.pos <= y + 30) {
					_activeId = menu.id;
				}
			});
			// console.log(activeId, _activeId)
			if (activeId != _activeId && (targetId.length == 0 || _activeId == targetId)) {
				// console.log(_activeId)
				if (router.asPath.split("#")[1] != _activeId) {
					history.pushState(null, "", "#" + _activeId);
				}
				setActiveId(_activeId);
				setTargetId("");
			}
		},
		[activeId, loadedGuide, router.asPath, targetId]
	);

	React.useEffect(() => {
		window.addEventListener("scroll", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, [onScroll]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const isActiveMenu = useCallback(
		(menuId: string): SxProps => {
			if (activeId == menuId) {
				// console.log(menuId,'Active')
				return { borderLeft: "3px solid white" };
			} else {
				// console.log(menuId,'Normal')
				return { borderLeft: "none" };
			}
		},
		[activeId]
	);

	const muClickHandler = (hash: string) => {
		setTargetId(hash);
		const rect = document.getElementById(hash + "-div")?.getBoundingClientRect();
		// console.log(rect);
		const y = rect?.y;
		const behavior = "smooth";
		if (y !== undefined) {
			const left = 0;
			const top = window.scrollY + y;
			// console.log(top);

			window.scrollTo({ left, top, behavior });
		}
	};

	const drawerContent = (
		<>
			<Toolbar sx={{ textAlign: "center" }}>
				<Link href={"/"} passHref>
					<Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex", cursor: "pointer" } }}>
						LVQ
					</Typography>
				</Link>
			</Toolbar>
			<Divider />
			<List>
				{menus.map((menu) => (
					<React.Fragment key={menu.id}>
						<ListItem disablePadding sx={isActiveMenu(menu.id)}>
							<Link href={"#" + menu.id} passHref>
								<ListItemButton onClick={muClickHandler.bind(null, menu.id)}>
									<ListItemText primary={menu.label} />
								</ListItemButton>
							</Link>
						</ListItem>
						{menu.child && (
							<List>
								{menu.child.map((child) => (
									<ListItem key={child.id} sx={{ ...isActiveMenu(child.id), pl: 4 }} disablePadding>
										<Link href={"#" + child.id} passHref>
											<ListItemButton onClick={muClickHandler.bind(null, child.id)}>
												<ListItemText primary={child.label} />
											</ListItemButton>
										</Link>
									</ListItem>
								))}
							</List>
						)}
					</React.Fragment>
				))}
			</List>
		</>
	);

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}
				>
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							User Guide (Demo Version)
						</Typography>
					</Toolbar>
				</AppBar>
				<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="Document Context">
					<Drawer
						container={undefined}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
						}}
					>
						{drawerContent}
					</Drawer>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: "none", sm: "block" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
						}}
						open
					>
						{drawerContent}
					</Drawer>
				</Box>
				<Box component="main" sx={{ flexGrow: 1, p: 3,pb:0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
					<UserGuide01 id={menus[0].id} title={menus[0].label} />
					<UserGuide02 id={menus[1].id} title={menus[1].label} />
					<UserGuide03 id={menus[2].id} title={menus[2].label} />
					<UserGuide04 id={menus[3].id} title={menus[3].label} />
					<UserGuide05 id={menus[4].id} title={menus[4].label} />
					<UserGuide06 id={menus[5].id} title={menus[5].label} />
					<Footer />
				</Box>
			</Box>
		</>
	);
};

export default UserDocumentPage;
