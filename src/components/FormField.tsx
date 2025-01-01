const FormField = ({
  label,
  type,
  size = 'xs',
  value,
  name,
  onChange,
  required = true,
  min,
  max,
  minLength,
  maxLength,
}: {
  label: string;
  type: string;
  size?: string;
  value: string | number;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  minLength?: number;
  maxLength?: number;
}) => (
  <label className="form-control">
    <div className="label">
      <span className="label-text font-bold">{label}</span>
    </div>
    <input
      type={type}
      className={`input input-bordered max-w-${size} text-sm`}
      value={value}
      name={name}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      minLength={minLength}
      maxLength={maxLength}
    />
  </label>
);

export default FormField;
