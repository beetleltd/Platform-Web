import React, { useEffect } from "react";
import { useGetAllOrders } from "@/api/orders";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import { useParams, useNavigate } from "react-router-dom";
import PriceFormatter from "@/components/common/products/PriceFormatter";
import Container from "@/components/layout/Container";
import { IoArrowBack } from "react-icons/io5";
import { useCartStore } from "@/hooks/useCartSore";

const Orders = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: orders, isLoading } = useGetAllOrders(orderId || "");
  const { storeName } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <Container>
      <div className="p-4 lg:p-8 mx-auto min-h-dvh overflow-y-auto">
        <button
          onClick={() => navigate(`/${storeName}`)}
          className="text-xs text-gray-500 hover:text-gray-700 inline-flex items-center gap-x-2 mb-4"
        >
          <IoArrowBack />
          Back to Store
        </button>
        <h1 className="text-3xl font-semibold mb-4">Your Orders</h1>
        <p className="text-gray-500 mb-8">
          Check your email for more information on your orders.
        </p>
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order.id} className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order ID: {order.client_id}
                  </h2>
                  <p
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white transition-colors duration-300 ${
                      order.status === "confirmed"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {order.status === "confirmed" ? "Confirmed" : "Failed"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Customer: {order.customer.full_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Phone: {order.customer.phone_number}
                  </p>
                  <p className="text-sm text-gray-500">
                    Address: {order.customer.delivery_address}
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                {order.resales.map((resale) => (
                  <div
                    key={resale.resale_id}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={resale.product.medias[0]?.url}
                        alt={resale.product.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <p className="font-semibold">{resale.product.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {resale.quantity}
                        </p>
                        <p className="text-sm space-x-1 text-gray-500">
                          <span>Price per unit:</span>
                          <PriceFormatter price={resale.resale_marked_price} />
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-md text-gray-500">
                        Total:{" "}
                        <PriceFormatter
                          price={resale?.resale_marked_price * resale.quantity}
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Orders;
