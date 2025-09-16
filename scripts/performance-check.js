const fs = require('fs')
const path = require('path')

function analyzeBundle() {
  const buildDir = path.join(process.cwd(), '.next')
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Run `yarn build` first.')
    return
  }

  const statsFile = path.join(buildDir, 'analyze', 'client.html')
  
  if (fs.existsSync(statsFile)) {
    console.log('✅ Bundle analysis available at:', statsFile)
  }

  // Check for large files
  const staticDir = path.join(buildDir, 'static')
  if (fs.existsSync(staticDir)) {
    console.log('\n📊 Static Asset Analysis:')
    checkLargeFiles(staticDir, 100 * 1024) // Files > 100KB
  }
}

function checkLargeFiles(dir, threshold, prefix = '') {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    
    if (stats.isDirectory()) {
      checkLargeFiles(filePath, threshold, `${prefix}${file}/`)
    } else if (stats.size > threshold) {
      const sizeKB = Math.round(stats.size / 1024)
      const sizeIcon = sizeKB > 500 ? '🔴' : sizeKB > 200 ? '🟡' : '🟢'
      console.log(`${sizeIcon} ${prefix}${file}: ${sizeKB}KB`)
    }
  })
}

function checkImageOptimization() {
  const publicDir = path.join(process.cwd(), 'public')
  console.log('\n🖼️  Image Format Analysis:')
  
  const images = fs.readdirSync(publicDir).filter(file => 
    /\.(png|jpg|jpeg|webp|avif)$/i.test(file)
  )
  
  const formats = {}
  images.forEach(img => {
    const ext = path.extname(img).toLowerCase()
    formats[ext] = (formats[ext] || 0) + 1
  })
  
  console.log('Format distribution:')
  Object.entries(formats).forEach(([ext, count]) => {
    const icon = ext === '.avif' ? '✅' : ext === '.webp' ? '🟡' : '🔴'
    console.log(`${icon} ${ext}: ${count} files`)
  })
}

console.log('🚀 Performance Analysis Report\n')
analyzeBundle()
checkImageOptimization()

console.log('\n💡 Optimization Tips:')
console.log('- Use `yarn analyze` to view detailed bundle analysis')
console.log('- Convert remaining PNG/JPG images to AVIF/WebP')
console.log('- Consider lazy loading for below-the-fold images')
console.log('- Monitor bundle size with each deployment')