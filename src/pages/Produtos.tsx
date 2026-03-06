import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Produtos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to search without query to show all products
    navigate("/search", { replace: true });
  }, [navigate]);

  return null;
};

export default Produtos;
