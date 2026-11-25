const images = {
  html: 'optimized/html.png',
  css: 'optimized/css.png',
  javascript: 'optimized/javascript.png',
  tailwind: 'optimized/tailwind.png',
  react: 'optimized/react.png',
  next: 'optimized/next.png',
  node: 'optimized/node.png',
  express: 'optimized/express.png',
  mongo: 'optimized/mongo.png',
  shopify: 'optimized/shopify.png',
  liquid: 'optimized/liquid.png',
  'shopify-themes': 'optimized/shopify-themes.png',
  vscode: 'optimized/vscode.png',
  postman: 'optimized/postman.png',
  chatgpt: 'optimized/chatgpt.png',
  claude: 'optimized/claude.png',
  cursor: 'optimized/cursor.png',
  git: 'optimized/git.png',
  github: 'optimized/github.png',
  vercel: 'optimized/vercel.png',
  'google-neon': 'optimized/google-neon.webp',
}

export default function TechIcon({ name, size = 'size-12 sm:size-14' }) {
  const filename = images[name]
  if (!filename) return null
  return (
    <img
      src={`/TechIcons/${filename}`}
      width={name === 'google-neon' ? 140 : 56}
      height={name === 'google-neon' ? 48 : 56}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`block object-contain ${size}`}
    />
  )
}
