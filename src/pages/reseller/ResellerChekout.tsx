import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
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
  const { cart: products, calculateSubtotal: subtotal } = useCartStore();
  const { store } = useStoreData();
  const { isLoading: isStoreLoading, error: storeError } =
    useFetchStoreData(storeName);
  const { confirmOrder, isLoading: isConfirmingOrder } =
    useConfirmOrderMutation();
  const [order, setOrder] = useState([]);
  const [orderToken, setOrderToken] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const {
    reserveOrder,
    isLoading: isReserving,
    reservationData,
  } = useReserveOrderMutation();

  const PAYSTACK_PUBLIC_KEY =
    "pk_test_bad5591d54885a13bc3c3322e809efe6d7ce9950";
  const DELIVERY_COST = subtotal() > 0 ? 1000 : 0;
  const GRAND_TOTAL = subtotal() + DELIVERY_COST;
  const CURRENCY = "NGN";

  if (isStoreLoading || isConfirmingOrder) return <FullPageLoader />;
  if (storeError) navigate(-1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) validateForm(); // Revalidate on change
  };

  const validateForm = () => {
    const { fullName, email, phone, address } = form;
    if (!fullName || !email || !phone || !address) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    return true;
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
      reserveOrder(orderData, {
        onSuccess: (response) => {
          console.log("Reservation successful:", response);
          setOrder(response?.data?.orders);
          setOrderToken(response?.data?.token);
          setReservationSuccess(true);
          console.log(order);
        },
        onError: (error) => {
          setError("Failed to reserve your order. Please try again.");
          console.error("Reservation error:", error);
        },
      });
    } catch (err) {
      setError("Failed to reserve your order. Please try again.");
      console.error("Reservation error:", err);
    }
  };

  const paystackProps = {
    email: form.email,
    amount: GRAND_TOTAL * 100, // Convert to kobo
    currency: CURRENCY,
    publicKey: PAYSTACK_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: async (reference: any) => {
      const confirmOrderData = {
        event: "order.confirmation",
        data: {
          payment_provider: "paystack",
          payment_provider_transaction_reference_id: reference?.reference || "",
          payment_status: "success",
        },
        meta_data: order,
      };
      await confirmOrder({
        orderData: confirmOrderData,
        orderToken: orderToken,
      }).unwrap();
      alert("Payment successful!");
      console.log("Payment successful:", reference);
    },
    onClose: () => console.log("Payment process closed."),
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

        <h1 className="text-3xl font-semibold mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">
          Fill in your details to complete the checkout process.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information */}
          <div className="w-full lg:w-[60%] bg-white border-2 border-gray-100 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <form className="space-y-4">
              {["fullName", "email", "phone", "address"].map((field) => (
                <div key={field} className="space-y-2">
                  <label htmlFor={field} className="block text-sm font-medium">
                    {field === "fullName"
                      ? "Full Name"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
            </form>
          </div>

          {/* Order Summary */}
          <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Your Order</h2>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-start py-2"
              >
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
                    <p className="text-xs text-gray-500">
                      {product.quantity} items
                    </p>
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
                  <PriceFormatter price={subtotal()} />
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
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {!reservationSuccess && (
                <Button onClick={handleReserveOrder} disabled={isReserving}>
                  {isReserving ? "Reserving Order..." : "Reserve and Pay"}
                </Button>
              )}

              {reservationSuccess && (
                <Button>
                  <PaystackButton {...paystackProps} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
};

export default ResellerCheckout;
