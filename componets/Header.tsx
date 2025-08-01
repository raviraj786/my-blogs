"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#ffffff", 0.15),
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: 6,
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [mounted, setMounted] = React.useState(false); 
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true); 
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  const handleLogoutRedirect = () => {
    localStorage.removeItem("token");
    setIsLogin(false); 
    router.push("/");
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000",
          height: 72,
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              letterSpacing: 1,
            }}
          >
            My Blogs
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#fff" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {!isLogin ? (
            <LoginIcon
              sx={{
                ml: 2,
                fontSize: 30,
                cursor: "pointer",
              }}
              onClick={handleLoginRedirect}
            />
          ) : (
            <LogoutIcon
              sx={{
                ml: 2,
                fontSize: 30,
                cursor: "pointer",
              }}
              onClick={handleLogoutRedirect}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
