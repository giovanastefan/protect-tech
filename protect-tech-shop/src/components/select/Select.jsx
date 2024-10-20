import "./Select.css";

export const Select = ({ id, label, options, value, onChange, placeholder, ...props }) => {
  return (
    <div className="select-container">
      {label && <p>{label}</p>}
      <select id={id} value={value} onChange={onChange} {...props}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
