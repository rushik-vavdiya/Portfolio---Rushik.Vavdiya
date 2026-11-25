import { useEffect } from 'react';

const SEO = ({
  title,
  description,
  url,
}) => {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name, content) => {
      let tag = document.querySelector(
        `meta[name="${name}"]`
      );

      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }

      tag.setAttribute('content', content);
    };

    updateMeta('description', description);

    const canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (canonical) {
      canonical.href = url;
    }
  }, [title, description, url]);

  return null;
};

export default SEO;