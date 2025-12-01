import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ReactElement, useState } from 'react';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { BaseLayout } from '@components/layouts/base-layout';
import { Box, Typography, Paper, Grid, Snackbar, Alert } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CodeIcon from '@mui/icons-material/Code';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { FieldValues } from 'react-hook-form';
import axios from 'axios';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ProductContactForm from '@components/features/products/ProductContactForm';
import Success from 'components/features/contact-us/success';

interface IProductGalleryImage {
  original: string;
  thumbnail: string;
}
interface IProductFeature {
  title: string;
  description: string;
  icon: string;
}
interface IProductContentBlock {
  type: 'paragraph' | 'image' | 'heading' | 'subheading' | 'list';
  text?: string;
  src?: string;
  alt?: string;
  items?: string[];
}
interface IProduct {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  image_hero: string;
  gallery_images: IProductGalleryImage[];
  features: IProductFeature[];
  content: IProductContentBlock[];
}
interface IProductPageProps {
  product: IProduct;
}

const FeatureIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
  const style = { fontSize: '2.5rem', color: 'primary.main', marginBottom: '1rem' };
  switch (iconName) {
    case 'speed': return <SpeedIcon sx={style} />;
    case 'dashboard': return <DashboardIcon sx={style} />;
    case 'filter': return <FilterAltIcon sx={style} />;
    case 'steps': return <AccountTreeIcon sx={style} />;
    case 'xml': return <CodeIcon sx={style} />;
    case 'universal': return <AllInclusiveIcon sx={style} />;
    default: return null;
  }
};

const ProductContent: React.FC<{ block: IProductContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <Typography variant="h4" component="h2" gutterBottom mt={4}>{block.text}</Typography>;
    case 'subheading':
      return <Typography variant="h5" component="h3" gutterBottom mt={3}>{block.text}</Typography>;
    case 'paragraph':
      return <Typography variant="body1" paragraph>{block.text}</Typography>;
    case 'list':
      return (
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {block.items?.map((item: any, index: number) => (
            <Box component="li" key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" component="span" fontWeight="bold">
                {item.title}:
              </Typography>
              {' '}
              <Typography variant="body1" component="span" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    case 'image':
      return block.src ? <img src={block.src} alt={block.alt || ''} style={{ maxWidth: '100%', margin: '1.5rem 0', borderRadius: '8px' }} /> : null;
    default:
      return null;
  }
};

const ProductPage: NextPage<IProductPageProps> = ({ product }) => {

  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
  });

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar({ open: false, message: '' });
  };

  const onFormSubmit = (values: FieldValues) => {
    setIsLoading(true);
    axios
      .post('/api/contact', values)
      .then((res) => {
        if (res.status === 200) {
          setIsSubmited(true);
        }
      })
      .catch((err) => {
        setSnackBar({ open: true, message: err.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!product) {
    return <div>Produkt nicht gefunden.</div>;
  }

  const lightboxSlides = product.gallery_images.map(image => ({ src: image.original }));

  return (
    <>
      <Head>
        <title>{`${product.name} | Wesner Softwareentwicklung`}</title>
        <meta name="description" content={product.summary} />
      </Head>

      <Box sx={{ maxWidth: '1100px', margin: '0 auto', padding: { xs: '1rem', md: '2rem' } }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Typography variant="h2" component="h1" fontWeight="bold">{product.name}</Typography>
          <Typography variant="h5" color="text.secondary" mt={1}>{product.tagline}</Typography>
          {product.image_hero && (
            <Box mt={4} sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: 3 }}>
              <img src={product.image_hero} alt={product.name} style={{ width: '100%', display: 'block' }} />
            </Box>
          )}
        </header>

        <Box component="section" my={6}>
          <Grid container spacing={4}>
            {product.features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <FeatureIcon iconName={feature.icon} />
                  <Typography variant="h6" component="h3" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box component="section" my={6}>
          {product.content.map((block, index) => (
            <ProductContent key={index} block={block} />
          ))}
        </Box>

        <Box
          component="section"
          my={6}
          py={4}
          px={{ xs: 2, md: 4 }}
          bgcolor="grey.100"
          borderRadius={2}
        >
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            Galerie
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              paddingBottom: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {product.gallery_images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image.thumbnail}
                alt={`Screenshot ${index + 1}`}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                sx={{
                  height: '160px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid #ddd',
                  boxShadow: 1,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 3,
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={lightboxIndex}
        />

        {isSubmited ? (
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 6, textAlign: 'center' }}>
            <Success />
          </Paper>
        ) : (
          <ProductContactForm onSubmit={onFormSubmit} isLoading={isLoading} />
        )}

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleClose}
          open={snackBar.open}
          autoHideDuration={3000}
        >
          <Alert
            onClose={() => setSnackBar({ open: false, message: '' })}
            severity="error"
            sx={{ bgcolor: 'error.main', color: 'common.white' }}
          >
            {snackBar.message}
          </Alert>
        </Snackbar>

      </Box>
    </>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticPaths: GetStaticPaths = ({ locales = [] }) => {
  const paths: any[] = [];
  locales.forEach((locale) => {
    try {
      const productsFilePath = path.join(process.cwd(), 'data', 'products', `products.${locale}.json`);
      const fileContents = fs.readFileSync(productsFilePath, 'utf8');
      const products = JSON.parse(fileContents);
      products.forEach((product: any) => {
        paths.push({ params: { slug: product.slug }, locale });
      });
    } catch (error) {
      console.warn(`Could not find products for locale: ${locale}`);
    }
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = ({ locale, params }) => {
  let product = null;
  try {
    const productsFilePath = path.join(process.cwd(), 'data', 'products', `products.${locale}.json`);
    const fileContents = fs.readFileSync(productsFilePath, 'utf8');
    const products = JSON.parse(fileContents);
    product = products.find((p: any) => p.slug === params?.slug) || null;
  } catch (error) {
    console.warn(`Could not find products for locale: ${locale}`);
  }
  return {
    props: {
      product,
      messages: {
        ...require(`/locales/${locale}/shared.json`),
        ...require(`/locales/${locale}/pages/products.json`),
      },
    },
  };
};

export default ProductPage;