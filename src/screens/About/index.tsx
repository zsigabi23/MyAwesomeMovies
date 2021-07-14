import React from 'react'
import Layout from '../../components/Layout';
import * as S from './styles';

const About = () => {
  return (
    <Layout>
      <S.Container>
        <S.Title>
          Developer Information
        </S.Title>
        <S.Text>
          <p>Name: Zolile</p>
          <p>Surname: Sigabi</p>
          <p>Email: <a href="url">owansigabi9@icloud.com</a></p>
          <p>Phone: 0677242498</p>
        </S.Text>
      </S.Container>
    </Layout>
  )
}

export default About;
