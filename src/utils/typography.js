import Typography from 'typography'
// import Wordpress2016 from 'typography-theme-wordpress-2016'

import Alton from 'typography-theme-alton'

Alton.baseFontSize = '18'
Alton.baseLineHeight = '1.61'
Alton.scaleRatio = '1.65'

Alton.overrideThemeStyles = () => ({
  'h1,h2,h3,h4,h5,h6': {
    color: '#FF7527'
  },
})

// delete Wordpress2016.googleFonts

const typography = new Typography(Alton)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography

export const rhythm = typography.rhythm
export const scale = typography.scale
