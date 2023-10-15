import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import { Layout } from "../../components/layout/Layout"
import { routes } from "../../routes"
import OrderContext, { PizzaFlavourType } from "../../contexts/OrderContext"

import Mussarela from "../../assets/pizza-flavours/mucarela.png"
import ChickenWithCheese from "../../assets/pizza-flavours/frango-catupiry.png"
import Margherita from "../../assets/pizza-flavours/margherita.png"
import Lusa from "../../assets/pizza-flavours/portuguesa.png"

import { convertToCurrency } from "../../helpers/convertToCurrency"

import {
  FlavourActionWrapper,
  FlavourCard,
  FlavourCardDescription,
  FlavourCardImage,
  FlavourCardPrice,
  FlavourCardTitle,
  FlavourContentWrapper,
} from "./Flavours.styles"
import { Title } from "../../components/title/Title"

export default function Flavours() {
  const navigate = useNavigate()
  const { pizzaSize, setPizzaFlavour, choosePizza } = useContext(OrderContext)
  
  const [flavourId, setflavourId] = useState<string[]>([])

  const flavoursOptions = [
    {
      id: "10",
      image: Mussarela,
      name: "Mussarela",
      description:
        "Muçarela especial fresca, finalizada com orégano e azeitonas portuguesas.",
      price: {
        "8": 71,
        "4": 35.5,
        "1": 18,
      },
    },
    {
      id: "11",
      image: ChickenWithCheese,
      name: "Frango com catupiry",
      description:
        "Peito de frango cozido, desfiado e refogado em azeite de oliva e temperos naturais, anéis de cebola sobre base de muçarela especial, bacon em cubos e Catupiry® gratinado. É finalizada com orégano.",
      price: {
        "8": 95,
        "4": 47.5,
        "1": 24,
      },
    },
    {
      id: "12",
      image: Margherita,
      name: "Margherita",
      description:
        "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
      price: {
        "8": 90,
        "4": 45,
        "1": 22.5,
      },
    },
    {
      id: "13",
      image: Lusa,
      name: "Portuguesa",
      description:
        "Clássica pizza, leva presunto magro, cebola, palmito e ervilha sobre base de muçarela fresca. Finalizada com cobertura de ovos, orégano e azeitonas portuguesas. ",
      price: {
        "8": 93,
        "4": 46.5,
        "1": 23.5,
      },
    },
  ]

  const getPizzaFlavour = (id: string) => {
    return flavoursOptions.find((flavour) => flavour.id === id)
  }

  const handleClick = (selectedFlavour: string) => {
    if (pizzaSize[0].flavours === 2) {
      setflavourId((prevState) => {
        const alreadySelected = prevState.includes(selectedFlavour);
  
        if (alreadySelected) {
          return prevState.filter((item) => item !== selectedFlavour);
        }
  
        if (prevState.length === 2) {
          return prevState;
        }
  
        return [...prevState, selectedFlavour];
      });

      return
    }

    setflavourId([selectedFlavour])
  }

  const handleBack = () => {
    navigate(routes.pizzaSize)
  }

  const handleNext = () => {
    const selectedFlavours: PizzaFlavourType[] = []

    flavourId.forEach((item) => {
      const flavour = getPizzaFlavour(item)
      if (flavour) selectedFlavours.push(flavour)
    })

    choosePizza({
      size: pizzaSize[0],
      flavours: selectedFlavours,
    })
    
    setPizzaFlavour(selectedFlavours)
    navigate(routes.summary)
  }

  useEffect(() => {
    if (pizzaSize[0].flavours === 2) {
      document.getElementsByClassName("title_sabores")[0].innerHTML = "Agora escolha os dois sabor da sua pizza"
    }
  }, [])

  return (
    <Layout>
      <Title tabIndex={0} className="title_sabores">Agora escolha o sabor da sua pizza</Title>
      <FlavourContentWrapper>
        {flavoursOptions.map(({ id, image, name, description, price }) => {
          return (
            <FlavourCard key={id} selected={flavourId.includes(id)}>
              <FlavourCardImage src={image} alt={name} />
              <FlavourCardTitle>{name}</FlavourCardTitle>
              <FlavourCardDescription>{description}</FlavourCardDescription>
              <FlavourCardPrice>
                {convertToCurrency(price[pizzaSize[0]?.slices])}
              </FlavourCardPrice>
              <Button onClick={() => handleClick(id)}>
                Selecionar
              </Button>
            </FlavourCard>
          )
        })}
      </FlavourContentWrapper>

      <FlavourActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Escolha o sabor</Button>
      </FlavourActionWrapper>
    </Layout>
  )
}
