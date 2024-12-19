import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useCartStore } from "../../store/cart";
import StorefrontLayout from "../../components/layout/StoreFrontLayout";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ResellerCheckout = () => {
  // State for form inputs
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const { cart: products, calculateSubtotal: subtotal } = useCartStore();

  // Paystack configurations
  const publicKey = "pk_test_bad5591d54885a13bc3c3322e809efe6d7ce9950"; // Replace with your public key
  const amount = subtotal() * 100; // Amount in kobo (N850,000)
  const currency = "NGN";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateForm();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.fullName || !form.email || !form.phone || !form.address) {
      setError("All fields are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSuccess = (reference: any) => {
    console.log("Payment successful:", reference);
    alert("Payment Successful!");
  };

  const handleClose = () => {
    console.log("Payment closed");
  };

  const componentProps = {
    email: form.email,
    amount: amount + 1000 * 100,
    currency,
    publicKey,
    text: "Pay now",
    onSuccess: handleSuccess,
    onClose: handleClose,
  };

  return (
    <StorefrontLayout>
      <div className="p-4 lg:p-8 mx-auto min-h-dvh">
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-gray-500 hover:text-gray-700 inline-flex items-center gap-x-2"
        >
          <BiArrowBack />
          Go Back
        </button>
        {/* Header */}
        <h1 className="text-3xl font-semibold mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">
          Please fill in the information below to complete the checkout process
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information Form */}
          <div className="w-[60%] bg-white border-2 border-gray-100 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <hr className="py-5" />

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium">
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 bg-gray-100 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium">
                  Delivery address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Your Order</h2>
            {products.map((product) => (
              <div className="space-y-4 py-2">
                <div className="flex justify-between items-start">
                  <div className="flex gap-x-3">
                    <img
                      src={
                        product.medias[0]?.url ||
                        product.products[0]?.medias[0]?.url
                      }
                      alt={product.products[0]?.name}
                      className="w-20 h-10"
                    />
                    <div className="space-y-1">
                      <p>{product.products[0]?.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.quantity} items
                      </p>
                    </div>
                  </div>

                  <p>₦{product.marked_price}</p>
                </div>
              </div>
            ))}

            <hr className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>₦{subtotal()}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery cost</p>
                <p>₦1000</p>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <p>Grand total</p>
              <p>₦{subtotal() + 1000}</p>
            </div>

            <div className="mt-6">
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {/* Paystack Button */}
              <PaystackButton
                {...componentProps}
                className="w-full bg-reseller-primary text-white py-2 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
};

export default ResellerCheckout;
