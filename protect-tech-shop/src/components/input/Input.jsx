import './Input.css';

export const Input = ({ type, placeholder, label = '', ...props }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input type={type} placeholder={placeholder} className='input' {...props} />
    </div>
  );
};
