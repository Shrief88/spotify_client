interface UserInfoItemProps {
  title: string;
  number: number;
}

const UserInfoItem = (props: UserInfoItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-green font-black text-lg">
        {props.number}
      </p>
      <p className="text-gray text-xs">{props.title}</p>
    </div>
  );
};

export default UserInfoItem;
