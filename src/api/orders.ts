import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useReserveOrderMutation = () => {
  const reserveOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await api.post("/v1/orders/checkout", orderData);
      return response.data.data;
    },
    onSuccess: (response) => {
      return response;
    },
    onError: () => {},
  });

  const {
    mutate: reserveOrder,
    isPending: isLoading,
    data: reservationData,
  } = reserveOrderMutation;

  return { reserveOrder, isLoading, reservationData };
};

export const useConfirmOrderMutation = () => {
  const confirmOrderMutation = useMutation({
    mutationFn: async ({
      orderData,
      orderToken,
    }: {
      orderData: any;
      orderToken: string;
    }) => {
      const response = await api.post("/v1/webhook/confirm-order", orderData, {
        headers: {
          "X-Webhook-Token": orderToken,
        },
      });
      return response.data;
    },
    onSuccess: () => {},
    onError: () => {},
  });
  const { mutate: confirmOrder, isPending: isLoading } = confirmOrderMutation;
  return { confirmOrder, isLoading };
};
