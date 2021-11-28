import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
// import { GetStaticProps } from 'next'
import Head from 'next/head'
import Title from 'components/Title';
import { getProducts, Product } from 'lib/products';

interface HomePageProps {
  products: Product[];
}

/** 
 * getServerSideProps
 * Always call the CMS (server-side renders at runtime)
 * */
 export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  console.log('[HomePage] getServerSideProps()');
  const products = await getProducts();
  return { props: { products } };
};

/** 
 * getStaticProps + revalidate
 * Fetch products on the server side with ISR (Incremental Static Regeneration)
 * */
//  export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
//   console.log('[HomePage] getStaticProps()');
//   const products = await getProducts();
//   return {
//     props: { products, },
//     revalidate: 30, // Enables Incremental Static Regeneration (seconds)
//   }
// }

const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <p>
          <ul>
            {products.map(product => {
              return <li key={product.id}>{product.title}</li>
            })}
          </ul>
        </p>
      </main>
    </>
  );
};

export default HomePage;