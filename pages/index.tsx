import type { NextPage } from 'next'
// import { GetServerSideProps } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
// import Link from 'next/link'
import Title from 'components/Title';
import { getProducts, Product } from 'lib/products';
import ProductCard from 'components/ProductCard'
interface HomePageProps {
  products: Product[];
}

/** 
 * getServerSideProps
 * Always call the CMS (server-side renders at runtime)
 * */
// export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
//   console.log('[HomePage] getServerSideProps()');
//   const products = await getProducts();
//   return { props: { products } };
// };

/** 
 * getStaticProps + revalidate
 * Fetch products on the server side with ISR (Incremental Static Regeneration)
 * revalidate -> Enables Incremental Static Regeneration (seconds)
 * To test revalidate -> yarn run build
 * If we use ISR, make sure apply to other page that displays the same data ([id].tsx)
 * */
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return {
    props: { products, },
    revalidate: Number(process.env.REVALIDATE_SECONDS),
  }
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
          <ul className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {products.map(product => {
              return (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              )
            })}
          </ul>
        </p>
      </main>
    </>
  );
};

export default HomePage;