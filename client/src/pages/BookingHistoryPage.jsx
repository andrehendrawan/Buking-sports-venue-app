import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrders } from "../store/appSlice";

export default function BookingHistoryPage() {
  const params = useParams();
  const { orders } = useSelector((state) => state.appReducer);
  console.log(orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(params));
  }, []);
  return (
    <>
      <div className="container px-5 py-28 mx-auto my-5">
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Venue</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Booking Date</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Order Id</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Paid Date</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status Payment</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {orders &&
                orders.map((order) => {
                  return (
                    <>
                      <tr key={order.id}>
                        <td key={order.User.fullName} className="py-4 px-6 border-b border-gray-200">
                          {order.User.fullName}
                        </td>
                        <td key={order.Venue.name} className="py-4 px-6 border-b border-gray-200 truncate">
                          {order.Venue.name}
                        </td>
                        <td key={order.bookingDate} className="py-4 px-6 border-b border-gray-200">
                          {order.bookingDate}
                        </td>
                        <td key={order.orderId} className="py-4 px-6 border-b border-gray-200">
                          {order.orderId}
                        </td>
                        <td key={order.paidDate} className="py-4 px-6 border-b border-gray-200">
                          {order.paidDate}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          {order.statusPayment === "pending" && <span className="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs">Pending</span>}
                          {order.statusPayment === "failure" && <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Failure</span>}
                          {order.statusPayment === "paid" && <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Paid</span>}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
