function Login() {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold text-4xl tracking-tighter">Spotify Profile</p>
      <a href="http://localhost:3000/login">
        <button className="px-8 py-3 rounded-full bg-green hover:bg-offGreen text-xl tracking-widest">
          Login to Spotify
        </button>
      </a>
    </div>
  );
}

export default Login;
