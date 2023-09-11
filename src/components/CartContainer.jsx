import CartItem from "./CartItem"
import { useSelector, useDispatch } from "react-redux"
import { openModal } from "../features/modal/modalSlice"
import { FaArrowRotateRight } from "react-icons/fa6"
import { getCartItems } from "../features/cart/cartSlice"

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>My bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
          <div className="empty-btn">
            <button
              className="btn rotate-btn"
              onClick={() => {
                dispatch(getCartItems())
              }}
            >
              <FaArrowRotateRight />
            </button>
          </div>
        </header>
      </section>
    )
  }

  return (
    <section className="cart">
      <header>
        <h2>My bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => {
            dispatch(openModal())
          }}
        >
          clear cart
        </button>
        <br />
        <button
          className="btn rotate-btn"
          onClick={() => {
            dispatch(getCartItems())
          }}
        >
          <FaArrowRotateRight />
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
