import { createContext, useState, useEffect } from "react";

const ClickContext = createContext(0);

export const ClickProvider = ({ children }) => {
  const [count, setCount] = useState(null);
  const update = (amount) => setCount(amount);

  useEffect(() => {
    console.log("FROM STATE", count);
  }, [count]);

  return (
    <ClickContext.Provider value={[count, update]}>
      {children}
    </ClickContext.Provider>
  );
};

export default ClickContext;
