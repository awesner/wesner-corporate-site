import fs from 'fs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { ReactElement } from 'react';
import { BaseLayout } from '@components/layouts/base-layout';
import Head from 'next/head';
import path from 'path';

interface IContentBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'code' | 'image' | 'table' | 'toc';
  id?: string;
  text?: string;
  items?: any[];
  language?: string;
  code?: string;
  title?: string;
  src?: string;
  alt?: string;
  headers?: string[];
  rows?: string[][];
}

interface IArticle {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  image_title?: string;
  content: IContentBlock[];
}

interface IArticlePageProps {
  article: IArticle;
}

const LinkifyText: React.FC<{ text?: string }> = ({ text }) => {
  if (!text) {
    return null;
  }
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return (
    <>
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
};

const ArticleContent: React.FC<{ block: IContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <h1 id={block.id} style={{ marginTop: '2rem', scrollMarginTop: '80px' }}>{block.text}</h1>;
    case 'subheading':
      return <h2 id={block.id} style={{ marginTop: '1.5rem', scrollMarginTop: '80px' }}>{block.text}</h2>;
    case 'toc':
      const mainLinkStyle: React.CSSProperties = {
        textDecoration: 'none',
        fontWeight: 'normal',
        color: '#0070f3',
      };
      const subLinkStyle: React.CSSProperties = {
        textDecoration: 'none',
        fontWeight: 'normal',
        color: '#0070f3',
      };
      return (
        <div style={{ padding: '1rem 1.5rem', border: '1px solid #eee', borderRadius: '8px', margin: '2rem 0', background: '#fafafa' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.2rem' }}>{block.title || 'Inhaltsverzeichnis'}</h3>
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
            {block.items?.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>
                <a
                  href={item.href}
                  style={mainLinkStyle}
                  onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  {item.text}
                </a>
                {item.subItems && (
                  <ul style={{ paddingLeft: '20px', listStyle: 'none', marginTop: '0.25rem' }}>
                    {item.subItems.map((subItem: any, subIndex: number) => (
                      <li key={subIndex} style={{ marginBottom: '0.125rem' }}>
                        <a
                          href={subItem.href}
                          style={subLinkStyle}
                          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                        >
                          {subItem.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'paragraph':
      return (
        <p style={{ lineHeight: '1.6' }}>
          <LinkifyText text={block.text} />
        </p>
      );
    case 'list':
      return (
        <>
          {block.title && <h4>{block.title}</h4>}
          <ul style={{ paddingLeft: '20px' }}>
            {block.items?.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </>
      );
    case 'image':
      return block.src ? <img src={block.src} alt={block.alt || ''} style={{ maxWidth: '100%', margin: '1rem 0' }} /> : null;
    case 'code':
      return (
        <div style={{ margin: '1rem 0' }}>
          {block.title && <h4>{block.title}</h4>}
          <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '5px', overflowX: 'auto' }}>
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case 'table':
      return (
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0' }}>
          <thead>
          <tr>
            {block.headers?.map((header, index) => (
              <th key={index} style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2', textAlign: 'left' }}>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {block.rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
};

const ArticlePage: NextPage<IArticlePageProps> = ({ article }) => {
  if (!article) {
    return <div>Artikel nicht gefunden.</div>;
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>{article.title}</h1>
        {article.image_title && (
          <img
            src={article.image_title}
            alt={article.title}
            style={{ width: '100%', height: 'auto', margin: '1rem 0' }}
          />
        )}
        {article.subtitle && (
          <h2 style={{ color: '#555', fontStyle: 'italic' }}>
            {article.subtitle}
          </h2>
        )}
        <p
          style={{
            color: '#777',
            borderBottom: '1px solid #eee',
            paddingBottom: '1rem',
            marginBottom: '2rem',
          }}
        >
          Von {article.author} | Veröffentlicht am:{' '}
          {new Date(article.date).toLocaleDateString('de-DE')}
        </p>

        {article.content.map((block, index) => (
          <ArticleContent key={index} block={block} />
        ))}
      </article>
    </>
  );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticPaths: GetStaticPaths = ({ locales = [] }) => {
  const paths: any[] = [];

  locales.forEach((locale) => {
    try {
      const articlesFilePath = path.join(process.cwd(), 'data', 'blog', `articles.${locale}.json`);
      const fileContents = fs.readFileSync(articlesFilePath, 'utf8');
      const articles = JSON.parse(fileContents);

      articles.forEach((article: any) => {
        paths.push({
          params: { slug: article.slug },
          locale,
        });
      });
    } catch (error) {
      console.warn(`Could not find or parse articles for locale: ${locale}`);
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ locale, params }) => {
  let article = null;
  try {
    const articlesFilePath = path.join(process.cwd(), 'data', 'blog', `articles.${locale}.json`);
    const fileContents = fs.readFileSync(articlesFilePath, 'utf8');
    const articles = JSON.parse(fileContents);
    article = articles.find((article: any) => article.slug === params?.slug) || null;
  } catch (error) {
    console.warn(`Could not find or parse articles for locale: ${locale}`);
  }

  return {
    props: {
      article,
      messages: {
        ...require(`/locales/${locale}/shared.json`),
        ...require(`/locales/${locale}/pages/blog.json`),
      },
    },
  };
};

export default ArticlePage;