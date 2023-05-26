import LoginButton from "../components/LoginButton.tsx";

const Login = () => {
  return (
    <>
      <p className="text-2xl font-bold pb-3">Spotify Profile</p>
      <LoginButton
        title="Login to spotify"
        url="http://localhost:3000/login"></LoginButton>
    </>
  );
};

export default Login;
