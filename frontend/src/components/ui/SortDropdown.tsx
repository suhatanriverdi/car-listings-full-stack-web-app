import { useEffect, useState } from "react";
import { SortFields, SortOrder } from "@/utils/sortTypes";
import { formatFieldName } from "../../utils/formatFieldName";

// Define the type for the onSortQueryChange function prop
type SortDropdownProps = {
  // Function to handle sort changes
  onSortQueryChange: (field: string, order: string) => void;
};

const SortDropdown = ({ onSortQueryChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (field: SortFields, order: SortOrder) => {
    // Update sortField and sortOrder in the parent component
    onSortQueryChange(field, order);
    setIsOpen(false);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest(".sort-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Mapping field names to their display text with sorting order
  const sortDescriptions = {
    [SortFields.PRICE]: {
      asc: "Price Low",
      desc: "Price High",
    },
    [SortFields.YEAR]: {
      asc: "Year Old",
      desc: "Year New",
    },
    [SortFields.MILEAGE]: {
      asc: "Mileage Low",
      desc: "Mileage High",
    },
  };

  return (
    <div className="relative sort-menu">
      <button onClick={() => setIsOpen(!isOpen)} className="btn">
        Sort
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-max bg-white border rounded shadow-lg">
          {Object.values(SortFields).map((field) => (
            <div key={field} className="px-4 py-2">
              {/* Ascending Sort Button */}
              <button
                onClick={() => handleSortClick(field as SortFields, "asc")}
                className="block w-full text-left hover:text-button-bg-dark"
              >
                {sortDescriptions[field]?.asc || formatFieldName(field)}
              </button>
              {/* Descending Sort Button */}
              <button
                onClick={() => handleSortClick(field as SortFields, "desc")}
                className="block w-full text-left hover:text-button-bg-dark"
              >
                {sortDescriptions[field]?.desc || formatFieldName(field)}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
