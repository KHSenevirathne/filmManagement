import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="container mx-auto">
          <AdminMenu />

          <thead>
            <tr className="mb-[5rem]">
              <th className="text-left pl-1 font-bold text-[#831843]">ITEMS</th>
              <th className="text-left pl-1 font-bold text-[#831843]">ID</th>
              <th className="text-left pl-1 font-bold text-[#831843]">USER</th>
              <th className="text-left pl-1 font-bold text-[#831843]">DATA</th>
              <th className="text-left pl-1 font-bold text-[#831843]">TOTAL</th>
              <th className="text-left pl-1 font-bold text-[#831843]">PAID</th>
              <th className="text-left pl-1 font-bold text-[#831843]">DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td className="font-bold">{order._id}</td>

                <td className="font-bold">{order.user ? order.user.username : "N/A"}</td>

                <td className="font-bold">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td className="font-bold">Rs. {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-600 w-[6rem] rounded-full font-bold text-white">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full font-bold text-white">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-600 w-[6rem] rounded-full font-bold text-white">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full font-bold text-white">
                      Pending
                    </p>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-[#831843] text-back py-2 px-3 rounded-xl font-bold text-white hover:bg-pink-800">More</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
