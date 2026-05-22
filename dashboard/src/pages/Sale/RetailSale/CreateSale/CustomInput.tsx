import type { LucideIcon } from "lucide-react";
import React from "react";


interface CustomInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  type?: string;
  className?: string;
  theme?: "light" | "dark";
  disabled?: boolean;
  label?: string;
  min?: number;
  max?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  type = "text",
  className = "",
  theme = "dark",
  disabled = false,
  label,
  min,
  max,
}) => {
  const inputBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const focusBorder = theme === "dark" ? "focus:border-blue-500" : "focus:border-blue-500";
  const focusRing = theme === "dark" ? "focus:ring-blue-500/30" : "focus:ring-blue-500/20";

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className={`text-sm font-medium ${subTextColor} mb-2`}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${subTextColor}`} size={16} />
        )}
        
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className={`
            w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2.5 rounded-lg border
            ${inputBg} ${borderColor} ${textColor}
            transition-all duration-200 outline-none
            ${disabled 
              ? "opacity-50 cursor-not-allowed" 
              : `${focusBorder} focus:ring-1 ${focusRing}`
            }
          `}
        />
      </div>
    </div>
  );
};

export default CustomInput;