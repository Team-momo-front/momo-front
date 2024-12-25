interface InputProps {
  type: string;
  name: string;
  // value: string;
  // onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  required: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, required = true, className = '' }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className={`w-full h-[50px] mb-4 p-4 shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] rounded-md font-bold text-sm placeholder-gray-500 outline-none ${className}`}
    />
  );
};

export default Input;
