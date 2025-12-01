import { GetStaticProps, NextPage } from 'next';
import { ReactElement } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import { BaseLayout } from '@components/layouts/base-layout';

interface IProductSummary {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
}

interface IProductsIndexPageProps {
  products: IProductSummary[];
}

const ProductsIndexPage: NextPage<IProductsIndexPageProps> = ({ products }) => {
  const t = useTranslations('productsIndex');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <div style={{ marginTop: '3rem', display: 'grid', gap: '2rem' }}>
        {products.map((product) => (
          <div key={product.slug} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1.5rem', transition: 'box-shadow 0.3s' }}>
            <Link href={`/products/${product.slug}`}>
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 style={{ marginTop: 0, color: '#0070f3' }}>{product.name}</h2>
                <h3 style={{ fontStyle: 'italic', color: '#555', fontWeight: 'normal' }}>{product.tagline}</h3>
                <p>{product.summary}</p>
                <p style={{ fontWeight: 'bold', color: '#0070f3' }}>{t('learnMore')}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  const productsFilePath = path.join(process.cwd(), 'data', 'products', `products.${locale}.json`);
  const fileContents = fs.readFileSync(productsFilePath, 'utf8');
  const allProducts = JSON.parse(fileContents);

  const products = allProducts.map((product: any) => ({
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    summary: product.summary,
  }));

  return {
    props: {
      products,
      messages: {
        ...require(`/locales/${locale}/shared.json`),
        ...require(`/locales/${locale}/pages/products.json`),
      },
    },
  };
};

export default ProductsIndexPage;