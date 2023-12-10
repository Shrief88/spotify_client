import { SvgIconComponent } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: SvgIconComponent;
  title: string;
  link: string;
  activeItem: string;
  handleNavToggle: (navTitle: string) => void;
}

const NavItem = (props: NavItemProps) => {
  const link =
    props.link.split("/")[1] === "" ? "profile" : props.link.split("/")[1];
  const activeMobile = props.activeItem === link ? "border-t-green" : "";

  
  const active = props.activeItem === link ? "border-r-green" : "";

  return (
    <NavLink
      className={`border-darkBlack ${activeMobile} sm:${active} flex flex-col justify-center items-center p-2  gap-1 hover:border-green border-t-4 sm:border-t-0 sm:border-r-4 sm:px-4`}
      to={props.link}
      onClick={() => props.handleNavToggle(link)}>
      <props.icon></props.icon>
      <p className="text-lightGrey text-[10px] lg:text-[12px] uppercase tracking-tighter">
        {props.title}
      </p>
    </NavLink>
  );
};

export default NavItem;
