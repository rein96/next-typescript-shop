import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { getProducts, getSingleProduct, Product } from 'lib/products'
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Title from 'components/Title';
import { ApiError } from 'lib/api';

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

/** 
 * Get all product [id] 
 * getStaticPaths runs at build time when a new product doesn't exist
 * */
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
    fallback: 'blocking', // the response is blocked until a new page is ready
    // fallback: false, // return to 404 page
  }
}

/**
 * Use revalidate if homepage also uses revalidate
 */
export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: { id } }) => {
  console.log('[ProductPage] getStaticProps id', id)
  try {
    const product = await getSingleProduct(id)
    return {
      props: { product },
      revalidate: Number(process.env.REVALIDATE_SECONDS),
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return {
        notFound: true
        // notFound: Redirect to not found (404) page
        // Otherwise it may return to 500 Internal Error page
      }
    }

    throw error;
  }
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  console.log('[ProductPage] help', product)
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <div className="flex flex-col lg:flex-row">
          <div>
            <Image
              src={product.pictureUrl}
              alt={product.title}
              width={640}
              height={480}
            />
          </div>
          <div className="flex-1 lg:ml-4">
            <p className="text-sm">
              {product.description}
            </p>
            <p className="text-lg font-bold mt-2">
              {product.price}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProductPage
