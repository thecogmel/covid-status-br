import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType
} from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import Image from 'next/image'
import { Container, Stack } from 'react-bootstrap'
import { BiPlusMedical } from 'react-icons/bi'
import { FaSkullCrossbones } from 'react-icons/fa'

import {
  ContainerDocument,
  DataDiv,
  FooterContainer
} from '../styles/pages/styles'
import covidImage from '../assets/covid-un.svg'
import brazilFlag from '../assets/brazil.svg'

type Props = {
  country: string
  code: string
  confirmed: number
  recovered: number
  critical: number
  deaths: number
  latitude: number
  longitude: number
  lastChange: string
  lastUpdate: string
}

const Home: NextPage = ({
  data,
  notFound
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const date = new Date(data.lastUpdate).toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  return (
    <>
      <Head>
        <title>Covid Status BR</title>
        <meta name="description" content="App with covid status in Brazil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ContainerDocument>
          <Container className="mt-5">
            <Stack
              direction="horizontal"
              className="justify-content-center mobile"
              gap={3}
            >
              <Image
                src={covidImage}
                alt="Picture of covid virus by UN"
                width={24}
                height={24}
              />
              <h1 className="display-5">COVID Brazil Status</h1>
              <Image
                src={brazilFlag}
                width={24}
                height={24}
                alt="Brazil flag"
              />
            </Stack>
            <Stack
              direction="horizontal"
              className="justify-content-center web"
              gap={3}
            >
              <Image
                src={covidImage}
                alt="Picture of covid virus by UN"
                width={52}
                height={52}
              />
              <h1 className="display-1">COVID Brazil Status</h1>
              <Image
                src={brazilFlag}
                width={52}
                height={52}
                alt="Brazil flag"
              />
            </Stack>
          </Container>
          <DataDiv>
            <Container>
              <Stack className="mt-5 d-flex justify-content-center confirmed">
                <h2 className="display-1">
                  {notFound ? 0 : data.confirmed.toLocaleString('pt-BR')}
                </h2>
                <span>
                  <BiPlusMedical color="#f2463a" />
                  <p className="ms-2 mb-0">Casos</p>
                </span>
              </Stack>
              <Stack className="mt-5 d-flex justify-content-center deaths">
                <h2 className="display-1">
                  {notFound ? 0 : data.deaths.toLocaleString('pt-BR')}
                </h2>
                <span>
                  <FaSkullCrossbones color="#000" />
                  <p className="ms-2 mb-0">Mortes</p>
                </span>
              </Stack>
              <Stack className="mt-5 d-flex justify-content-center recovered">
                <h2 className="display-1">
                  {notFound ? 0 : data.recovered.toLocaleString('pt-BR')}
                </h2>
                <span>
                  <BiPlusMedical color="#6ef23a" />
                  <p className="ms-2 mb-0">Recuperados</p>
                </span>
              </Stack>
            </Container>
          </DataDiv>
          <FooterContainer className="flex-shrink-0 py-3 bg-dark text-white-50">
            <Container className="text-center">
              Última atualização: {date}
            </Container>
            <Container className="text-center">
              Created by
              <a
                className="link text-white"
                href="https://github.com/thecogmel"
              >
                <strong>Erick Medeiros</strong>
              </a>
            </Container>
          </FooterContainer>
        </ContainerDocument>
      </main>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://covid-19-data.p.rapidapi.com/country/code?code=br',
    {
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': '7355b5c542msh2c8b0c19ff0eb64p10ad60jsn0d50e622f973'
      }
    }
  )
  const data: Props[] = await res.json()

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: data[0]
    }
  }
}
