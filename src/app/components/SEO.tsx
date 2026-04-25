import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
}

export function SEO({ title, description, keywords }: SEOProps) {
  const [globalSeo, setGlobalSeo] = useState<SEOProps | null>(null);

  useEffect(() => {
    // Fetch global SEO settings from backend
    axios.get('/api/settings/global_seo')
      .then(res => {
        if (res.data.global_seo) {
          setGlobalSeo(res.data.global_seo);
        }
      })
      .catch(err => console.error('Failed to load global SEO', err));
  }, []);

  const finalTitle = title || globalSeo?.title || '源极科技 OriginX';
  const finalDescription = description || globalSeo?.description || 'AI赋能工业与商业';
  const finalKeywords = keywords || globalSeo?.keywords || ['AI', '源极科技'];

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
    </Helmet>
  );
}
