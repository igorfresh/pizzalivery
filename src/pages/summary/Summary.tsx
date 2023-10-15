import { useContext, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { Layout } from "../../components/layout/Layout"

import { routes } from "../../routes"

import OrderContext from "../../contexts/OrderContext"

import { Title } from "../../components/title/Title"
import { Button } from "../../components/button/Button"

import { convertToCurrency } from "../../helpers/convertToCurrency"

import {
  SummaryActionWrapper,
  SummaryAmount,
  SummaryContentWrapper,
  SummaryDescription,
  SummaryDetails,
  SummaryImage,
  SummaryPrice,
  SummaryTitle,
} from "./Summary.style"

export default function Summary() {
  const navigate = useNavigate()

  const { setPizzaOrder, chosenPizzas, setPizzaSize, setPizzaFlavour } = useContext(OrderContext)

  const totalAmount = chosenPizzas.reduce((acc, pizza) => {
    return acc + pizza.flavours[0].price[pizza.size.slices]
  }, 0)

  const handleChooseMorePizzas = () => {
    setPizzaFlavour([])
    setPizzaSize([])

    navigate(routes.pizzaSize)
  };

  const handleBack = () => {
    navigate(routes.pizzaFlavour)
  }

  const handleNext = () => {
    const payload = {
      item: chosenPizzas.map((pizza) => {
        return {
          name: pizza.flavours.map(item => item.name).join(pizza.flavours.length > 1 ? ' | ' : ''),
          image: pizza.flavours[0].image,
          size: pizza.size.text,
          slices: pizza.size.slices,
          value: pizza.flavours[0].price[pizza.size.slices]
        }
      }),
      total: totalAmount,
    }

    setPizzaOrder(payload)
    navigate(routes.checkout)
  }

  useEffect(() => {
    if (chosenPizzas.length < 1) {
      return navigate(routes.home)
    }
  }, [])

  return (
    <Layout>
      <Title tabIndex={0}>Resumo do pedido</Title>
      <SummaryContentWrapper>
        {chosenPizzas.map((pizza, index) => {
          return (
            <SummaryDetails key={index}>
              <SummaryImage src={pizza.flavours[0].image} alt="" />
              <SummaryTitle>
                {pizza.flavours.map(item => item.name).join(pizza.flavours.length > 1 ? ' | ' : '')}
              </SummaryTitle>
              <SummaryDescription>
                {pizza.size.text} {`(${pizza.size.slices}) pedaços`}
              </SummaryDescription>
              <SummaryPrice>{convertToCurrency(pizza.flavours[0].price[pizza.size.slices])}</SummaryPrice>
            </SummaryDetails>
          )
        })}

        <SummaryAmount>
          <SummaryPrice>{convertToCurrency(totalAmount)}</SummaryPrice>
        </SummaryAmount>
      </SummaryContentWrapper>

      <SummaryActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>

        <div>
          <Button onClick={handleChooseMorePizzas}>Escolher mais pizzas</Button>
          <Button onClick={handleNext}>Ir para o pagamento</Button>
        </div>
      </SummaryActionWrapper>
    </Layout>
  )
}
