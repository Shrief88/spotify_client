import { SvgIconComponent } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: SvgIconComponent;
  title: string;
  link: string;
}

const NavItem = (props: NavItemProps) => {
  return (
    <NavLink
      className="flex flex-col justify-center items-center p-2 px-4 gap-1"
      to={props.link}>
      <props.icon></props.icon>
      <p className="text-lightGrey text-xs uppercase tracking-tighter">
        {props.title}
      </p>
    </NavLink>
  );
};

export default NavItem;
