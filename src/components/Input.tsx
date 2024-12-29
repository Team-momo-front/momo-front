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
  disabled?: boolean;
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
  disabled,
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
      disabled={disabled}
      className={`input input-bordered bg-white w-full max-w-xs p-4 font-bold text-sm placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
    />
  );
};

export default Input;
