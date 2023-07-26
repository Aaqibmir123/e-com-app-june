import { Children, createContext, useState, useEffect } from "react";
const TokenContext = createContext({
  login: (token, emal) => {},
  logout: () => {},
  isLoggined: () => {},
  addItem: (item) => {},
  removeItem: (id) => {},
  increaseQuantity: (id) => {},
  decreaseQuantity: (id) => {},
});

const TokenStore = ({ children }) => {
  const [products, setproducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    // Update localStorage when token changes
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  const LoginHandler = (token, emal) => {
    setToken(token);
  };

  const LogoutHandler = () => {
    setToken(null);
  };

  const isLoggined = !!token;

  //add to cart

  const AddItemHandler = (item) => {
    // Check if the product already exists in the cart
    const existingProductIndex = products.findIndex((p) => p.id === item.id);

    if (existingProductIndex !== -1) {
      // If the product already exists, update its quantity and price
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity += 1;
      updatedProducts[existingProductIndex].totalPrice =
        updatedProducts[existingProductIndex].quantity *
        updatedProducts[existingProductIndex].price;
      setproducts(updatedProducts);
    } else {
      // If the product does not exist, add it to the cart with quantity 1
      setproducts((prevItems) => [
        ...prevItems,
        {
          ...item,
          quantity: 1,
          totalPrice: item.price,
        },
      ]);
    }
  };

  const RemoveHandler = (id) => {
    const filterData = products.filter((productId) => productId.id !== id);
    console.log(filterData, "item removed");
    setproducts(filterData);
  };

  const increaseQuantityHandler = (id) => {
    setproducts((preproducts) => {
      return preproducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    });
  };

  const decreaseQuantityHandler = (id) => {
    setproducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

      // Remove the product from cart if its quantity becomes less than 1
      return updatedProducts.filter((product) => product.quantity >= 1);
      setproducts(updatedProducts);
    });
  };

  const ContextValue = {
    login: LoginHandler,
    logout: LogoutHandler,
    isLoggined: isLoggined,
    addItem: AddItemHandler,
    removeItem: RemoveHandler,
    increaseQuantity: increaseQuantityHandler,
    decreaseQuantity: decreaseQuantityHandler,
    products,
  };

  return (
    <TokenContext.Provider value={ContextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenStore };
