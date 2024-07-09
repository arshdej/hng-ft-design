import usePersistedState from "@/hooks/usePersistedState";
import { createContext, ReactNode, useContext } from "react";

interface CartItem extends Record<string, any> {}

interface ILoginData {
  userId?: string;
  username?: string;
  isSignedIn?: boolean;
}

interface RootContextState {
  loginState?: ILoginData;
  cartState: Array<CartItem>;
  isLoadingLogin: boolean;
  isLoadingCarts: boolean;
  handleLogin: (data: ILoginData) => void;
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
  cartPlus: (itemId: string) => void;
  cartMinus: (itemId: string) => void;
}

const initialState: RootContextState = {
  loginState: { isSignedIn: true, userId: "hng", username: "Abdul.tsx" },
  isLoadingLogin: false,
  cartState: [],
  isLoadingCarts: false,
  handleLogin: (data: ILoginData) => {},
  addToCart: (_r: any) => {},
  removeFromCart: (_id: string) => {},
  cartPlus: (_id: string) => {},
  cartMinus: (_id: string) => {},
};

export const RootContext = createContext<RootContextState>(initialState);

export const RootProvider = ({ children }: { children: ReactNode }) => {
  const {
    loading: isLoadingLogin,
    state: loginState,
    updateState: setLoginState,
  } = usePersistedState({
    key: "hng-timbu-auth",
    initialState: initialState.loginState!,
  });
  const {
    loading: isLoadingCarts,
    state: cartState,
    updateState: setCartState,
  } = usePersistedState<{ items: CartItem[] }>({
    key: "hng-timbu-carts",
    initialState: { items: initialState.cartState! || [] },
  });

  const handleLogin = (data: ILoginData) => {
    if (data) {
      setLoginState(data);
    }
  };

  const addToCart = (item: any) =>
    setCartState({
      items: (cartState?.items || []).concat({ ...item, qty: 1 }),
    });

  const removeFromCart = (itemId: string) =>
    setCartState({
      items: cartState?.items?.filter((item) => item?.id !== itemId),
    });

  const cartPlus = (id: string) => {
    const prevItems = cartState.items;
    const newItems = prevItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );

    setCartState({ items: newItems });
  };

  const cartMinus = (id: string) => {
    const prevItems = cartState.items;
    const newItems = prevItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty - 1 } : item
    );
    setCartState({ items: newItems.filter((f) => f.qty > 0) });
  };

  const value = {
    isLoadingLogin,
    loginState,
    isLoadingCarts,
    cartState: cartState?.items as CartItem[],
    handleLogin,
    addToCart,
    removeFromCart,
    cartPlus,
    cartMinus,
  };

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRootContext = (): RootContextState => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("useRootContext must be used within a RootProvider");
  }

  return context;
};
