import Input from '../Input';

interface JoinFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  placeholder: string;
  required?: boolean;
}

const JoinField: React.FC<JoinFieldProps> = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = true,
}) => {
  return (
    <>
      <label htmlFor={id} className="font-bold text-lg mb-1">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mb-2 ${error && 'border-error border-2'}`}
      />
      {error && <p className="mb-2 font-bold text-[12px] text-error">{error}</p>}
    </>
  );
};

export default JoinField;
