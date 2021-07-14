import React from 'react'
import Layout from '../../components/Layout';
import * as S from './styles';

const Home = () => {
  return (
    <Layout>
    <S.Container>
      <S.Title>
        Welcome to Awesome Movies
      </S.Title>
      <S.Button href="/movies">
        Browse Movies
      </S.Button>
    </S.Container>
    </Layout>
  )
}

export default Home
