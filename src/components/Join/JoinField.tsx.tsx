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
  disabled?: boolean;
  emailConfirmCodeStatus?: 'success' | 'error' | null;
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
  disabled,
  emailConfirmCodeStatus,
}) => {
  const message =
    emailConfirmCodeStatus === 'success'
      ? '이메일 인증 완료!'
      : emailConfirmCodeStatus === 'error'
      ? '인증 코드가 일치하지 않습니다.'
      : error;

  return (
    <div>
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
          error || emailConfirmCodeStatus === 'error'
            ? 'ring-error ring-1 border-error focus:ring-error focus:ring-1 focus:border-error'
            : 'border-1'
        } `}
        disabled={disabled}
      />
      {message && (
        <p
          className={`mt-1 font-bold text-[12px] ${
            emailConfirmCodeStatus === 'success'
              ? 'text-blue-500'
              : 'text-error'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default JoinField;
