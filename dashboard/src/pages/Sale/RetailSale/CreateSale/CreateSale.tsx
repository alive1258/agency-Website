
import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Tag,
  Truck,
  User,
  X,
  Percent,
  CreditCard,
  Wallet,
  Smartphone,
  Banknote,
} from "lucide-react";
import CustomSelect from "./CustomSelect";
import { useThemeColors } from "../../../../redux/features/useThemeColors";


interface Product {
  id: number;
  name: string;
  company: string;
  mrp: number;
  unit: string;
  availableQty: number;
  freeQty: number;
  discount: number;
  subtotal: number;
}

interface CustomerOption {
  value: string;
  label: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface PaymentMethodOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface DiscountTypeOption {
  value: string;
  label: string;
}

const CreateSale = () => {
  // Use the theme hook instead of individual selectors
  const { 
    theme, 
    cardBg, 
    textColor, 
    subTextColor, 
    inputBg, 
    inputBorder, 
    buttonPrimary, 
    buttonSecondary,
    borderColor,
    borderLight,
    success,
    warning,
    info,
    classNames 
  } = useThemeColors();

  // Customer options
  const customerOptions: CustomerOption[] = [
    { value: "Unknown", label: "Unknown" },
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Business Corp", label: "Business Corp" },
    { value: "Retail Customer", label: "Retail Customer" },
    { value: "Wholesale Buyer", label: "Wholesale Buyer" },
  ];

  // Category options
  const categoryOptions: CategoryOption[] = [
    { value: "All Category", label: "All Category" },
    { value: "Dairy", label: "Dairy" },
    { value: "Beverages", label: "Beverages" },
    { value: "Snacks", label: "Snacks" },
    { value: "Bakery", label: "Bakery" },
    { value: "Frozen", label: "Frozen" },
  ];

  // Payment method options with icons - using theme colors from hook
  const paymentMethodOptions: PaymentMethodOption[] = [
    { 
      value: "Cash", 
      label: "Cash", 
      icon: <DollarSign size={16} className={success} />
    },
    { 
      value: "Bank", 
      label: "Bank Transfer", 
      icon: <Banknote size={16} className={info} />
    },
    { 
      value: "Card", 
      label: "Credit/Debit Card", 
      icon: <CreditCard size={16} className={classNames("", "text-purple-400", "text-purple-600")} />
    },
    { 
      value: "Mobile", 
      label: "Mobile Banking", 
      icon: <Smartphone size={16} className={classNames("", "text-cyan-400", "text-cyan-600")} />
    },
    { 
      value: "Wallet", 
      label: "Digital Wallet", 
      icon: <Wallet size={16} className={classNames("", "text-amber-400", "text-amber-600")} />
    },
  ];

  // Account name options
  const accountNameOptions: CustomerOption[] = [
    { value: "Main Account", label: "Main Account" },
    { value: "Cash Account", label: "Cash Account" },
    { value: "Bank Account", label: "Bank Account" },
    { value: "Mobile Account", label: "Mobile Account" },
  ];

  // Discount type options
  const discountTypeOptions: DiscountTypeOption[] = [
    { value: "None", label: "None" },
    { value: "Percentage", label: "Percentage (%)" },
    { value: "Fixed", label: "Fixed Amount" },
  ];

  // Product options - will be populated after products state is defined
  const [productOptions, setProductOptions] = useState<{value: string; label: string}[]>([
    { value: "", label: "Select One" },
  ]);

  // Form states
  const [customer, setCustomer] = useState("Unknown");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("None");
  const [category, setCategory] = useState("All Category");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountName, setAccountName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [orderNote, setOrderNote] = useState("");
  const [shippingCharge, setShippingCharge] = useState(0);
  const [products, ] = useState<Product[]>([
    {
      id: 1,
      name: "Powder Milk 500gm",
      company: "Meghna Group",
      mrp: 150.00,
      unit: "PCS",
      availableQty: 100,
      freeQty: 0,
      discount: 0,
      subtotal: 0,
    },
    {
      id: 2,
      name: "Tea Strong 500gm",
      company: "Meghna Group",
      mrp: 80.00,
      unit: "PCS",
      availableQty: 50,
      freeQty: 0,
      discount: 0,
      subtotal: 0,
    },
    {
      id: 3,
      name: "Sugar 1kg",
      company: "Square Group",
      mrp: 120.00,
      unit: "PCS",
      availableQty: 200,
      freeQty: 0,
      discount: 0,
      subtotal: 0,
    },
  ]);

  const [cart, setCart] = useState<Product[]>([]);

  // Update product options when products change
  React.useEffect(() => {
    const updatedOptions = [
      { value: "", label: "Select One" },
      ...products.map(product => ({
        value: product.id.toString(),
        label: `${product.name} - ${product.company}`
      }))
    ];
    setProductOptions(updatedOptions);
  }, [products]);

  // Calculations
  const subTotal = cart.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const productWiseDiscount = cart.reduce((sum, item) => sum + (item.discount || 0), 0);
  const grandTotalDiscount = discount;
  const shippingAndOtherCharge = shippingCharge;
  const payableAmount = subTotal - productWiseDiscount - grandTotalDiscount + shippingAndOtherCharge;

  const handleAddToCart = (productId: string) => {
    if (!productId) return;
    
    const product = products.find(p => p.id.toString() === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      // Update quantity
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, subtotal: item.mrp * 1 } // Update calculation
          : item
      ));
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...product, subtotal: product.mrp }]);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, subtotal: item.mrp * quantity }
        : item
    ));
  };

  const handleUpdateDiscount = (id: number, discount: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, discount: discount }
        : item
    ));
  };

  const handleSaveSale = () => {
    console.log("Saving sale:", {
      customer,
      date,
      shippingAddress,
      discount,
      discountType,
      paymentMethod,
      accountName,
      paymentAmount,
      cart,
      payableAmount,
    });
    // Implement save logic here
    alert("Sale saved successfully!");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All data will be lost.")) {
      // Reset form
      setCustomer("Unknown");
      setDate(new Date().toISOString().split("T")[0]);
      setShippingAddress("");
      setDiscount(0);
      setDiscountType("None");
      setCategory("All Category");
      setSelectedProduct("");
      setPaymentMethod("");
      setAccountName("");
      setPaymentAmount(0);
      setOrderNote("");
      setShippingCharge(0);
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={classNames(
            "p-2 rounded-lg",
            "bg-linear-to-br from-blue-600 to-blue-800",
            "bg-linear-to-br from-blue-500 to-blue-600"
          )}>
            <ShoppingCart className="text-white" size={24} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${textColor}`}>Add wholesale order</h1>
            <p className={`text-sm ${subTextColor}`}>Create a new sales invoice</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border ${buttonSecondary} ${textColor}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSale}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-all duration-300 ${buttonPrimary}`}
          >
            Save Sale
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer & Product Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details Card */}
          <div className={`${cardBg} rounded-lg ${borderColor} border p-6`}>
            <h2 className={`text-lg font-semibold ${textColor} mb-4 flex items-center gap-2`}>
              <User size={20} className={info} />
              Customer Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Dropdown */}
              <div className="flex flex-col">
                <label className={`text-sm font-medium ${subTextColor} mb-2`}>
                  Customer *
                </label>
                <CustomSelect
                  value={customer}
                  onChange={setCustomer}
                  options={customerOptions}
                  placeholder="Select Customer"
                  icon={<User size={16} />}
                  theme={theme}
                  className="w-full"
                  label=""
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label className={`text-sm font-medium ${subTextColor} mb-2`}>
                  Date *
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${subTextColor}`} size={16} />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full pl-10 pr-3 py-2.5 ${inputBg} ${inputBorder} rounded-lg ${textColor} text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-4">
              <label className={`text-sm font-medium ${subTextColor} mb-2 flex items-center gap-2`}>
                <Truck size={16} />
                Shipping Address
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter shipping address..."
                rows={2}
                className={`w-full p-3 ${inputBg} ${inputBorder} rounded-lg ${textColor} text-sm outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Product Selection Card */}
          <div className={`${cardBg} rounded-lg ${borderColor} border p-6`}>
            <h2 className={`text-lg font-semibold ${textColor} mb-4 flex items-center gap-2`}>
              <Package size={20} className={success} />
              Product Selection
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Filter by Category */}
              <div className="flex flex-col">
                <label className={`text-sm font-medium ${subTextColor} mb-2`}>
                  Filter by Category
                </label>
                <CustomSelect
                  value={category}
                  onChange={setCategory}
                  options={categoryOptions}
                  placeholder="Select Category"
                  theme={theme}
                  className="w-full"
                  label=""
                />
              </div>

              {/* Select Product */}
              <div className="flex flex-col">
                <label className={`text-sm font-medium ${subTextColor} mb-2`}>
                  Select Product
                </label>
                <CustomSelect
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  options={productOptions}
                  placeholder="Select Product"
                  icon={<Search size={16} />}
                  theme={theme}
                  className="w-full"
                  label=""
                />
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={!selectedProduct}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm ${
                    !selectedProduct 
                      ? classNames("bg-gray-300 text-gray-500 cursor-not-allowed", "", "")
                      : `${buttonPrimary} text-white`
                  }`}
                >
                  <Plus size={16} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={classNames("", "bg-gray-800/50", "bg-gray-100")}>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        PRODUCT NAME <br />
                        <span className="font-normal">পণ্যের নাম</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        COMPANY <br />
                        <span className="font-normal">কোম্পানি</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        MRP <br />
                        <span className="font-normal">খুচরা মূল্য</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        UNIT QTY <br />
                        <span className="font-normal">ইউনিট</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        PCS | AVL QTY <br />
                        <span className="font-normal">পিস | মজুদ</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        FREE QTY <br />
                        <span className="font-normal">ফ্রি</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        DISCOUNT <br />
                        <span className="font-normal">ছাড়</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        SUBTOTAL <br />
                        <span className="font-normal">মোট</span>
                      </span>
                    </th>
                    <th className="py-3 px-4 text-left">
                      <span className={`text-xs font-semibold uppercase ${subTextColor}`}>
                        ACTION <br />
                        <span className="font-normal">অ্যাকশন</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className={`border-b ${borderLight} `}>
                      <td className="py-3 px-4">
                        <div className={`font-medium ${textColor}`}>{item.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`${subTextColor}`}>{item.company}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`font-medium ${textColor}`}>
                          ৳{item.mrp.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className={`w-16 p-1.5 text-center ${inputBg} ${inputBorder} rounded ${textColor} text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                          />
                          <span className={`text-xs ${subTextColor}`}>{item.unit}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`font-medium ${textColor}`}>{item.availableQty}</div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          defaultValue="0"
                          onChange={(e) => setCart(cart.map(p => 
                            p.id === item.id ? { ...p, freeQty: parseInt(e.target.value) || 0 } : p
                          ))}
                          className={`w-16 p-1.5 text-center ${inputBg} ${inputBorder} rounded ${textColor} text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="number"
                          min="0"
                          value={item.discount || 0}
                          onChange={(e) => handleUpdateDiscount(item.id, parseFloat(e.target.value) || 0)}
                          className={`w-20 p-1.5 ${inputBg} ${inputBorder} rounded ${textColor} text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className={`font-bold ${textColor}`}>
                          ৳{(item.subtotal - (item.discount || 0)).toFixed(2)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className={classNames(
                            "p-1.5 rounded-lg",
                            "text-red-400 hover:bg-red-500/20",
                            "text-red-600 hover:bg-red-100"
                          )}
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {cart.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <ShoppingCart size={48} className="opacity-30 mb-3" />
                          <p className={`text-lg font-medium ${subTextColor}`}>No products added</p>
                          <p className="text-sm">Select products to add to cart</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Payment & Summary */}
        <div className="space-y-6">
          {/* Discount Card */}
          <div className={`${cardBg} rounded-lg ${borderColor} border p-6`}>
            <h2 className={`text-lg font-semibold ${textColor} mb-4 flex items-center gap-2`}>
              <Tag size={20} className={classNames("", "text-purple-400", "text-purple-600")} />
              Discount & Charges
            </h2>
            
            <div className="space-y-4">
              {/* Discount on Grand Total */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${subTextColor}`}>
                  Discount On Grand Total
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className={`flex-1 p-2.5 ${inputBg} ${inputBorder} rounded-lg ${textColor} text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                    placeholder="Discount"
                  />
                  <CustomSelect
                    value={discountType}
                    onChange={setDiscountType}
                    options={discountTypeOptions}
                    placeholder="Discount Type"
                    icon={<Percent size={16} />}
                    theme={theme}
                    className="w-32"
                    label=""
                  />
                </div>
              </div>

              {/* Shipping & Other Charge */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${subTextColor}`}>
                  Shipping & Other Charge
                </label>
                <input
                  type="number"
                  min="0"
                  value={shippingCharge}
                  onChange={(e) => setShippingCharge(parseFloat(e.target.value) || 0)}
                  className={`w-full p-2.5 ${inputBg} ${inputBorder} rounded-lg ${textColor} text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className={`${cardBg} rounded-lg ${borderColor} border p-6`}>
            <h2 className={`text-lg font-semibold ${textColor} mb-4 flex items-center gap-2`}>
              <DollarSign size={20} className={success} />
              Payment Method
            </h2>
            
            <div className="space-y-4">
              {/* Payment Method */}
              <div className="flex flex-col">
                <label className={`text-sm font-medium ${subTextColor} mb-2`}>
                  Payment Method
                </label>
                <CustomSelect
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={paymentMethodOptions.map(option => ({
                    value: option.value,
                    label: option.label
                  }))}
                  placeholder="Select Payment Method"
                  theme={theme}
                  className="w-full"
                  label=""
                />
              </div>

              {/* Account Name */}
              <div className="flex flex-col">
                <label className={`text-sm font-medium ${subTextColor} mb-2`}>
                  Account Name
                </label>
                <CustomSelect
                  value={accountName}
                  onChange={setAccountName}
                  options={accountNameOptions}
                  placeholder="Select Account"
                  theme={theme}
                  className="w-full"
                  label=""
                />
              </div>

              {/* Payment Amount */}
              <div className="flex flex-col">
                <label className={`text-sm font-medium ${subTextColor} mb-2`}>
                  Payment Amount
                </label>
                <input
                  type="number"
                  min="0"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                  className={`w-full p-2.5 ${inputBg} ${inputBorder} rounded-lg ${textColor} text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                  placeholder="Amount"
                />
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className={`${cardBg} rounded-lg ${borderColor} border p-6`}>
            <h2 className={`text-lg font-semibold ${textColor} mb-4 flex items-center gap-2`}>
              <ShoppingCart size={20} className={warning} />
              Order Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${subTextColor}`}>SubTotal</span>
                <span className={`font-medium ${textColor}`}>৳{subTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${subTextColor}`}>Product Wise Discount</span>
                <span className={`font-medium ${success}`}>
                  -৳{productWiseDiscount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${subTextColor}`}>Discount On Grand Total</span>
                <span className={`font-medium ${success}`}>
                  -৳{grandTotalDiscount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${subTextColor}`}>Shipping & Other Charge</span>
                <span className={`font-medium ${textColor}`}>+৳{shippingAndOtherCharge.toFixed(2)}</span>
              </div>
              
              <div className={classNames("border-t pt-3", "border-gray-700", "border-gray-300")}>
                <div className="flex justify-between items-center">
                  <span className={`text-base font-semibold ${textColor}`}>Payable Amount</span>
                  <span className={`text-2xl font-bold ${info}`}>
                    ৳{payableAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Note */}
            <div className="mt-6">
              <label className={`text-sm font-medium ${subTextColor} mb-2 block`}>
                Order Note
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Add any special instructions..."
                rows={3}
                className={`w-full p-3 ${inputBg} ${inputBorder} rounded-lg ${textColor} text-sm outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSale;