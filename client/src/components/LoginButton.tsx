interface MyComponentProps {
  title: string;
  url : string;
}

const LoginButton = (props: MyComponentProps) => {
  return (
    <a href={props.url} className="btn text-white rounded-full bg-green w-44 hover:bg-green hover:text-white hover:animate-pump">
      {props.title}
    </a>
  );
};

export default LoginButton;
