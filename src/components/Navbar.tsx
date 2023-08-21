import { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import TvIcon from "@mui/icons-material/Tv";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { AppColors } from "../theme";
import { StylesObject } from "../types/utility";

const DRAWER_WIDTH = 240;

const styles: StylesObject = {
  navbar: {
    backgroundColor: AppColors.blue,
    width: { xs: "100%", sm: `calc(100% - ${DRAWER_WIDTH}px)` },
    ml: { xs: 0, sm: `${DRAWER_WIDTH}px` },
  },
  navbarContentContainer: {
    display: { xs: "flex", sm: "none" },
    backgroundColor: AppColors.blue,
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: 25,
    whiteSpace: "nowrap",
    borderRadius: 0,
    backgroundColor: AppColors.blue,
    pt: { xs: 8, sm: 2 },
    pl: 2,
  },
  openIcon: {
    mr: 2,
    display: { sm: "none" },
    color: "white",
  },
  closeIcon: {
    display: { xs: "block", sm: "none" },
    color: "white",
    position: "absolute",
    top: 0,
    ml: 2,
    mt: 2,
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    px: 2,
    backgroundColor: AppColors.blue,
    height: "100%",
  },
  sectionHeader: {
    fontSize: 20,
    opacity: 0.4,
    color: "white",
  },
  divider: {
    my: 2,
  },
  navLinks: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  desktopNavLink: {
    fontSize: 20,
    color: "white",
    width: "100%",
  },
  mobileDrawer: {
    display: { xs: "block", sm: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: DRAWER_WIDTH,
    },
  },
  desktopDrawer: {
    display: { xs: "none", sm: "block" },
    width: DRAWER_WIDTH,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: DRAWER_WIDTH,
      boxSizing: "border-box",
    },
  },
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseNavMenu = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    isMobile && setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <ArrowBackIos onClick={handleDrawerToggle} sx={styles.closeIcon} />
      <Typography component={Link} to="/" sx={styles.logo}>
        Movie App
      </Typography>
      <Box sx={styles.listWrapper}>
        <Stack direction="column">
          <List sx={styles.desktopNavLinks}>
            <Typography sx={styles.sectionHeader}>Browse</Typography>
            <NavbarLinksSection
              sectionName="browse"
              handleCloseNavMenu={handleCloseNavMenu}
              isMobile={false}
            />
          </List>
          <Divider sx={styles.divider} />
          <List sx={styles.navLinks}>
            <Typography sx={styles.sectionHeader}>Favorites</Typography>
            <NavbarLinksSection
              sectionName="favorites"
              handleCloseNavMenu={handleCloseNavMenu}
              isMobile={false}
            />
          </List>
        </Stack>
      </Box>
    </>
  );

  return (
    <>
      <AppBar position="fixed" sx={styles.navbar}>
        <Toolbar sx={styles.navbarContentContainer}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={styles.openIcon}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isMobile ? (
        <Drawer
          id="mobileNavbar"
          role="navigation"
          aria-label="Main"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={styles.mobileDrawer}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          id="desktopNavbar"
          role="navigation"
          aria-label="Main"
          sx={styles.desktopDrawer}
          variant="permanent"
          anchor="left"
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};
export default Navbar;

interface NavbarLinksSectionProps {
  isMobile: boolean;
  sectionName: "browse" | "favorites";
  handleCloseNavMenu: () => void;
}

const NavbarLinksSection = ({
  sectionName,
  handleCloseNavMenu,
  isMobile,
}: NavbarLinksSectionProps) => {
  const pages = [
    {
      name: "TV Shows",
      href: "/shows",
    },
    { name: "Movies", href: "/movies" },
  ];

  return pages.map((page) =>
    isMobile ? (
      <MenuItem
        key={page.href}
        component={Link}
        to={sectionName === "favorites" ? `/favorites${page.href}` : page.href}
        onClick={handleCloseNavMenu}
      >
        <Typography textAlign="center">{page.name}</Typography>
      </MenuItem>
    ) : (
      <ListItem
        component={Link}
        to={sectionName === "favorites" ? `/favorites${page.href}` : page.href}
        key={page.href}
        onClick={handleCloseNavMenu}
        sx={styles.desktopNavLink}
      >
        <ListItemIcon>
          {page.name === "TV Shows" ? <TvIcon /> : <MovieCreationIcon />}
        </ListItemIcon>
        <ListItemText primary={page.name} />
      </ListItem>
    )
  );
};
