import fs from 'fs';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import { BaseLayout } from '@components/layouts/base-layout';
import path from 'path';

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
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Unser Blog</h1>
      <p>Hier finden Sie Artikel zu Themen rund um Softwareentwicklung und IT.</p>

      <div style={{ marginTop: '2rem' }}>
        {articles.map((article) => (
          <div key={article.slug} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <h2>
              <Link href={`/blog/${article.slug}`}>
                <a style={{ textDecoration: 'none', color: '#0070f3' }}>{article.title}</a>
              </Link>
            </h2>
            <p style={{ color: '#555' }}>
              Veröffentlicht am: {new Date(article.date).toLocaleDateString('de-DE')}
            </p>
            <p>{article.summary}</p>
            <Link href={`/blog/${article.slug}`}>
              <a style={{ fontWeight: 'bold', color: '#0070f3' }}>Weiterlesen...</a>
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