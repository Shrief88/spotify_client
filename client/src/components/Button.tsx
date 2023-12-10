interface ButtonProps {
  text : string;
  onClick: () => void;
}

const Button = (props : ButtonProps) =>{
  return(
    <button className="border px-4 py-1 rounded-full tracking-widest text-sm hover:bg-white hover:text-dark" onClick={props.onClick}>
      {props.text}     
    </button>
  )
}

export default Button;