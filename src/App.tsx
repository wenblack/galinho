import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import SearchResults from "./pages/SearchResults";
import Category from "./pages/Category";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Order from "./pages/Order";
import NossaHistoria from "./pages/NossaHistoria";
import Contato from "./pages/Contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/order" element={<Order />} />
          <Route path="/nossa-historia" element={<NossaHistoria />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
