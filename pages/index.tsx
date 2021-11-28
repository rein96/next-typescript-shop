import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Title from 'components/Title';
import { getProducts, Product } from 'lib/products';

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return { props: { products } }
}

const HomePage: NextPage<HomePageProps> = ({ products }) => {
  console.log('products', products)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <p>
          [TODO: display products]
        </p>
      </main>
    </>
  );
};

export default HomePage;