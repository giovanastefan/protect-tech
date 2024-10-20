import './OrderRow.css';

export const OrderRow = ({ order }) => {
  const { orderId, orderDate, totalAmount, orderStatus } = order;

  const date = orderDate instanceof Date ? orderDate: new Date(orderDate);

  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedTotalPrice = totalAmount 
  ? Number(totalAmount).toFixed(2) 
  : "0.00";

  return (
    <tr>
      <td>#{orderId}</td>
      <td>{formattedDate}</td>
      <td>
        ${formattedTotalPrice}
      </td>
      <td>{orderStatus}</td>
      <td className="details">View Details</td>
    </tr>
  );
};
