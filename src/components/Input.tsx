interface InputProps {
  type: string;
  name: string;
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  required = true,
  className = '',
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      className={`input input-bordered w-full max-w-xs mb-4 p-4 font-bold text-sm placeholder-gray-500 focus:outline-none ${className}`}
    />
  );
};

export default Input;
