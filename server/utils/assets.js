import path from 'path'

const IS_PROD = process.env.NODE_ENV === 'production'

const assetPath = pathname => path.resolve(__dirname, '../../dist', pathname)
const loadManifest = pathname => (IS_PROD ? require(pathname) : {})
const JS_MANIFEST = loadManifest(assetPath('js/rev-manifest.json'))
const CSS_MANIFEST = loadManifest(assetPath('css/rev-manifest.json'))

export const getHashedAssetPath = pathname => {
  let normalized, hashed

  switch (path.extname(pathname)) {
    case '.js':
      normalized = pathname.replace('/js/', '')
      hashed = JS_MANIFEST[normalized] || normalized
      return `/js/${hashed}`
    case '.css':
      normalized = pathname.replace('/css/', '')
      hashed = CSS_MANIFEST[normalized] || normalized
      return `/css/${hashed}`
    default:
      throw new Error(`Could not find ${pathname} in manifest`)
  }
}
