import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@/types";

const fetchOrders = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const res = await fetch(
    `${baseUrl}/api/orders`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    console.error('Failed to fetch orders');
    return [];
  }

  const data: OrderType[] = await res.json();
  return data;
};

const OrdersPage = async () => {
  const orders = await fetchOrders();

  if (!orders) {
    return <div className="">No orders found!</div>;
  }

  console.log(orders);
  return (
    <div className="">
      <h1 className="text-2xl my-4 font-medium">Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="flex items-center mb-4">
            <div className="w-1/4">
              <span className="font-medium text-sm text-gray-500">
                Order ID
              </span>
              <p className="truncate">{order.id}</p>
            </div>
            <div className="w-1/12">
              <span className="font-medium text-sm text-gray-500">Total</span>
              <p>${(order.total / 100).toFixed(2)}</p>
            </div>
            <div className="w-1/12">
              <span className="font-medium text-sm text-gray-500">Status</span>
              <p className="capitalize">{order.status.toLowerCase()}</p>
            </div>
            <div className="w-1/8">
              <span className="font-medium text-sm text-gray-500">Date</span>
              <p>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US")
                  : "-"}
              </p>
            </div>
            <div className="">
              <span className="font-medium text-sm text-gray-500">
                Products
              </span>
              <p>{(order.items as any[])?.map((item: any) => item.name).join(", ") || "-"}</p>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
