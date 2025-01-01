interface InfoFormFieldProps {
  name: string;
  label: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  isModified: boolean;
}

const InfoFormField: React.FC<InfoFormFieldProps> = ({
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
  maxLength,
  isModified,
}) => {
  return (
    <div className="w-[320px]">
      <label className="form-control w-full max-w-xs">
        <div className="label p-0">
          <span className="label-text font-bold text-lg mb-2">{label}</span>
        </div>
        <input
          name={name}
          type={type}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={
            isModified
              ? `input input-bordered bg-white w-full p-4 font-bold text-sm placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                  error &&
                  'ring-error ring-1 border-error focus:ring-error focus:ring-1 focus:border-error'
                }`
              : 'input-custom-modified font-bold text-sm p-4'
          }
          maxLength={maxLength}
        />
        {error && (
          <p className="mt-1 font-bold text-[12px] text-error">{error}</p>
        )}
      </label>
    </div>
  );
};

export default InfoFormField;
