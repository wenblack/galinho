import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartContextProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")!).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>,
);
