interface MyComponentProps {
  title: string;
  url : string;
}

const LoginButton = (props: MyComponentProps) => {
  return (
    <a href={props.url} className="btn rounded-full bg-green-600 w-44 hover:bg-green-600 hover:text-white hover:animate-pump">
      {props.title}
    </a>
  );
};

export default LoginButton;
