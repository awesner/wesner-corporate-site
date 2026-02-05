import fs from 'fs';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { ReactElement } from 'react';
import { BaseLayout } from '@components/layouts/base-layout';
import path from 'path';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface IArticleSummary {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

interface IBlogIndexPageProps {
  articles: IArticleSummary[];
}

const BlogIndexPage: NextPage<IBlogIndexPageProps> = ({ articles }) => {
  const t = useTranslations('blogIndex');
  const tMeta = useTranslations('meta');
  const { locale } = useRouter();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Head>
        <title>{tMeta('title')}</title>
        <meta name="description" content={tMeta('description')} />
      </Head>

      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <div style={{ marginTop: '2rem' }}>
        {articles.map((article) => (
          <div key={article.slug}
               style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <h2>
              <Link href={`/blog/${article.slug}`} passHref>
                <MuiLink
                  underline="none"
                  sx={{
                    color: '#0070f3',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {article.title}
                </MuiLink>
              </Link>
            </h2>
            <p style={{ color: '#555' }}>
              {t('publishedOn')}: {new Date(article.date).toLocaleDateString(locale)}
            </p>
            <p>{article.summary}</p>

            <Link href={`/blog/${article.slug}`} passHref>
              <MuiLink
                underline="none"
                sx={{
                  fontWeight: 'bold',
                  color: '#0070f3',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {t('readMore')}
              </MuiLink>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

BlogIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  const articlesFilePath = path.join(process.cwd(), 'data', 'blog', `articles.${locale}.json`);

  const fileContents = fs.readFileSync(articlesFilePath, 'utf8');

  const allArticles = JSON.parse(fileContents);

  const articles = allArticles.map((article: any) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    summary: article.summary,
  }));

  return {
    props: {
      articles,
      messages: {
        ...require(`/locales/${locale}/shared.json`),
        ...require(`/locales/${locale}/pages/blog.json`),
      },
    },
  };
};

export default BlogIndexPage;