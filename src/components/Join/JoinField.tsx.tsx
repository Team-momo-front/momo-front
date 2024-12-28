import Input from '../Input';

interface JoinFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  onBlur,
  error,
  placeholder,
  required = true,
}) => {
  return (
    <>
      <label htmlFor={id} className="block font-bold text-sm mb-2">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`${
          error
            ? 'ring-error ring-1 border-error focus:ring-error focus:ring-1 focus:border-error mb-0'
            : 'border-1'
        }`}
      />
      {error && (
        <p className="mt-1 mb-2 font-bold text-[12px] text-error">{error}</p>
      )}
    </>
  );
};

export default JoinField;
