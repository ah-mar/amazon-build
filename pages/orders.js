import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import { db } from "../firebase";
import moment from "moment";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Order from "../components/Order";
import orderList from "../list";

function Orders({ orders }) {
  

  const { data: session, status } = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orderList.length} Orders</h2>
        ) : (
          <h2>Please sign to see your orders.</h2>
        )}

        <div className="mt-5 space-y-4">
          {session && orders?.map((order) => (
            <Order key={order?.id} order={order} />
          ))}
        </div>
        {/* Use this static data to limit firebase query consumption */}
    {/* <div className="mt-5 space-y-4">
        {session &&
        orderList?.map((order) => <Order key={order?.id} order={order} />)}
    </div> */}
      </main>
    </div>
  );
}
export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  //from firebase db

  const postsRef = collection(db, "users", session.user.email, "orders");
  const q = query(postsRef, orderBy("timestamp", "desc"));
  const stripeOrders = await getDocs(q);

  //Stripe Orders - https://stripe.com/docs/api/checkout/sessions/line_items
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
