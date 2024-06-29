import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const exchangeRate = 400;

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    const totalPriceInUSD = (order.totalPrice / exchangeRate).toFixed(2);
  
    return actions.order
      .create({
        purchase_units: [{ amount: { value: totalPriceInUSD } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border border-black gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2 border-black">
                  <tr>
                    <th className="p-2 font-bold text-xl text-[#831843]">Image</th>
                    <th className="p-2 font-bold text-xl text-[#831843]">Product</th>
                    <th className="p-2 text-center font-bold text-xl text-[#831843]">Quantity</th>
                    <th className="p-2 font-bold text-xl text-[#831843]">Unit Price</th>
                    <th className="p-2 font-bold text-xl text-[#831843]">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 object-cover"
                        />
                      </td>

                      <td className="p-2 font-bold">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center font-bold">{item.qty}</td>
                      <td className="p-2 text-center font-bold">{item.price}</td>
                      <td className="p-2 text-center font-bold">
                        Rs. {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2 text-[#831843]">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem] text-[#831843]">Order Summary</h2>
        <div className="flex justify-between mb-2 font-bold">
          <span>Items</span>
          <span>Rs. {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2 font-bold">
          <span>Shipping</span>
          <span>Rs. {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2 font-bold">
          <span>Tax</span>
          <span>Rs. {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2 font-bold">
          <span>Total</span>
          <span>Rs. {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-pink-600 text-white w-full py-2 font-bold text-white transform transition-transform duration-300 hover:bg-pink-700 hover:scale-105 rounded-3xl"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
