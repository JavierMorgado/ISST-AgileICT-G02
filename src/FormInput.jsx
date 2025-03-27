import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FormInput ({ label, name, placeholder, value, onChange }) {
  const [inputValue, setInputValue] = useState(value);
  const measureRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (measureRef.current && inputRef.current) {
      const newWidth = measureRef.current.offsetWidth + 10; // Un poco de margen
      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="mb-5 d-flex flex-column align-items-center">
      <h4 className="fw-semibold text-uppercase">{label}</h4>
      <div className="input-wrapper">
        {/* Span oculto para medir el ancho dinámico del texto */}
        <span ref={measureRef} className="input-measure">
          {inputValue || placeholder}
        </span>
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};