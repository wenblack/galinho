import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartContextProvider } from "./contexts/CartContext";
import { AuthContextProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </AuthContextProvider>,
);
