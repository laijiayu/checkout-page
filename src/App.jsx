import { useEffect } from "react"
import CartContainer from "./components/CartContainer"
import Navbar from "./components/Navbar"
import Modal from "./components/Modal"
import { useSelector, useDispatch } from "react-redux"
import { calculateTotals } from "./features/cart/cartSlice"
import { store } from "./store"

function App() {
  const { cartItems } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
