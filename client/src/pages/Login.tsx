import { login } from "../auth";

function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <p className="font-bold text-4xl tracking-tighter">Spotify Profile</p>
        <a onClick={login}>
          <button className="px-8 py-3 rounded-full bg-green hover:bg-offGreen text-xl tracking-widest">
            Login to Spotify
          </button>
        </a>
      </div>
    </div>
  );
}

export default Login;
