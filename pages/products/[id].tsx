import React from 'react'
import Head from 'next/head'
import { getProducts, getSingleProduct, Product } from 'lib/products'
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Title from 'components/Title';

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

/** Get all product [id] */
export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  console.log('products', products)
  const paths = products.map(product => ({
    params: {
      id: product.id.toString()
    }
  }))
  console.log('paths', paths)

  return {
    paths,
    fallback: false, // return to 404 page
  }
}

/**
 * Use revalidate if homepage also uses revalidate
 */
export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: { id } }) => {
  console.log('id', id)
  const product = await getSingleProduct(id)
  return {
    props: { product },
    // revalidate: 30, // seconds
  }
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  console.log('product', product)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>
          {product.description}
        </p>
      </main>
    </>
  )
}

export default ProductPage