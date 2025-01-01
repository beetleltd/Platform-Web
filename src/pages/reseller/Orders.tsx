import { useGetAllOrders } from "@/api/orders";
import FullPageLoader from "@/components/loaders/FullPageLoader";
import { useParams } from "react-router-dom";

const Orders = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, isLoading } = useGetAllOrders(orderId || "");
  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Orders;
