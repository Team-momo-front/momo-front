import Input from '../Input';

interface JoinFieldProps {
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
  max?: string;
  min?: string;
  length?: number;
}

const JoinField: React.FC<JoinFieldProps> = ({
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
  max,
  min,
  length,
}) => {
  const message =
    emailConfirmCodeStatus === 'success'
      ? '이메일 인증 완료!'
      : emailConfirmCodeStatus === 'error'
      ? '인증 코드가 일치하지 않습니다.'
      : error;

  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label p-0">
          <span className="label-text font-bold text-sm mb-2">{label}</span>
        </div>
        <Input
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
          max={max}
          min={min}
          length={length}
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
      </label>
    </div>
  );
};

export default JoinField;
