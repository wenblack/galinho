import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartContextProvider } from "./contexts/CartContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { OrderContextProvider } from "./contexts/OrderContext";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <OrderContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </OrderContextProvider>
  </AuthContextProvider>,
);
