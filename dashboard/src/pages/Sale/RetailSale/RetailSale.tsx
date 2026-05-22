

import {
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  ListFilter,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router";
import { useThemeColors } from "../../../redux/features/useThemeColors";
import RowsPerPageDropdown from "./RowsPerPageDropdown";

// Action Menu Component - Updated to use useThemeColors
interface ActionMenuProps {
  itemId: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy?: (id: string) => void;
}

export const ActionMenu = ({
  itemId,
  onView,
  onEdit,
  onDelete,
  onCopy,
}: ActionMenuProps) => {
  const {
    theme,
    menuBg,
    menuBorder,
    menuShadow,
    menuItemHover,
    menuItemText,
    menuButtonHover,
    menuButtonText,
    menuDividerColor,
    info,
    success,
    classNames,
  } = useThemeColors();

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate menu position
  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + window.scrollY + 6,
      left: Math.min(rect.right - 160, window.innerWidth - 170),
    });
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = useCallback(() => {
    setIsOpen(false);
    onView(itemId);
  }, [itemId, onView]);

  const handleEdit = useCallback(() => {
    setIsOpen(false);
    onEdit(itemId);
  }, [itemId, onEdit]);

  const handleCopy = useCallback(() => {
    if (!onCopy) return;
    navigator.clipboard.writeText(itemId);
    onCopy(itemId);
    setIsOpen(false);
  }, [itemId, onCopy]);

  const handleDelete = useCallback(() => {
    if (!window.confirm(`Delete ${itemId}?`)) return;
    setIsOpen(false);
    onDelete(itemId);
  }, [itemId, onDelete]);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className={`p-2 rounded-lg ${menuButtonText} ${menuButtonHover} transition`}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && position && (
        <div
          className={`fixed z-50 w-40 ${menuBg} ${menuBorder} rounded-lg ${menuShadow}`}
          style={{ top: position.top, left: position.left }}
        >
          <div className="p-1.5 space-y-1">
            <button
              onClick={handleView}
              className={`flex items-center gap-2 w-full p-2 rounded text-sm ${menuItemText} ${menuItemHover} transition`}
            >
              <Eye size={14} className={info} />
              View
            </button>

            <button
              onClick={handleEdit}
              className={`flex items-center gap-2 w-full p-2 rounded text-sm ${menuItemText} ${menuItemHover} transition`}
            >
              <Edit size={14} className={success} />
              Edit
            </button>

            {onCopy && (
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 w-full p-2 rounded text-sm ${menuItemText} ${menuItemHover} transition`}
              >
                <Copy
                  size={14}
                  className={classNames(
                    "",
                    "text-purple-400",
                    "text-purple-600"
                  )}
                />
                Copy ID
              </button>
            )}

            <div className={`border-t ${menuDividerColor} my-1`} />

            <button
              onClick={handleDelete}
              className={`flex items-center gap-2 w-full p-2 rounded text-sm ${
                theme === "dark"
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-red-600 hover:bg-red-100"
              } transition`}
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RetailSale = () => {
  // Use the theme hook instead of individual selectors
  const {
    theme,
    cardBg,
    borderColor,
    borderTable,
    textColor,
    subTextColor,
    inputBg,
    inputBorder,
    tableHeaderBg,
    tableRowEven,
    tableRowOdd,
    tableRowHover,
    buttonPrimary,
    buttonSecondary,
    success,
    warning,
    error,
    info,
    borderleftColor,
  } = useThemeColors();

  // Handler functions for actions
  const handleViewPurchase = (id: string) => {
    console.log("Viewing purchase:", id);
    alert(`Viewing purchase: ${id}`);
  };

  const handleEditPurchase = (id: string) => {
    console.log("Editing purchase:", id);
    alert(`Editing purchase: ${id}`);
  };

  const handleDeletePurchase = (id: string) => {
    console.log("Deleting purchase:", id);
    alert(`Deleting purchase: ${id}`);
  };

  const handleCopyInvoiceId = (id: string) => {
    console.log("Copied invoice ID:", id);
    // You can add a toast notification here
  };

  const [selectedFilter, setSelectedFilter] = useState<
    "today" | "thisweek" | "thismonth" | "custom"
  >("today");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterClick = (
    filter: "today" | "thisweek" | "thismonth" | "custom"
  ) => {
    setSelectedFilter(filter);
    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      setDateFrom(today);
      setDateTo(today);
    } else if (filter === "thisweek") {
      const today = new Date();
      const firstDay = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const lastDay = new Date(
        today.setDate(today.getDate() - today.getDay() + 6)
      );
      setDateFrom(firstDay.toISOString().split("T")[0]);
      setDateTo(lastDay.toISOString().split("T")[0]);
    } else if (filter === "thismonth") {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setDateFrom(firstDay.toISOString().split("T")[0]);
      setDateTo(lastDay.toISOString().split("T")[0]);
    }
  };

  const handleReset = () => {
    setSelectedFilter("today");
    setDateFrom("");
    setDateTo("");
    setSearchTerm("");
    handleFilterClick("today");
  };

  const handleSearch = () => {
    console.log("Searching with:", {
      dateFrom,
      dateTo,
      searchTerm,
      filter: selectedFilter,
    });
    // Implement your search logic here
  };

  interface Purchase {
    date: string;
    supplierName: string;
    invoiceNo: string;
    totalAmount: number;
    paidAmount: number;
    status: "Paid" | "Pending" | "Partial";
    isApproved: boolean;
    dueAmount?: number;
    paymentMethod?: string;
  }

  const todayPurchases: Purchase[] = [
    {
      date: "2024-01-15",
      supplierName: "Tech Supplies Inc.",
      invoiceNo: "INV-2024-001",
      totalAmount: 12500.75,
      paidAmount: 12500.75,
      dueAmount: 0,
      status: "Paid",
      isApproved: true,
      paymentMethod: "Bank Transfer",
    },
    {
      date: "2024-01-15",
      supplierName: "Office Solutions Ltd.",
      invoiceNo: "INV-2024-002",
      totalAmount: 8500.5,
      paidAmount: 5000.0,
      dueAmount: 3500.5,
      status: "Partial",
      isApproved: true,
      paymentMethod: "Credit",
    },
    {
      date: "2024-01-15",
      supplierName: "Global Electronics",
      invoiceNo: "INV-2024-003",
      totalAmount: 22000.0,
      paidAmount: 0,
      dueAmount: 22000.0,
      status: "Pending",
      isApproved: false,
      paymentMethod: "Pending",
    },
    {
      date: "2024-01-15",
      supplierName: "Printing Masters",
      invoiceNo: "INV-2024-004",
      totalAmount: 4500.25,
      paidAmount: 4500.25,
      dueAmount: 0,
      status: "Paid",
      isApproved: true,
      paymentMethod: "Cash",
    },
    {
      date: "2024-01-15",
      supplierName: "Stationery World",
      invoiceNo: "INV-2024-005",
      totalAmount: 3200.8,
      paidAmount: 3200.8,
      dueAmount: 0,
      status: "Paid",
      isApproved: true,
      paymentMethod: "Digital Wallet",
    },
  ];

  return (
    <div>
      {/* Filter Section */}
      <div
        className={`${cardBg} rounded-lg ${borderColor} overflow-hidden p-6 mb-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Filter size={20} className={info} />
            <h2 className={`text-lg  ${textColor} ml-2`}>
              Retail Sales
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${textColor}`}>Active Filter:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-normal capitalize`}
            >
              {selectedFilter}
            </span>
          </div>
        </div>

        <div
          className={`flex flex-col lg:flex-row items-stretch gap-4 p-6 ${
            theme === "dark" ? "bg-gray-900/30" : "bg-white"
          } rounded-md ${borderColor}`}
        >
          {/* Left Section - Inputs */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date From */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                From
              </label>
              <div
                className={`relative flex-1 border flex items-stretch rounded-lg${
                  theme === "dark" ? " border-gray-800" : "  border-gray-300"
                }`}
              >
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Calendar className={textColor} size={16} />
                </div>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    setSelectedFilter("custom");
                  }}
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>

            {/* Date To */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                To
              </label>
              <div
                className={`relative flex-1 border flex items-stretch rounded-lg${
                  theme === "dark" ? " border-gray-800" : "  border-gray-300"
                }`}
              >
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Calendar className={textColor} size={16} />
                </div>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setSelectedFilter("custom");
                  }}
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>

            {/* Search Customer */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                Search
              </label>
              <div
                className={`relative flex-1 border flex items-stretch rounded-lg${
                  theme === "dark" ? " border-gray-800" : "  border-gray-300"
                }`}
              >
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className={textColor} size={16} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Customer....."
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>

            {/* Invoice no */}
            <div className="flex flex-col">
              <label
                className={`block text-sm font-normal ${textColor} mb-1 shrink-0`}
              >
                Invoice no
              </label>
              <div
                className={`relative flex-1 border flex items-stretch rounded-lg ${
                  theme === "dark" ? " border-gray-800" : "  border-gray-300"
                }`}
              >
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className={textColor} size={16} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Invoice no....."
                  className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-md ${textColor} text-sm outline-none flex-1`}
                />
              </div>
            </div>
          </div>

          {/* Right Section - Buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Action Buttons Container */}
            <div className="flex flex-col">
              <label
                className={`block text-xs font-normal ${textColor} mb-1 shrink-0 opacity-0`}
              >
                &nbsp;
              </label>
              <div className="flex gap-3">
                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md  text-sm transition-all duration-300 ${buttonPrimary}`}
                >
                  <Search size={18} />
                  <span className="">SEARCH</span>
                </button>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md  text-sm transition-all duration-300 border ${buttonSecondary} ${textColor}`}
                >
                  <RefreshCw
                    size={18}
                    className="group-hover:rotate-180 transition-transform duration-700"
                  />
                  <span className="">RESET</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Purchase Table - Updated to match Stock Alert design */}
      <div
        className={`rounded-lg border-t border-r ${borderTable} overflow-hidden`}
      >
        <div className="overflow-x-auto">
          {/* Header Section */}
          <div
            className={`p-4 ${
              theme === "dark"
                ? "border-l rounded-t-lg border-gray-800"
                : "border-l rounded-t-lg border-gray-200 bg-white"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              {/* Left side - Title and Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    theme === "dark"
                      ? "bg-linear-to-r from-blue-600 to-blue-800"
                      : "bg-linear-to-r from-blue-500 to-blue-600"
                  }`}
                >
                  <ShoppingCart className="text-white" size={20} />
                </div>
                <div className="min-w-0">
                  <h1
                    className={`text-lg font-semibold truncate ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Today's Retail Sales
                  </h1>
                  <p
                    className={`text-sm truncate ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Recent purchase transactions
                  </p>
                </div>
              </div>

              {/* Right side - Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {/* Download PDF button - Hidden on small mobile, shown on larger */}
                <button
                  className={`${borderColor} cursor-pointer px-3 py-2 rounded-md text-sm flex items-center gap-2 hover:${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  } transition-colors hidden sm:flex`}
                >
                  <Download
                    className={
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }
                    size={16}
                  />
                  <span className="hidden md:inline">Download PDF</span>
                </button>

                {/* Mobile Download Icon */}
                <button
                  className={`${borderColor} cursor-pointer p-2 rounded-md hover:${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  } transition-colors sm:hidden`}
                  title="Download PDF"
                >
                  <Download
                    className={
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }
                    size={16}
                  />
                </button>

                {/* Columns button */}
                <button
                  className={`${borderColor} cursor-pointer px-3 py-2 rounded-md text-sm flex items-center gap-2 hover:${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  } transition-colors`}
                >
                  <ListFilter
                    className={
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    }
                    size={16}
                  />
                  <span className="hidden sm:inline">Columns</span>
                  <ChevronDown className="ml-1" size={14} />
                </button>

                {/* Add New button */}
                <Link to="/create-sale">
                  <button
                    className={`cursor-pointer px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                      theme === "dark"
                        ? "bg-linear-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
                        : "bg-linear-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                    } transition-colors whitespace-nowrap`}
                  >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Add New</span>
                
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Table Container with horizontal scroll on mobile */}
          <div className="overflow-x-auto ">
            <table className="w-full min-w-160 sm:min-w-full">
              <thead>
                <tr
                  className={`${tableHeaderBg} ${
                    theme === "dark"
                      ? "border-t border-gray-800"
                      : "border-t border-gray-300"
                  }`}
                >
                  <th
                    className={`py-3 px-4 sm:py-2.5 sm:px-6 text-left ${borderleftColor} font-semibold text-sm`}
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Calendar size={16} className="shrink-0" />
                      <span>Date</span>
                    </div>
                  </th>
                  <th
                    className={`py-3 px-4 sm:py-2.5 sm:px-6 text-left ${borderleftColor} font-semibold text-sm`}
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <User size={16} className="shrink-0" />
                      <span>Customer</span>
                    </div>
                  </th>
                  <th
                    className={`py-3 px-4 sm:py-2.5 sm:px-6 text-left ${borderleftColor} font-semibold text-sm`}
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <FileText size={16} className="shrink-0" />
                      <span>Invoice No</span>
                    </div>
                  </th>
                  <th
                    className={`py-3 px-4 sm:py-2.5 sm:px-6 text-left ${borderleftColor} font-semibold text-sm whitespace-nowrap`}
                  >
                    Total Amount
                  </th>
                  <th
                    className={`py-3 px-4 sm:py-2.5 sm:px-6 text-left ${borderleftColor} font-semibold text-sm whitespace-nowrap`}
                  >
                    Paid Amount
                  </th>
                  <th
                    className={`py-3 px-4 sm:py-2.5 sm:px-6 text-left ${borderleftColor} font-semibold text-sm`}
                  >
                    Status
                  </th>
                  <th
                    className={`py-3 px-4 sm:py-2.5 sm:px-6 text-left ${borderleftColor} font-semibold text-sm`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todayPurchases.length > 0 ? (
                  todayPurchases.map((purchase, index) => {
                    const dueAmount =
                      purchase.totalAmount - purchase.paidAmount;
                    const isFullyPaid = dueAmount <= 0;

                    // Status badge colors
                    const statusBadge =
                      purchase.status === "Paid"
                        ? theme === "dark"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-green-100 text-green-700 border-green-300"
                        : purchase.status === "Partial"
                        ? theme === "dark"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : theme === "dark"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-blue-100 text-blue-700 border-blue-300";

                    const pendingBadge =
                      theme === "dark"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : "bg-red-100 text-red-700 border-red-300";

                    return (
                      <tr
                        key={index}
                        className={`${tableRowHover} ${
                          index % 2 === 0 ? tableRowEven : tableRowOdd
                        }`}
                      >
                        {/* Date - Stacked layout on mobile */}
                        <td
                          className={`py-3 px-4 sm:py-2.5 sm:px-6 ${borderleftColor}`}
                        >
                          <div className=" whitespace-nowrap">
                            {purchase.date}
                          </div>
                        </td>

                        {/* Customer - Stacked layout on mobile */}
                        <td
                          className={`py-3 px-4 sm:py-2.5 sm:px-6 ${borderleftColor}`}
                        >
                          <div className=" truncate max-w-30 sm:max-w-none">
                            {purchase.supplierName}
                          </div>
                          <div className={`text-xs ${subTextColor} truncate`}>
                            {purchase.paymentMethod}
                          </div>
                        </td>

                        {/* Invoice No - Compact on mobile */}
                        <td
                          className={`py-3 px-4 sm:py-2.5 sm:px-6 ${borderleftColor}`}
                        >
                          <div
                            className={`inline-flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5 ${
                              theme === "dark"
                                ? "bg-gray-800/50 text-white"
                                : "bg-gray-100 text-gray-800"
                            } font-mono rounded-lg text-xs sm:text-sm truncate`}
                          >
                            <FileText
                              size={12}
                              className={`${subTextColor} shrink-0`}
                            />
                            <span className="truncate">
                              {purchase.invoiceNo}
                            </span>
                          </div>
                        </td>

                        {/* Total Amount - Compact currency on mobile */}
                        <td
                          className={`py-3 px-4 sm:py-2.5 sm:px-6 ${borderleftColor}`}
                        >
                          <div className=" whitespace-nowrap">
                            <span className="sm:hidden">$</span>
                            <span className="hidden sm:inline">$</span>
                            {purchase.totalAmount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </td>

                        {/* Paid Amount - Stacked on mobile */}
                        <td
                          className={`py-3 px-4 sm:py-2.5 sm:px-6 ${borderleftColor}`}
                        >
                          <div>
                            <div
                              className={`${
                                isFullyPaid ? success : warning
                              } whitespace-nowrap`}
                            >
                              <span className="sm:hidden">$</span>
                              <span className="hidden sm:inline">$</span>
                              {purchase.paidAmount.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}
                            </div>
                            {!isFullyPaid && (
                              <div className={`text-xs ${error} mt-1`}>
                                Due: ${dueAmount.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Status - Compact badges on mobile */}
                        <td
                          className={`py-3 px-4 sm:py-2.5 sm:px-6 ${borderleftColor}`}
                        >
                          <div className="flex items-center gap-2">
                            {purchase.isApproved ? (
                              <>
                                <CheckCircle
                                  size={14}
                                  className={`${success} shrink-0`}
                                />
                                <span
                                  className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs border ${statusBadge} truncate`}
                                >
                                  {purchase.status}
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle
                                  size={14}
                                  className={`${error} shrink-0`}
                                />
                                <span
                                  className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs border ${pendingBadge} truncate`}
                                >
                                  Pending
                                </span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Actions - Center aligned on mobile */}
                        <td
                          className={`py-3 px-4 sm:py-2.5 sm:px-6 ${borderleftColor}`}
                        >
                          <div className="flex justify-center sm:justify-start">
                            <ActionMenu
                              itemId={purchase.invoiceNo}
                              onView={handleViewPurchase}
                              onEdit={handleEditPurchase}
                              onDelete={handleDeletePurchase}
                              onCopy={handleCopyInvoiceId}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 sm:py-12 px-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div
                          className={`p-3 sm:p-4 ${
                            theme === "dark" ? "bg-gray-800/50" : "bg-gray-100"
                          } rounded-xl sm:rounded-2xl mb-3 sm:mb-4`}
                        >
                          <ShoppingCart
                            size={32}
                            className="opacity-30 sm:size-48"
                          />
                        </div>
                        <p
                          className={`text-base sm:text-xl  ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          } mb-2`}
                        >
                          No purchases today
                        </p>
                        <p
                          className={`text-xs sm:text-sm ${
                            theme === "dark" ? "text-gray-600" : "text-gray-500"
                          } mb-4 text-center px-4`}
                        >
                          There are no purchase records for today
                        </p>
                        <Link to="/create-sale">
                          <button
                            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm font-normal transition-all duration-300 ${buttonPrimary}`}
                          >
                            Create New Purchase
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer - Responsive */}
          {todayPurchases.length > 0 && (
            <div
              className={`p-4 ${
                theme === "dark"
                  ? "border-l rounded-b-lg border-gray-800"
                  : "border-l rounded-b-lg border-gray-200 bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left side - Rows per page */}
                <RowsPerPageDropdown
                  theme={theme}
                  subTextColor={subTextColor}
                  textColor={textColor}
                />

                {/* Right side - Pagination */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between xs:justify-end gap-3">
                  <div className={`text-sm ${subTextColor} order-2 xs:order-1`}>
                    <span className={`${textColor} `}>1-5</span> of{" "}
                    <span className={`${textColor} `}>20</span>
                  </div>

                  <div className="flex items-center gap-1 order-1 xs:order-2">
                    <button
                      className={`p-2 rounded-md ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50"
                      }`}
                      disabled
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm  ${
                          theme === "dark"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        1
                      </button>
                      <button
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm  ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        2
                      </button>
                      <button
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm  ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        3
                      </button>
                      <span className={`px-1 sm:px-2 ${subTextColor}`}>
                        ...
                      </span>
                      <button
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs sm:text-sm  ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        10
                      </button>
                    </div>

                    <button
                      className={`p-2 rounded-md ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetailSale;
