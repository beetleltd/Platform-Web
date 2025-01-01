import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"; // Update this import based on your project structure
import { useCartStore } from "../../store/cart";
import StorefrontLayout from "../../components/layout/StoreFrontLayout";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useConfirmOrderMutation, useReserveOrderMutation } from "@/api/orders";
import { useStoreData } from "@/store/storeData";
import { useFetchStoreData } from "@/hooks/useFetchStoreData";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import Button from "@/components/shared/Button";
import PriceFormatter from "@/components/common/products/PriceFormatter";

const ResellerCheckout = () => {
  const navigate = useNavigate();
  const { storeName } = useParams();
  const { cart: products, calculateSubtotal, clearCart } = useCartStore();
  const { store } = useStoreData();
  const { isLoading: isStoreLoading, error: storeError } =
    useFetchStoreData(storeName);
  const { confirmOrder, isLoading: isConfirmingOrder } =
    useConfirmOrderMutation();
  const {
    reserveOrder,
    isLoading: isReserving,
    reservationData,
  } = useReserveOrderMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderToken, setOrderToken] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const PAYSTACK_PUBLIC_KEY =
    "pk_test_bad5591d54885a13bc3c3322e809efe6d7ce9950";
  const DELIVERY_COST = calculateSubtotal() > 0 ? 1000 : 0;
  const GRAND_TOTAL = calculateSubtotal() + DELIVERY_COST;
  const CURRENCY = "NGN";

  if (isStoreLoading || isConfirmingOrder) return <FullPageLoader />;
  if (storeError) {
    navigate(-1);
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
      }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: removed, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      if (!form[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReserveOrder = async () => {
    if (!validateForm()) return;

    const orderData = {
      entity_type: "reseller",
      entity_type_id: store?.id,
      order_customer: {
        full_name: form.fullName,
        email: form.email,
        phone_number: form.phone,
        delivery_address: form.address,
      },
      order_type: "resale",
      orders: products.map((product) => ({
        order_type_id: product.id,
        quantity: product.quantity,
        order_entity_type_backed_id: product.backing_product?.business_id,
      })),
    };

    try {
      await reserveOrder(orderData, {
        onSuccess: (response) => {
          setOrder(response?.data?.orders);
          setOrderToken(response?.data?.token);
          setReservationSuccess(true);
        },
        onError: (err) => {
          setErrors({
            global: "Failed to reserve your order. Please try again.",
          });
          console.error("Reservation error:", err);
        },
      });
    } catch (err) {
      setErrors({
        global: "An unexpected error occurred. Please try again later.",
      });
      console.error("Unexpected reservation error:", err);
    }
  };

  const handlePaymentSuccess = async (reference) => {
    const confirmOrderData = {
      event: "order.confirmation",
      data: {
        payment_provider: "paystack",
        payment_provider_transaction_reference_id: reference?.reference || "",
        payment_status: "success",
      },
      meta_data: order,
    };

    try {
      await confirmOrder(
        { orderData: confirmOrderData, orderToken },
        {
          onSuccess: () => {
            setPaymentSuccess(true);
            clearCart();
            setForm({
              fullName: "",
              email: "",
              phone: "",
              address: "",
            });
          },
        }
      );
      alert("Payment successful!");
    } catch (err) {
      setErrors({
        global: "Failed to confirm your order. Please contact support.",
      });
      console.error("Order confirmation error:", err);
    }
  };

  const paystackProps = {
    email: form.email,
    amount: GRAND_TOTAL * 100, // Convert to kobo
    currency: CURRENCY,
    publicKey: PAYSTACK_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => console.log("Payment process closed."),
  };

  const renderOrderSummary = () => (
    <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Your Order</h2>
      {products.map((product) => (
        <div key={product.id} className="flex justify-between items-start py-2">
          <div className="flex gap-x-3">
            <img
              src={
                product.medias[0]?.url ||
                product.backing_product?.medias[0]?.url
              }
              alt={product.backing_product?.name}
              className="w-20 h-10"
            />
            <div>
              <p>{product.backing_product?.name}</p>
              <p className="text-xs text-gray-500">{product.quantity} items</p>
            </div>
          </div>
          <p className="text-sm">
            <PriceFormatter price={product.marked_price} />
          </p>
        </div>
      ))}

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="text-sm">
            <PriceFormatter price={calculateSubtotal()} />
          </p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Cost</p>
          <p className="text-sm">
            <PriceFormatter price={DELIVERY_COST} />
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <PriceFormatter price={GRAND_TOTAL} />
        </div>
      </div>

      <div className="mt-6">
        {errors.global && <p className="text-red-500 mb-4">{errors.global}</p>}
        <Button onClick={handleReserveOrder} disabled={isReserving}>
          {isReserving ? "Reserving Order..." : "Reserve and Pay"}
        </Button>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="w-full lg:w-[60%] bg-white border-2 border-gray-100 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
      <form className="space-y-4">
        {Object.keys(form).map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium">
              {field === "fullName"
                ? "Full Name"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              id={field}
              value={form[field]}
              onChange={handleInputChange}
              className={`block w-full p-2 border ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              placeholder={`Enter your ${field}`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
      </form>
    </div>
  );

  return (
    <StorefrontLayout>
      <div className="container mx-auto py-8 px-4">
        <button
          className="mb-4 text-gray-600 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack /> Go Back
        </button>
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="flex flex-wrap gap-6">
          {renderContactForm()}
          {renderOrderSummary()}
        </div>

        <Dialog
          open={reservationSuccess}
          onOpenChange={(isOpen) => !isOpen && setReservationSuccess(false)}
        >
          <DialogContent className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414 0L9 11.586 7.707 10.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <DialogTitle className="text-lg font-bold text-center mb-2">
              Order Reserved Successfully!
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 text-center mb-6">
              Your order has been reserved. Proceed to make payment to complete
              your purchase.
            </DialogDescription>
            <div className="mt-4 flex justify-center">
              <Button className="w-full max-w-xs flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a5 5 0 1010 0A5 5 0 005 10zm7-2a1 1 0 10-2 0v1a1 1 0 102 0V8zm0 3a1 1 0 10-2 0 1 1 0 102 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <PaystackButton {...paystackProps} />
              </Button>
            </div>
            <DialogClose asChild>
              <button className="mt-6 w-full max-w-xs mx-auto block text-center text-blue-500 hover:underline text-sm">
                Close
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Dialog
          open={paymentSuccess}
          onOpenChange={(isOpen) => !isOpen && setPaymentSuccess(false)}
        >
          <DialogContent className="max-w-lg mx-auto p-6 rounded-lg shadow-lg bg-white">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414 0L9 11.586 7.707 10.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <DialogTitle className="text-lg font-bold text-center mb-2">
              Payment Successful!
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 text-center mb-6">
              Thank you for your payment. Your order is confirmed.
            </DialogDescription>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  Order ID: <strong>#12345</strong>
                </p>
                <p>
                  {/* Transaction Ref: <strong>{reference?.reference}</strong> */}
                </p>
                <p>
                  Total Paid: <strong>₦{GRAND_TOTAL}</strong>
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  className="!text-reseller-primary !shadow-none"
                  onClick={() =>
                    navigate(`/${store?.username}/orders/${order?.id}`)
                  }
                  variant="outline"
                >
                  View My Orders
                </Button>
                <Button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => navigate(`/${store?.username}`)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StorefrontLayout>
  );
};

export default ResellerCheckout;
