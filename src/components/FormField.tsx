const FormField = ({
  label,
  type,
  size = 320,
  value,
  name,
  onChange,
  required = true,
  min,
  max,
  minLength,
  maxLength,
  readOnly = false,
}: {
  label: string;
  type: string;
  size?: number;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
}) => (
  <label className="form-control">
    <div className="label">
      <span className="label-text font-bold">{label}</span>
    </div>
    {readOnly ? (
      <div className={`p-3 rounded-md bg-gray-50 w-[${size}px] text-sm`}>
        {value}
      </div>
    ) : (
      <input
        type={type}
        className={`input input-bordered w-[${size}px] text-sm`}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        readOnly={readOnly}
      />
    )}
  </label>
);

export default FormField;
