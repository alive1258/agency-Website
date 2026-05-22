import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
  disabled?: boolean;
  label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  icon,
  className = "",
  theme = "dark",
  disabled = false,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Theme-based styles
  const containerBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const hoverBg = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const dropdownBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const dropdownBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const dropdownShadow = theme === "dark" ? "shadow-xl shadow-black/30" : "shadow-lg shadow-gray-400/20";
  const selectedBg = theme === "dark" ? "bg-blue-900/30" : "bg-blue-50";
  const selectedBorder = theme === "dark" ? "border-blue-500/50" : "border-blue-300";
  const iconColor = theme === "dark" ? "text-gray-400" : "text-gray-500";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className={`text-sm font-medium ${subTextColor} mb-2`}>
          {label}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between gap-3
            px-3 py-2.5 rounded-lg border
            ${containerBg} ${borderColor} ${textColor}
            transition-all duration-200
            ${disabled 
              ? "opacity-50 cursor-not-allowed" 
              : `hover:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`
            }
          `}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && <span className={iconColor}>{icon}</span>}
            <span className={`truncate ${!value ? subTextColor : ""}`}>
              {selectedOption?.label || placeholder}
            </span>
          </div>
          {!disabled && (
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${iconColor}`}
            />
          )}
        </button>

        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div className={`
            absolute top-full left-0 right-0 mt-1
            ${dropdownBg} ${dropdownBorder} border rounded-lg
            ${dropdownShadow} z-50 max-h-60 overflow-y-auto
          `}>
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between gap-2
                    px-3 py-2.5 text-sm transition-colors
                    ${value === option.value 
                      ? `${selectedBg} ${textColor} border-l-2 ${selectedBorder}` 
                      : `${textColor} ${hoverBg}`
                    }
                  `}
                >
                  <span className="flex-1 text-left">{option.label}</span>
                  {value === option.value && (
                    <Check size={14} className={theme === "dark" ? "text-blue-400" : "text-blue-600"} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;