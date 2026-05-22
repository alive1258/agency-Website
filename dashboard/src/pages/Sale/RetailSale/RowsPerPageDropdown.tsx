import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface RowsPerPageProps {
  theme: 'dark' | 'light';
  subTextColor: string;
  textColor: string;
}

interface RowsOption {
  value: string;
  label: string;
  description?: string;
}

const RowsPerPageDropdown = ({ theme, subTextColor, textColor }: RowsPerPageProps) => {
  const [selectedRows, setSelectedRows] = useState<string>("25");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const rowsOptions: RowsOption[] = [
    { value: "5", label: "5"  },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100"},
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string): void => {
    setSelectedRows(value);
    setIsOpen(false);
    console.log(`Rows per page changed to: ${value}`);
  };

  const getSelectedLabel = (): string => {
    return rowsOptions.find((option) => option.value === selectedRows)?.label || "25";
  };



  // Theme-based styles
  const dropdownStyles = {
    container: theme === 'dark' 
      ? 'bg-gray-800/20 border-gray-700 text-gray-300 hover:bg-gray-800/30 hover:border-gray-500' 
      : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400',
    
    dropdownMenu: theme === 'dark'
      ? 'bg-gray-900 border-gray-700 shadow-black/30'
      : 'bg-white border-gray-300 shadow-gray-200/30',
    
    optionHover: theme === 'dark'
      ? 'hover:bg-gray-700'
      : 'hover:bg-gray-200',
    
    selectedOption: theme === 'dark'
      ? 'bg-blue-900/30 text-blue-400'
      : 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="flex items-center gap-4 relative">
      <div className={`text-sm ${subTextColor}`}>
        <span className="font-medium">Rows per page:</span>
        
        {/* Custom Dropdown */}
        <div ref={dropdownRef} className="relative inline-block ml-2">
          {/* Trigger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-between cursor-pointer min-w-20 px-2.5 py-1.5 text-sm rounded-md border outline-none transition-all duration-200 ${dropdownStyles.container} focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500`}
            type="button"
          >
            <span className="font-medium">{getSelectedLabel()}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown menu - Opens ABOVE the trigger */}
          {isOpen && (
            <div 
              className={`absolute bottom-full left-0 mb-1 w-20 ${dropdownStyles.dropdownMenu} border rounded-md shadow-lg z-9999 max-h-60 overflow-y-auto`}
            >
              {/* Options list */}
              <div className="py-1">
                {rowsOptions.map((option: RowsOption) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full cursor-pointer text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                      selectedRows === option.value
                        ? dropdownStyles.selectedOption
                        : `${dropdownStyles.optionHover} ${textColor}`
                    }`}
                    type="button"
                  >
                    <span className={`${selectedRows === option.value ? 'font-medium' : ''}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hidden select for form submission */}
          <select
            id="rowsPerPage"
            className="hidden"
            value={selectedRows}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedRows(e.target.value)
            }
          >
            {rowsOptions?.map((option: RowsOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

      
      </div>
    </div>
  );
};

export default RowsPerPageDropdown;