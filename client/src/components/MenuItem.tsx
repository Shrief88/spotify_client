import { SvgIconComponent } from "@mui/icons-material";

interface MenuItemProps {
  icon : SvgIconComponent
  desc : string;
}

const MenuItem = (props : MenuItemProps) => {
  return(
    <li className="flex flex-col justify-center items-center p-2 px-4">
      <props.icon></props.icon>
      <p className="text-lightGrey text-xs uppercase tracking-tighter">{props.desc}</p>
    </li>
  )
}

export default MenuItem;