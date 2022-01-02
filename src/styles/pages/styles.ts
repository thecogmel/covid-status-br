import styled from 'styled-components'

export const ContainerDocument = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  width: 100vw;
  height: 100vh;
  .mobile {
    display: none !important;
  }
  .web {
    display: flex !important;
  }
  @media (max-width: 576px) {
    .mobile {
      display: flex !important;
    }
    .web {
      display: none !important;
    }
  }
`

export const DataDiv = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  h2 {
    text-align: center;
    margin-bottom: 0;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      text-align: center;
    }
  }

  .recovered {
    p,
    h2 {
      color: #6ef23a;
    }
  }

  .confirmed {
    p,
    h2 {
      color: #f2463a;
    }
  }

  .confirmed,
  .deaths,
  .recovered {
    transition: 300ms ease-in-out;
  }

  .confirmed:hover,
  .deaths:hover,
  .recovered:hover {
    transform: scale(1.1);
  }
`
export const FooterContainer = styled.footer`
  margin-top: auto;
  a {
    margin-left: 10px;
    font-weight: bold;
    text-decoration: none;
  }
`
