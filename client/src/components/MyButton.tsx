interface MyButtonProbs {
  title: string;
  onClick: () => void;
}

const MyButton = (props: MyButtonProbs) => {
  return (
    <button
      className="btn-sm border px-6 rounded-full hover:bg-white hover:text-black"
      onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default MyButton;