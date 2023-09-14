interface FormFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  type: string;
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col px-5  ">
      <span className="text-white text-xl mb-2">{label}</span>
      {placeholder && (
        <span className="font-extralight mb-2 text-gray-350">
          {placeholder}
        </span>
      )}
      <input
        type={type}
        className="input w-60 border-gray-700 border bg-gray-900"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
