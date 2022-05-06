import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useContextAuth } from "../../contexts/AuthContext";
import ProgressBackdrop from "../ui/ProgressBackdrop";
import { useRouter } from "next/router";
import ConfirmDialog from "../ui/ConfirmDialog";

const pages = [
	{ label: "Settings", href: "/admin/setting" },
	// { label: "Calendar", href: "/admin/calendar" },
	{ label: "Tickets", href: "/admin/ticket" },
];

const Topbar: React.FC = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [logoutDialog, setLogoutDialog] = React.useState(false);

	const auth = useContextAuth();
	const router = useRouter();

	React.useEffect(() => {
		console.log("Topbar Initial", auth.isInit, auth.isLogin);
	}, []);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
		console.log(anchorElNav);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
		console.log(anchorElNav);
	};

	const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setLogoutDialog(true);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
		console.log(anchorElNav);
	};

	const handleConfirmLogout = async () => {
		setLogoutDialog(false);
		setIsLoading(true);
		const isLogout = await auth.onLogout();
		setIsLoading(false);
		await router.replace("/auth");
	};

	const handleLogoutDialog = () => {
		setLogoutDialog(false);
	};

	if (!auth.isLogin) {
		return null;
	}

	return (
		<AppBar>
			{isLoading && <ProgressBackdrop open={isLoading} />}
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
						LVQ
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
							keepMounted
							transformOrigin={{ vertical: "top", horizontal: "left" }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" } }}
						>
							{pages.map((page) => (
								<Link key={page.label} href={page.href} passHref>
									<MenuItem key={page.label} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page.label}</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						LVQ
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link key={page.label} href={page.href} passHref>
								<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
									{page.label}
								</Button>
							</Link>
						))}
					</Box>
					<Link href={"/auth"} passHref>
						<Button onClick={handleLogout} color="inherit">
							Sign Out
						</Button>
					</Link>
				</Toolbar>
				<ConfirmDialog open={logoutDialog} title="Sign Out" confirmLabel="Sign Out" rejectLabel="Stay On" onConfirm={handleConfirmLogout} onReject={handleLogoutDialog} maxWidth="xs">
					Please confirm to Sign out
				</ConfirmDialog>
			</Container>
		</AppBar>
	);
};

export default Topbar;
