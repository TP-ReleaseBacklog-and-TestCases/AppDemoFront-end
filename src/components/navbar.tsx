import React from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/auth-context";
import { CATEGORY_IMAGES } from "../constants/categoryImages";

export const NavbarComponent = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarBrand>
        <Link as={RouterLink} to="/" className="font-bold text-inherit flex items-center">
          <Icon icon="lucide:shopping-bag" className="text-primary text-xl mr-2" />
          <p className="font-semibold text-inherit">MarketPlace</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === "/"}>
          <Link as={RouterLink} to="/" color="foreground">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname.startsWith("/explore")}>
          <Link as={RouterLink} to="/explore" color="foreground">
            Explore
          </Link>
        </NavbarItem>
        {user?.role === "seller" && (
          <NavbarItem isActive={location.pathname.startsWith("/seller")}>
            <Link as={RouterLink} to="/seller/dashboard" color="foreground">
              Seller Dashboard
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user?.name}
                size="sm"
                src={CATEGORY_IMAGES["perfil"]}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link as={RouterLink} to="/account/settings" color="foreground" className="w-full block">
                  Account Settings
                </Link>
              </DropdownItem>
              {user?.role === "seller" && (
                <DropdownItem key="dashboard">
                  <Link as={RouterLink} to="/seller/dashboard" color="foreground" className="w-full block">
                    Seller Dashboard
                  </Link>
                </DropdownItem>
              )}
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button as={RouterLink} color="primary" to="/login" variant="flat">
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export { NavbarComponent as Navbar };