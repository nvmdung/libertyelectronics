// ... (your existing imports)
import classes from '../css/Product.module.css'
import { useNavigate } from 'react-router-dom';

function ProductItem({ laptop, addCart, getDetails }) {
  const navigate = useNavigate();
  const shortenProductName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name;
    } else {
      return name.substring(0, maxLength) + '...';
    }
  };
// Hàm để tính giá sau khi giảm giá
const calculateDiscountedPrice = (price, discount) => {
  return (price * (100 - discount)) / 100;
};

// Giả sử laptop.discount là phần trăm giảm giá
const discountedPrice = calculateDiscountedPrice(laptop.price, laptop.discount || 0);
  return (
    <div className={classes.containerboxes}>
      <div className={classes.productItem} onClick={() => {
        getDetails(laptop);
        navigate('/details');
      }}>
        <td><img src={laptop.image[0]} width="250px" alt={laptop.name} className={classes.productImage} /></td>
        <td>
        <div className={classes.productInfo}>
          <div className={classes.productName}>{shortenProductName(laptop.name, 50)}</div>
                 {/* Hiển thị giá sau khi giảm giá nếu có giảm giá */}
                 {laptop.discount ? (
              <div className={classes.productPrice}>
                <span className={classes.originalPrice}>${laptop.price}</span><br/>
                ${discountedPrice.toFixed(2)} (-{laptop.discount}%)
              </div>
            ) : (
              <div className={classes.productPrice}>${laptop.price}</div>
            )}
          <button className={classes.addToCart} onClick={() => addCart(laptop)}>Add to Cart</button>
        </div>
        </td>
      </div>
    </div>
  );
}


export default ProductItem;