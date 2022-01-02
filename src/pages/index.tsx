import { useEffect, useState } from 'react'
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

import axios from 'axios'
import { ContainerDocument, DataDiv } from '../styles/pages/styles'
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
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
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
              className="d-flex justify-content-center"
              gap={3}
            >
              <Image src={covidImage} alt="Picture of covid virus by UN" />
              <h1 className="display-1">COVID Brazil Status</h1>
              <Image
                src={brazilFlag}
                width={56}
                height={56}
                alt="Brazil flag"
              />
            </Stack>
          </Container>
          <DataDiv>
            <Container>
              <Stack className="mt-5 d-flex justify-content-center confirmed">
                <h2 className="display-1">
                  {data.recovered.toLocaleString('pt-BR')}
                </h2>
                <span>
                  <BiPlusMedical color="#f2463a" />
                  <p className="ms-2 mb-0">Casos</p>
                </span>
              </Stack>
              <Stack className="mt-5 d-flex justify-content-center deaths">
                <h2 className="display-1">
                  {data.deaths.toLocaleString('pt-BR')}
                </h2>
                <span>
                  <FaSkullCrossbones color="#000" />
                  <p className="ms-2 mb-0">Mortes</p>
                </span>
              </Stack>
              <Stack className="mt-5 d-flex justify-content-center recovered">
                <h2 className="display-1">
                  {data.recovered.toLocaleString('pt-BR')}
                </h2>
                <span>
                  <BiPlusMedical color="#6ef23a" />
                  <p className="ms-2 mb-0">Recuperados</p>
                </span>
              </Stack>
            </Container>
          </DataDiv>
        </ContainerDocument>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async context => {
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
