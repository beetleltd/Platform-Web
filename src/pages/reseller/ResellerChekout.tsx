import { useOrderPaymentMutation, useReserveOrderMutation } from "@/api/orders";
import PriceFormatter from "@/components/common/products/PriceFormatter";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import Button from "@/components/shared/Button";
import { useCartStore } from "@/hooks/useCartSore";
import { useFetchStoreData } from "@/hooks/useFetchStoreData";
import { useStoreData } from "@/store/storeData";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import StorefrontLayout from "../../components/layout/StoreFrontLayout";
import EmptyState from "@/components/common/Empty";

const ResellerCheckout = () => {
  const navigate = useNavigate();
  const { storeName } = useParams();
  const { cart: products, calculateSubtotal } = useCartStore();
  const { store } = useStoreData();
  const { isLoading: isStoreLoading, error: storeError } =
    useFetchStoreData(storeName);
  const { reserveOrder, isLoading: isReserving } = useReserveOrderMutation();
  const { orderPayment, isPaymentLoading } = useOrderPaymentMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  const DELIVERY_COST = calculateSubtotal() > 0 ? 1000 : 0;
  const GRAND_TOTAL = calculateSubtotal() + DELIVERY_COST;

  if (products.length === 0) {
    return (
      <StorefrontLayout>
        <div className="container mx-auto py-8 px-4">
          <EmptyState
            title="Your cart is empty"
            description="Looks like you haven’t added anything to your cart yet."
            actionLabel="Shop Now"
            onActionClick={() => navigate(`/${storeName}`)}
          />
        </div>
      </StorefrontLayout>
    );
  }
  if (isStoreLoading) return <FullPageLoader />;
  if (storeError) {
    navigate(-1);
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
      }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      if (!form[field]) {
        newErrors[field] = `${
          field === "fullName"
            ? "Full name"
            : field.charAt(0).toUpperCase() + field.slice(1)
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
          const payload = response?.data?.payload;
          if (payload) {
            orderPayment(
              {
                ...payload,
                callback_meta_tag: `${storeName}/orders/${payload?.metadata?.client_id}`,
              },
              {
                onSuccess: (response) => {
                  window.open(response?.data?.authorization_url, "_self");
                },
              }
            );
          }
        },
        onError: () => {
          setGlobalError("Failed to reserve your order. Please try again.");
        },
      });
    } catch {
      setGlobalError("An unexpected error occurred. Please try again later.");
    }
  };

  const renderOrderSummary = () => (
    <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Your Order</h2>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center py-2"
        >
          <div className="flex gap-x-3 items-center">
            <img
              src={
                product.medias[0]?.url ||
                product.backing_product?.medias[0]?.url
              }
              alt={product.backing_product?.name}
              className="w-20 h-10 object-cover"
            />
            <p>{product.backing_product?.name}</p>
          </div>
          <p className="text-sm flex gap-x-2 text-gray-700">
            {product.quantity} X{" "}
            <PriceFormatter price={product?.marked_price} />
          </p>
        </div>
      ))}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <PriceFormatter price={calculateSubtotal()} />
        </div>
        <div className="flex justify-between">
          <p>Delivery Cost</p>
          <PriceFormatter price={DELIVERY_COST} />
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <PriceFormatter price={GRAND_TOTAL} />
        </div>
      </div>
      <div className="mt-6">
        {globalError && <p className="text-red-500 mb-4">{globalError}</p>}
        <Button
          onClick={handleReserveOrder}
          disabled={isReserving || isPaymentLoading}
          isLoading={isReserving || isPaymentLoading}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="w-full lg:w-[60%] bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
      <form className="space-y-4">
        {Object.keys(form).map((field) => (
          <div key={field} className="space-y-2">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700"
            >
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
                errors[field] ? "border-red-500" : "border-gray-200"
              } rounded-md`}
              placeholder={`Enter your ${
                field === "fullName" ? "full name" : field.toLowerCase()
              }`}
              disabled={isReserving || isPaymentLoading}
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
          className="mb-4 text-gray-600 flex items-center gap-2 text-sm md:text-base"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack /> Go Back
        </button>
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="flex flex-wrap gap-6">
          {renderContactForm()}
          {renderOrderSummary()}
        </div>
      </div>
    </StorefrontLayout>
  );
};

export default ResellerCheckout;
