import { createContext, useState, ReactNode } from "react"

type PizzaSizeType = {
  id: string
  flavours: number
  size: number
  slices: number
  text: string
}

type Pizza = {
  size: {
    id: string;
    text: string;
    slices: number
  };
  flavours: PizzaFlavourType[];
}

export type PizzaFlavourType = {
  id: string
  image: string
  name: string
  description: string
  price: {
    "8": number
    "4": number
    "1": number
  }
}

type PizzaOrderType = {
  item: {
    name: string
    image: string
    size: string
    slices: number
    value: number
  }[]
  total: number
}

type OrderContextProps = {
  pizzaSize: PizzaSizeType[]
  setPizzaSize: React.Dispatch<React.SetStateAction<PizzaSizeType[]>>
  pizzaFlavour: PizzaFlavourType[]
  chosenPizzas: Pizza[]
  setPizzaFlavour: (data: PizzaFlavourType[]) => void
  choosePizza: (data: Pizza) => void
  pizzaOrder: PizzaOrderType
  setPizzaOrder: React.Dispatch<React.SetStateAction<PizzaOrderType>>
}

type OrderContextProviderProps = {
  children: ReactNode
}

const OrderContext = createContext<OrderContextProps>({})

const OrderContextProvider = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState<PizzaSizeType[]>([])
  const [pizzaFlavour, setPizzaFlavour] = useState<PizzaFlavourType[]>([])
  const [chosenPizzas, setChosenPizzas] = useState<Pizza[]>([])

  const [pizzaOrder, setPizzaOrder] = useState({})

  function choosePizza(data: Pizza) {
    setChosenPizzas((prevState) => [...prevState, data]);
  }

  return (
    <OrderContext.Provider
      value={{
        pizzaSize,
        setPizzaSize,
        pizzaFlavour,
        setPizzaFlavour,
        chosenPizzas,
        choosePizza,
        pizzaOrder,
        setPizzaOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export { OrderContextProvider }
export default OrderContext
