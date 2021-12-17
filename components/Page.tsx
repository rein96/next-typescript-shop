import React from 'react'
import Head from 'next/head'
import Title from './Title'

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - Plant Shop 🌴</title>
      </Head>
      <main className='px-6 py-4'>
        <Title>{title}</Title>
        {children}
      </main>
    </>
  )
}

export default Page
