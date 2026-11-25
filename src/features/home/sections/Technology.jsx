import { useEffect, useMemo, useRef, useState } from 'react'
import Container from '../../../components/ui/Container.jsx'
import TechIcon from '../../../components/ui/TechIcon.jsx'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import Button from '../../../components/ui/Button.jsx'
import { technologyGroups, technologyPageCopy } from '../data/technologies.js'
import { trackElementSize, trackViewport } from '../../../utils/viewport.js'
import { getThemeRgb, themeColor, themeHex, themeShaderVector } from '../../../utils/themeColors.js'

const orbitLayerByName = {
  HTML: 0, CSS: 0, JavaScript: 0, 'Tailwind CSS': 0,
  React: 1, 'Next.js': 1,
  'Node.js': 2, 'Express.js': 2, MongoDB: 2,
  Shopify: 3, Liquid: 3, 'Shopify themes': 3,
  GitHub: 3, 'VS Code': 3, Postman: 3, Git: 3, Vercel: 3,
  ChatGPT: 3, Claude: 3, Cursor: 3,
}
// Satellites follow invisible 3D orbital planes around the planet.
const orbitLayers = [
  { radius: 2.65, inclination: 0.3, node: 0, speed: 0.13 },
  { radius: 3.55, inclination: -0.55, node: 0.8, speed: -0.1 },
  { radius: 4.45, inclination: 0.8, node: 1.6, speed: 0.075 },
  { radius: 5.35, inclination: -1.0, node: 2.4, speed: -0.06 },
]
const legendGroups = [
  { title: 'Frontend', layer: 0, names: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'] },
  { title: 'Frameworks', layer: 1, names: ['React', 'Next.js'] },
  { title: 'Backend', layer: 2, names: ['Node.js', 'Express', 'MongoDB'] },
  { title: 'Platforms', layer: 3, names: ['Shopify', 'Liquid', 'Shopify themes'] },
]
const hiddenOrbitTechnologyNames = new Set(['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'ChatGPT', 'Claude', 'Cursor'])
const iconFiles = {
  shopify: 'shopify.png', node: 'node.png', next: 'next.png', mongo: 'mongo.png', express: 'express.png',
  tailwind: 'tailwind.png', javascript: 'javascript.png', html: 'html.png', css: 'css.png',
  github: 'github.png', vscode: 'vscode.png', postman: 'postman.png',
  liquid: 'liquid.png', 'shopify-themes': 'shopify-themes.png', git: 'git.png', vercel: 'vercel.png',
  chatgpt: 'chatgpt.png', claude: 'claude.png', cursor: 'cursor.png',
}
function createGlowTexture(THREE, palette, color, center) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, center)
  gradient.addColorStop(0.35, color)
  gradient.addColorStop(1, themeColor(palette.background, 0))
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

function createSelectionRingTexture(THREE, palette) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  context.beginPath()
  context.arc(64, 64, 46, 0, Math.PI * 2)
  context.setLineDash([8, 6])
  context.lineWidth = 3
  context.strokeStyle = themeColor(palette.white, 0.92)
  context.shadowColor = themeColor(palette.accent)
  context.shadowBlur = 10
  context.stroke()
  return new THREE.CanvasTexture(canvas)
}

function createPlanetMaterial(THREE, palette) {
  const deep = themeShaderVector(palette.background)
  const mid = themeShaderVector(palette.navy)
  const high = themeShaderVector(palette.bright)
  const accent = themeShaderVector(palette.accent)
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPulse: { value: 0 }, uLight: { value: new THREE.Vector3(-0.5, 0.6, 0.7) } },
    vertexShader: `varying vec3 vNormal; varying vec3 vPosition; void main(){vNormal=normalize(normalMatrix*normal);vPosition=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `uniform float uTime; uniform float uPulse; uniform vec3 uLight; varying vec3 vNormal; varying vec3 vPosition; void main(){
      float facing=max(dot(vNormal,vec3(0.,0.,1.)),0.); float rim=pow(1.-facing,2.6);
      float flow=sin(vPosition.y*10.+uTime*1.3+sin(vPosition.x*5.+uTime*.6)*2.)*.5+.5; flow=smoothstep(.86,1.,flow);
      float noise=sin(vPosition.x*7.+uTime*.3)*sin(vPosition.z*6.-uTime*.25)*sin(vPosition.y*5.+uTime*.2)*.5+.5;
      float light=max(dot(vNormal,normalize(uLight)),0.);
      vec3 deep=vec3(${deep}),mid=vec3(${mid}),high=vec3(${high}),accent=vec3(${accent});
      vec3 color=mix(deep,mid,.25+light*.75); color+=accent*noise*.16; color+=accent*flow*(.35+.4*uPulse);
      color+=high*rim*.95; color+=accent*pow(light,6.)*.18; color+=accent*uPulse*.35*(1.-rim);
      float lat=asin(clamp(vPosition.y,-1.,1.))*3.8197; float lon=atan(vPosition.z,vPosition.x)*3.8197;
      float grid=(1.-smoothstep(0.,.05,abs(sin(lat*3.14159))))+(1.-smoothstep(0.,.05,abs(sin(lon*3.14159))))*(1.-vPosition.y*vPosition.y);
      color+=high*grid*.09*(.3+light)*(1.-rim*.6); color*=1.-.35*smoothstep(.55,1.,rim); color+=high*smoothstep(.82,1.,rim)*.6;
      gl_FragColor=vec4(color,1.);
    }`,
  })
}

function useTechnologyUniverse(rootRef, technologies, setSelected, setPinnedTechnology, setFocusedOrbit, focusedOrbitRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    let disposed = false
    let cleanup = () => {}
    import('three').then((THREE) => {
      if (!disposed) cleanup = mountTechnologyUniverse(root, technologies, setSelected, setPinnedTechnology, setFocusedOrbit, focusedOrbitRef, THREE)
    })
    return () => {
      disposed = true
      cleanup()
    }
  }, [rootRef, technologies, setSelected, setPinnedTechnology, setFocusedOrbit, focusedOrbitRef])
}

function mountTechnologyUniverse(root, technologies, setSelected, setPinnedTechnology, setFocusedOrbit, focusedOrbitRef, THREE) {
    const palette = {
      accent: getThemeRgb('--site-accent-rgb'),
      accentLight: getThemeRgb('--site-accent-light-rgb'),
      background: getThemeRgb('--site-bg-rgb'),
      bright: getThemeRgb('--site-accent-bright-rgb'),
      navy: getThemeRgb('--site-navy-rgb'),
      white: getThemeRgb('--site-white-rgb'),
    }
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 1.75))
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.className = 'absolute inset-0 block h-full w-full'
    root.prepend(renderer.domElement)

    const scene = new THREE.Scene()
    // Perspective camera: front satellites look bigger, back ones smaller
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200)
    camera.position.set(0, 0, 18.5)
    const universe = new THREE.Group()
    const system = new THREE.Group()
    scene.add(universe)
    universe.add(system)

    const planetRadius = 1.68
    const planet = new THREE.Group()
    const planetMaterial = createPlanetMaterial(THREE, palette)
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(planetRadius, 128, 96), planetMaterial)
    planet.add(sphere)
    system.add(planet)

    // Atmosphere glow around the planet (same var(--site-accent) palette)
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(planetRadius * 1.16, 64, 48),
      new THREE.ShaderMaterial({
        uniforms: { uPulse: { value: 0 } },
        vertexShader: `varying vec3 vN; varying vec3 vV; void main(){vec4 mv=modelViewMatrix*vec4(position,1.); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `uniform float uPulse; varying vec3 vN; varying vec3 vV; void main(){float f=pow(1.-max(dot(vN,vV),0.),3.2); gl_FragColor=vec4(vec3(${themeShaderVector(palette.accent)})*f*(1.1+.5*uPulse), f*.85);}`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      }),
    )
    system.add(atmosphere)

    const surfaceParticleCount = window.innerWidth < 700 ? 900 : 2600
    const surfacePositions = new Float32Array(surfaceParticleCount * 3)
    for (let index = 0; index < surfaceParticleCount; index += 1) {
      const vertical = 1 - (2 * (index + 0.5)) / surfaceParticleCount
      const angle = index * 2.39996323
      const radial = Math.sqrt(1 - vertical * vertical) * planetRadius * 1.012
      surfacePositions.set([radial * Math.cos(angle), vertical * planetRadius * 1.012, radial * Math.sin(angle)], index * 3)
    }
    const surfaceGeometry = new THREE.BufferGeometry()
    surfaceGeometry.setAttribute('position', new THREE.BufferAttribute(surfacePositions, 3))
    planet.add(new THREE.Points(surfaceGeometry, new THREE.PointsMaterial({ color: themeHex(palette.accentLight), size: 0.025, transparent: true, opacity: 0.82, depthWrite: false, blending: THREE.AdditiveBlending })))

    const glowTexture = createGlowTexture(THREE, palette, themeColor(palette.accent, 0.36), themeColor(palette.white, 0.78))
    const haloTexture = createGlowTexture(THREE, palette, themeColor(palette.accent, 0.24), themeColor(palette.accent, 0.3))
    const selectionRingTexture = createSelectionRingTexture(THREE, palette)
    const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }))
    coreGlow.scale.setScalar(2.6)
    planet.add(coreGlow)
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.75 }))
    halo.scale.setScalar(7.5)
    system.add(halo)

    const stars = []
    ;[[250, 60, 0.03, 0.55], [150, 38, 0.05, 0.8], [60, 24, 0.08, 1]].forEach(([count, range, size, opacity], layerIndex) => {
      const positions = new Float32Array(count * 3)
      for (let index = 0; index < count; index += 1) {
        const vertical = Math.random() * 2 - 1
        const angle = Math.random() * Math.PI * 2
        const radial = Math.sqrt(1 - vertical * vertical) * range * (0.6 + Math.random() * 0.5)
        positions.set([radial * Math.cos(angle) * 1.4, vertical * range * 0.9, -8 - Math.random() * range * 0.6], index * 3)
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: themeHex(layerIndex === 2 ? palette.accentLight : palette.white), size, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }))
      scene.add(points)
      stars.push(points)
    })

    const layerPositions = new Array(orbitLayers.length).fill(0)
    const layerIndices = technologies.map((technology, index) => orbitLayerByName[technology.name] ?? index % orbitLayers.length)
    const layerCounts = orbitLayers.map((_, layerIndex) => layerIndices.filter((itemLayer) => itemLayer === layerIndex).length)
    const satellites = technologies.map((technology, index) => {
      const layerIndex = layerIndices[index]
      const layer = orbitLayers[layerIndex]
      const color = new THREE.Color(themeHex(palette.accent))
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }))
      glow.scale.setScalar(0.42)
      glow.renderOrder = 1
      system.add(glow)
      const selectionRing = new THREE.Sprite(new THREE.SpriteMaterial({ map: selectionRingTexture, color: themeHex(palette.accentLight), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
      selectionRing.scale.setScalar(0.9)
      selectionRing.renderOrder = 2
      system.add(selectionRing)
      const file = iconFiles[technology.icon]
      const texture = new THREE.TextureLoader().load(`/TechIcons/optimized/${file}`)
      texture.colorSpace = THREE.SRGBColorSpace
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }))
      sprite.scale.setScalar(0.66)
      sprite.renderOrder = 3
      system.add(sprite)
      const connectionGeometry = new THREE.BufferGeometry()
      connectionGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
      connectionGeometry.setAttribute('lineDistance', new THREE.BufferAttribute(new Float32Array(2), 1))
      const connection = new THREE.Line(
        connectionGeometry,
        new THREE.LineDashedMaterial({ color: color.clone().lerp(new THREE.Color(themeHex(palette.accentLight)), 0.5), dashSize: 0.05, gapSize: 0.1, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }),
      )
      connection.frustumCulled = false
      system.add(connection)
      const signal = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: themeHex(palette.accentLight), transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending }))
      signal.scale.setScalar(0.2)
      system.add(signal)
      const layerCount = layerCounts[layerIndex]
      const layerPosition = layerPositions[layerIndex]++
      return { technology, layerIndex, layer, sprite, glow, selectionRing, connection, signal, angle: (layerPosition / layerCount) * Math.PI * 2 + layerIndex * 0.9, hoverWeight: 0, focusWeight: 1, position: new THREE.Vector3() }
    })

    const pointer = { x: 0, y: 0 }
    const raycaster = new THREE.Raycaster()
    raycaster.params.Sprite = { threshold: 0.24 }
    const pointerVector = new THREE.Vector2()
    const orbitAxisX = new THREE.Vector3(1, 0, 0)
    const orbitAxisY = new THREE.Vector3(0, 1, 0)
    const ripplePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const ripplePosition = new THREE.Vector3()
    const cameraWorldPosition = new THREE.Vector3()
    const planetWorldPosition = new THREE.Vector3()
    const satelliteWorldPosition = new THREE.Vector3()
    const occlusionPoint = new THREE.Vector3()
    const occlusionSphere = new THREE.Sphere(new THREE.Vector3(), planetRadius)
    const occlusionRay = new THREE.Ray()
    const ripples = []
    const worldPos = new THREE.Vector3()
    const easeOut = (p) => 1 - Math.pow(1 - p, 3)
    const easeOutBack = (p) => { const t = p - 1; return 1 + 2.70158 * t * t * t + 1.70158 * t * t }
    const clamp01 = (v) => Math.min(1, Math.max(0, v))
    let hoveredIndex = -1
    let pinnedIndex = -1
    let orbitScale = 1
    let focus = focusedOrbitRef.current
    const setFocus = (index) => {
      focus = Number.isInteger(index) ? index : null
      focusedOrbitRef.current = focus
      setFocusedOrbit(focus)
    }
    let frame = 0
    let elapsed = 0
    let previous = performance.now()
    let running = true
    let pageVisible = !document.hidden

    const resize = () => {
      const { width, height } = root.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      orbitScale = Math.min(1, Math.max(0.58, camera.aspect * 1.05))
    }
    const stopTrackingSize = trackElementSize(root, resize)

    const pickSatellite = (event) => {
      const bounds = root.getBoundingClientRect()
      pointerVector.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      pointerVector.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
      raycaster.setFromCamera(pointerVector, camera)
      const visibleSprites = satellites.filter((satellite) => !satellite.occluded).map((satellite) => satellite.sprite)
      const hits = raycaster.intersectObjects(visibleSprites, false)
      if (!hits.length) return -1
      return satellites.findIndex((satellite) => satellite.sprite === hits[0].object)
    }

    const movePointer = (event) => {
      const bounds = root.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      const next = pickSatellite(event)
      if (next !== hoveredIndex) {
        hoveredIndex = next
        if (next >= 0) {
          const satellite = satellites[next]
          setSelected(satellite.technology.name)
        } else if (pinnedIndex >= 0) {
          const satellite = satellites[pinnedIndex]
          setSelected(satellite.technology.name)
        } else {
          setSelected(null)
        }
      }
    }
    const leavePointer = () => {
      pointer.x = 0
      pointer.y = 0
      hoveredIndex = -1
      if (pinnedIndex >= 0) {
        const satellite = satellites[pinnedIndex]
        setSelected(satellite.technology.name)
      } else {
        setSelected(null)
      }
    }
    const createRipple = () => {
      const position = raycaster.ray.intersectPlane(ripplePlane, ripplePosition)
      if (!position) return
      const material = new THREE.MeshBasicMaterial({ color: themeHex(palette.accentLight), side: THREE.DoubleSide, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false })
      const mesh = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.14, 48), material)
      mesh.position.copy(position)
      mesh.position.z += 0.08
      mesh.renderOrder = 4
      scene.add(mesh)
      ripples.push({ mesh, age: 0 })
    }
    const clickPointer = (event) => {
      const index = pickSatellite(event)
      createRipple()
      if (index < 0) {
        pinnedIndex = -1
        setPinnedTechnology(null)
        setFocus(null)
        setSelected(null)
        return
      }
      pinnedIndex = pinnedIndex === index ? -1 : index
      setPinnedTechnology(pinnedIndex >= 0 ? satellites[pinnedIndex].technology.name : null)
      setFocus(satellites[index].layerIndex)
      const selectedIndex = pinnedIndex >= 0 ? pinnedIndex : hoveredIndex
      if (selectedIndex >= 0) {
        const satellite = satellites[selectedIndex]
        setSelected(satellite.technology.name)
      } else {
        setSelected(null)
      }
    }
    const activateLegendTechnology = (event) => {
      const name = event.detail?.name
      const index = satellites.findIndex((satellite) => satellite.technology.name === name)
      if (index < 0) return
      if (event.detail?.pinned) {
        pinnedIndex = index
        setPinnedTechnology(name)
        setFocus(satellites[index].layerIndex)
      }
      else hoveredIndex = index
      setSelected(name)
    }
    const clearLegendTechnology = (event) => {
      hoveredIndex = -1
      if (event.detail?.clearPinned) {
        pinnedIndex = -1
        setPinnedTechnology(null)
        setFocus(null)
      }
      if (pinnedIndex >= 0) {
        const satellite = satellites[pinnedIndex]
        setSelected(satellite.technology.name)
      } else {
        setSelected(null)
      }
    }
    const focusTechnologyLayer = (event) => {
      hoveredIndex = -1
      pinnedIndex = -1
      setPinnedTechnology(null)
      setFocus(event.detail?.index)
      setSelected(null)
    }
    const visibility = () => { pageVisible = !document.hidden }
    root.addEventListener('pointermove', movePointer)
    root.addEventListener('pointerleave', leavePointer)
    root.addEventListener('click', clickPointer)
    root.addEventListener('technology:activate', activateLegendTechnology)
    root.addEventListener('technology:clear', clearLegendTechnology)
    root.addEventListener('technology:focus-layer', focusTechnologyLayer)
    document.addEventListener('visibilitychange', visibility)

    const animate = (now) => {
      frame = requestAnimationFrame(animate)
      if (!running || !pageVisible) { previous = now; return }
      const delta = Math.min((now - previous) / 1000, 0.05)
      previous = now
      elapsed += delta

      // Camera drift, floating universe, and intro zoom
      camera.position.z = 18.5 + Math.sin(elapsed * 0.35) * 0.25
      camera.lookAt(0, 0, 0)
      universe.position.y = Math.sin(elapsed * 0.5) * 0.08
      system.scale.setScalar(0.85 + 0.15 * easeOut(clamp01(elapsed / 2.4)))

      universe.rotation.y += (pointer.x * 0.34 - universe.rotation.y) * 0.05
      universe.rotation.x += (0.32 + pointer.y * 0.12 - universe.rotation.x) * 0.05
      system.rotation.y += delta * 0.1
      stars.forEach((star, index) => {
        star.position.x = -pointer.x * (0.4 + index * 0.5)
        star.position.y = pointer.y * (0.25 + index * 0.3)
        star.rotation.z = elapsed * 0.002 * (index + 1)
      })
      const pulse = 0.5 + 0.5 * Math.sin(elapsed * 1.6)
      planetMaterial.uniforms.uTime.value = elapsed
      planetMaterial.uniforms.uPulse.value = pulse
      planetMaterial.uniforms.uLight.value.set(pointer.x * 1.2 - 0.2, -pointer.y * 1.2 + 0.5, 0.8)
      planet.rotation.y += delta * 0.12
      planet.rotation.x = Math.sin(elapsed * 0.2) * 0.05
      coreGlow.scale.setScalar(2.6 * (1 + 0.06 * Math.sin(elapsed * 1.6)))
      halo.material.opacity = 0.65 + 0.2 * Math.sin(elapsed * 0.7)
      atmosphere.material.uniforms.uPulse.value = pulse
      scene.updateMatrixWorld()
      camera.getWorldPosition(cameraWorldPosition)
      planet.getWorldPosition(planetWorldPosition)
      occlusionSphere.center.copy(planetWorldPosition)

      const activeIndex = hoveredIndex >= 0 ? hoveredIndex : pinnedIndex
      const activeSatellite = satellites[activeIndex]
      const focusedLayerIndex = activeSatellite?.layerIndex ?? focus
      satellites.forEach((satellite, index) => {
        const isActive = index === hoveredIndex || index === pinnedIndex
        const isDimmed = focusedLayerIndex !== null && satellite.layerIndex !== focusedLayerIndex
        satellite.hoverWeight += ((isActive ? 1 : 0) - satellite.hoverWeight) * Math.min(1, delta * 8)
        satellite.focusWeight += ((isDimmed ? 0.24 : 1) - satellite.focusWeight) * Math.min(1, delta * 6)
        const hoverWeight = satellite.hoverWeight
        const focusWeight = satellite.focusWeight
        // Satellites fly out from the planet with a bounce, in sequence
        const sIntro = easeOutBack(clamp01((elapsed - 0.35 - index * 0.09) / 1.1))
        satellite.angle += delta * satellite.layer.speed * (isActive ? 0.18 : 1)
        const bob = Math.sin(elapsed * 0.8 + index) * 0.04
        satellite.position.set(Math.cos(satellite.angle) * satellite.layer.radius, bob, Math.sin(satellite.angle) * satellite.layer.radius)
        satellite.position.applyAxisAngle(orbitAxisX, satellite.layer.inclination)
        satellite.position.applyAxisAngle(orbitAxisY, satellite.layer.node)
        satellite.position.multiplyScalar(orbitScale * sIntro)
        satellite.sprite.position.copy(satellite.position)
        satellite.glow.position.copy(satellite.position)
        satellite.selectionRing.position.copy(satellite.position)
        satellite.selectionRing.material.rotation = elapsed * 1.15
        satellite.selectionRing.material.opacity = hoverWeight * focusWeight * 0.95
        satellite.selectionRing.scale.setScalar(0.9 + hoverWeight * (0.14 + Math.sin(elapsed * 4) * 0.04))

        satellite.sprite.getWorldPosition(satelliteWorldPosition)
        occlusionRay.origin.copy(cameraWorldPosition)
        occlusionRay.direction.subVectors(satelliteWorldPosition, cameraWorldPosition).normalize()
        const satelliteDistance = cameraWorldPosition.distanceTo(satelliteWorldPosition)
        const planetIntersection = occlusionRay.intersectSphere(occlusionSphere, occlusionPoint)
        satellite.occluded = Boolean(planetIntersection && cameraWorldPosition.distanceTo(occlusionPoint) < satelliteDistance - 0.02)
        satellite.sprite.visible = !satellite.occluded
        satellite.glow.visible = !satellite.occluded
        satellite.selectionRing.visible = !satellite.occluded

        const connectionPositions = satellite.connection.geometry.attributes.position
        connectionPositions.setXYZ(0, 0, 0, 0)
        connectionPositions.setXYZ(1, satellite.position.x, satellite.position.y, satellite.position.z)
        connectionPositions.needsUpdate = true
        const connectionDistances = satellite.connection.geometry.attributes.lineDistance
        connectionDistances.setX(1, satellite.position.length())
        connectionDistances.needsUpdate = true
        const pulse = (elapsed * (0.35 + (index % 4) * 0.08) + index * 0.13) % 1
        satellite.signal.position.copy(satellite.position).multiplyScalar(pulse)
        satellite.connection.material.opacity = (0.28 + hoverWeight * 0.52) * focusWeight
        satellite.signal.material.opacity = (0.68 + hoverWeight * 0.32) * focusWeight
        satellite.sprite.scale.setScalar((0.66 + hoverWeight * 0.1) * (0.78 + focusWeight * 0.22))
        satellite.glow.scale.setScalar(0.5 + hoverWeight * 0.38)
        satellite.glow.material.opacity = (0.48 + hoverWeight * 0.48) * focusWeight
        satellite.sprite.material.opacity = (0.28 + focusWeight * 0.72) * (0.82 + hoverWeight * 0.18)

        // Depth fade: back satellites dim, front ones stay bright
        worldPos.copy(satelliteWorldPosition)
        const depthFade = (0.62 + 0.38 * clamp01(0.5 + worldPos.z / 10)) * clamp01(sIntro)
        satellite.sprite.material.opacity *= depthFade
        satellite.glow.material.opacity *= depthFade
      })

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index]
        ripple.age += delta
        const progress = Math.min(1, ripple.age / 0.9)
        ripple.mesh.scale.setScalar(0.25 + progress * 2.8)
        ripple.mesh.material.opacity = (1 - progress) * 0.65
        if (progress === 1) {
          scene.remove(ripple.mesh)
          ripple.mesh.geometry.dispose()
          ripple.mesh.material.dispose()
          ripples.splice(index, 1)
        }
      }
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(animate)

    const stopTrackingVisibility = trackViewport(root, (visible) => { running = visible; previous = performance.now() }, { threshold: 0.01 })

    return () => {
      cancelAnimationFrame(frame)
      stopTrackingSize()
      stopTrackingVisibility()
      root.removeEventListener('pointermove', movePointer)
      root.removeEventListener('pointerleave', leavePointer)
      root.removeEventListener('click', clickPointer)
      root.removeEventListener('technology:activate', activateLegendTechnology)
      root.removeEventListener('technology:clear', clearLegendTechnology)
      root.removeEventListener('technology:focus-layer', focusTechnologyLayer)
      document.removeEventListener('visibilitychange', visibility)
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => { if (material.map) material.map.dispose(); material.dispose() })
        }
      })
      glowTexture.dispose()
      haloTexture.dispose()
      selectionRingTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
}

export default function TechStack() {
  const rootRef = useRef(null)
  const focusedOrbitRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [pinnedTechnology, setPinnedTechnology] = useState(null)
  const [focusedOrbit, setFocusedOrbit] = useState(null)
  const technologies = useMemo(() => technologyGroups.flatMap((group) => group.items.map((technology) => ({
    ...technology,
    name: technology.name === 'Express' ? 'Express.js' : technology.name,
  }))).filter((technology) => !hiddenOrbitTechnologyNames.has(technology.name)), [])
  const orbitTechnologies = useMemo(() => technologies, [technologies])
  const selectedTechnology = technologies.find((technology) => technology.name === selected)
  const selectedLayer = selectedTechnology ? legendGroups.find((group) => group.layer === orbitLayerByName[selectedTechnology.name]) : null
  const selectedLayerNames = selectedLayer?.names.map((name) => name === 'Express' ? 'Express.js' : name) ?? []
  const relatedTechnologies = selectedLayerNames.filter((name) => name !== selectedTechnology?.name)
  const activateTechnology = (name, pinned = false) => {
    rootRef.current?.dispatchEvent(new CustomEvent('technology:activate', { detail: { name, pinned } }))
  }
  const clearTechnology = (clearPinned = false) => {
    rootRef.current?.dispatchEvent(new CustomEvent('technology:clear', { detail: { clearPinned } }))
  }
  const focusTechnologyOrbit = (index) => {
    const next = focusedOrbit === index ? null : index
    focusedOrbitRef.current = next
    setFocusedOrbit(next)
    setPinnedTechnology(null)
    setSelected(null)
    rootRef.current?.dispatchEvent(new CustomEvent('technology:focus-layer', { detail: { index: next } }))
  }
  const togglePinnedTechnology = (name) => {
    if (pinnedTechnology === name) {
      setPinnedTechnology(null)
      setSelected(null)
      clearTechnology(true)
      return
    }
    setPinnedTechnology(name)
    setSelected(name)
    activateTechnology(name, true)
  }
  useTechnologyUniverse(rootRef, orbitTechnologies, setSelected, setPinnedTechnology, setFocusedOrbit, focusedOrbitRef)

  return (
    <section aria-labelledby="tech-stack-heading" className="relative isolate overflow-hidden bg-[#000] px-5 py-14 text-white sm:px-8 sm:py-[76px] lg:px-10">
      <Container>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="tech-stack-heading"
              align="left"
              eyebrow={technologyPageCopy.eyebrow}
              title={technologyPageCopy.title}
              accent={technologyPageCopy.accent}
              description={technologyPageCopy.description}
              className="!mx-0 !mb-0 max-w-[760px]"
              eyebrowClassName="!min-h-0 !px-3.5 !py-1.5 !text-[.72rem] !tracking-[.18em]"
              titleClassName="!mt-[18px] !max-w-none !text-[clamp(2rem,5vw,3rem)] !font-extrabold !leading-[1.08] !tracking-[-.03em]"
              contentClassName="!mt-3.5 !text-[1.02rem] !leading-[1.65]"
            />
            <div className="grid w-full max-w-[330px] shrink-0 grid-cols-2 gap-3">
              {[
                { label: 'Satellites', value: orbitTechnologies.length },
                { label: 'Orbit layers', value: orbitLayers.length },
              ].map(({ label, value }, index) => (
                <div key={label} className={`relative overflow-hidden rounded-[20px] border border-white/[.09] bg-[linear-gradient(145deg,rgb(var(--site-bg-rgb)/0.92),rgb(var(--site-bg-rgb)/0.94))] px-4 py-4 shadow-[inset_0_1px_0_rgb(var(--site-white-rgb)/0.06)] transition-[border-color,box-shadow] duration-[240ms] animate-[tech-universe-float_4s_ease-in-out_infinite] motion-reduce:animate-none hover:border-[rgb(var(--site-accent-light-rgb)/0.55)] hover:shadow-[0_0_24px_rgb(var(--site-accent-rgb)/0.18),inset_0_1px_0_rgb(var(--site-white-rgb)/0.1)] ${index === 1 ? '[animation-delay:.6s]' : ''}`}>
                  <span aria-hidden="true" className="absolute -right-4 -top-5 size-16 rounded-full bg-[radial-gradient(circle,rgb(var(--site-accent-rgb)/0.28),transparent_70%)]" />
                  <b className="relative block text-[28px] font-bold leading-none tracking-[-.04em] text-white">{String(value).padStart(2, '0')}</b>
                  <span className="relative mt-2 block text-[9px] font-semibold uppercase tracking-[.16em] text-white/55">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(340px,.78fr)] lg:gap-6">
            <div className="relative isolate min-w-0 overflow-hidden rounded-[28px] border border-[var(--site-accent)]/30 bg-[var(--site-bg)] shadow-[0_28px_90px_-42px_rgb(var(--site-accent-rgb)/0.38),inset_0_0_80px_rgb(var(--site-accent-rgb)/0.08)] sm:rounded-[32px]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_48%,rgb(var(--site-accent-rgb)/0.2),transparent_66%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-30 [background-image:linear-gradient(rgb(var(--site-accent-rgb)/0.16)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--site-accent-rgb)/0.16)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,var(--site-black)_12%,transparent_78%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[var(--site-accent-light)]/70 to-transparent" />
              <div className="pointer-events-none absolute left-4 top-4 z-[2] flex items-center gap-2.5 rounded-full border border-white/[.08] bg-black/45 px-3 py-2 text-[9px] font-semibold uppercase tracking-[.16em] text-[var(--site-white-soft)] backdrop-blur-md sm:left-5 sm:top-5">
                <i className="size-[7px] rounded-full bg-[var(--site-accent)] shadow-[0_0_10px_var(--site-accent)]" />
                Live technology orbit
              </div>
              <div className="pointer-events-none absolute right-4 top-4 z-[2] hidden items-center gap-2 rounded-full border border-white/[.08] bg-black/45 px-3 py-2 font-mono text-[8px] font-semibold tracking-[.12em] text-white/55 backdrop-blur-md sm:flex sm:right-5 sm:top-5">
                <span className="size-1.5 rounded-full bg-[var(--site-accent-light)]" />
                {String(orbitTechnologies.length).padStart(2, '0')} LINKED SATELLITES
              </div>
              <p className="pointer-events-none absolute bottom-3 left-1/2 z-[2] hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[.07] bg-black/35 px-3 py-1.5 font-mono text-[8px] font-medium uppercase tracking-[.14em] text-white/50 backdrop-blur-md sm:block">Hover or tap an icon <span className="px-1 text-[var(--site-accent-light)]">·</span> Move to tilt</p>
              <section ref={rootRef} aria-label="Interactive 3D technology universe" className="relative z-[1] h-[min(74svh,700px)] min-h-[420px] overflow-hidden sm:h-[min(80vh,820px)] sm:min-h-[560px]">
              </section>
              {selectedTechnology && selectedLayer && (
                <div aria-label={`${selectedTechnology.name} technology details`} aria-live="polite" className="pointer-events-none absolute inset-x-3 bottom-3 z-[3] grid grid-cols-2 gap-2 sm:inset-x-5 sm:bottom-5 sm:grid-cols-4 sm:gap-2.5">
                  <div className="min-w-0 rounded-xl border border-white/[.1] bg-black/75 p-2.5 backdrop-blur-md sm:p-3">
                    <span className="block font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/45">Technology</span>
                    <span className="mt-1.5 flex min-w-0 items-center gap-1.5 text-[11px] font-bold text-white sm:text-xs">
                      <TechIcon name={selectedTechnology.icon} size="size-5 shrink-0" />
                      <span className="truncate">{selectedTechnology.name}</span>
                    </span>
                  </div>
                  <div className="min-w-0 rounded-xl border border-white/[.1] bg-black/75 p-2.5 backdrop-blur-md sm:p-3">
                    <span className="block font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/45">Stack layer</span>
                    <span className="mt-2 block truncate text-[11px] font-bold text-white sm:text-xs">{selectedLayer.title}</span>
                  </div>
                  <div className="min-w-0 rounded-xl border border-white/[.1] bg-black/75 p-2.5 backdrop-blur-md sm:p-3">
                    <span className="block font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/45">Related tools</span>
                    <span className="mt-2 block truncate text-[10px] font-semibold text-white/80 sm:text-[11px]">{relatedTechnologies.join(' · ') || 'No related tools'}</span>
                  </div>
                  <div className="min-w-0 rounded-xl border border-white/[.1] bg-black/75 p-2.5 backdrop-blur-md sm:p-3">
                    <span className="block font-mono text-[8px] font-semibold uppercase tracking-[.12em] text-white/45">Orbit layer</span>
                    <span className="mt-2 block text-[11px] font-bold text-white sm:text-xs">{String(selectedLayer.layer + 1).padStart(2, '0')} <span className="font-medium text-white/50">/ {String(orbitLayers.length).padStart(2, '0')} · {selectedLayerNames.length} tools</span></span>
                  </div>
                </div>
              )}
            </div>

            <aside aria-label="Technology stack layers" className="min-w-0">
              <div className="mb-3 flex items-end justify-between gap-3 px-1">
                <div>
                  <span className="block font-mono text-[9px] font-bold uppercase tracking-[.18em] text-[var(--site-accent-light)]">Tech stack</span>
                  <h3 className="mt-1 text-sm font-bold uppercase tracking-[.1em] text-white">Explore by layer</h3>
                </div>
                <span className="max-w-[96px] text-right font-mono text-[8px] font-semibold uppercase leading-[1.5] tracking-[.1em] text-white/40">Select a layer to focus the orbit</span>
              </div>
              <div className="grid min-w-0 grid-cols-2 gap-3">
                {legendGroups.map((group, groupIndex) => (
                  <section
                    key={group.title}
                    className={`group min-w-0 rounded-[18px] border p-3 transition duration-300 ${focusedOrbit !== null && focusedOrbit !== group.layer ? 'opacity-40' : 'opacity-100'} ${focusedOrbit === group.layer ? 'border-[var(--site-accent)]/40 bg-[var(--site-accent)]/[.06]' : 'border-white/[.07] bg-[linear-gradient(145deg,rgb(var(--site-bg-rgb)/0.72),rgb(var(--site-bg-rgb)/0.72))] hover:border-white/[.14]'}`}
                  >
                    <div className="mb-2 flex min-w-0 items-center gap-2">
                      <span className={`grid size-7 shrink-0 place-items-center rounded-[10px] border font-mono text-[8px] font-bold transition ${focusedOrbit === group.layer ? 'border-[var(--site-accent)]/40 bg-[var(--site-accent)]/15 text-[var(--site-white-soft)]' : 'border-white/[.08] bg-black/30 text-[var(--site-accent-light)]'}`}>0{groupIndex + 1}</span>
                      <Button asButton unstyled type="button" aria-pressed={focusedOrbit === group.layer} onClick={() => focusTechnologyOrbit(group.layer)} className={`min-w-0 rounded-lg border-0 bg-transparent px-1 py-0.5 text-left !text-[10px] !font-bold uppercase tracking-[.1em] outline-none transition hover:text-[var(--site-white-soft)] focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]/50 ${focusedOrbit === group.layer ? 'text-[var(--site-white-soft)]' : 'text-white'}`}>{group.title}</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {group.names.map((name) => {
                        const technology = technologies.find((item) => item.name === (name === 'Express' ? 'Express.js' : name))
                        if (!technology) return null
                        const isSelected = selected === technology.name
                        return (
                          <Button asButton unstyled
                            type="button"
                            key={name}
                            aria-pressed={pinnedTechnology === technology.name}
                            onMouseEnter={() => { setSelected(technology.name); activateTechnology(technology.name) }}
                            onMouseLeave={() => { if (pinnedTechnology !== technology.name) { setSelected(null); clearTechnology(false) } }}
                            onFocus={() => { setSelected(technology.name); activateTechnology(technology.name) }}
                            onBlur={() => { if (pinnedTechnology !== technology.name) { setSelected(null); clearTechnology(false) } }}
                            onClick={() => togglePinnedTechnology(technology.name)}
                            className={`group/chip inline-flex min-h-10 min-w-0 items-center gap-2 rounded-[11px] border px-2 py-1 text-left !text-[10px] !font-semibold text-white/75 outline-none transition duration-200 hover:-translate-y-0.5 hover:border-[var(--site-accent)]/55 hover:bg-[var(--site-accent)]/10 hover:text-white focus-visible:border-[var(--site-accent)] focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]/40 sm:!text-[11px] ${isSelected ? 'border-[var(--site-accent)]/60 bg-[var(--site-accent)]/15 text-white shadow-[0_6px_20px_rgb(var(--site-accent-rgb)/0.18)]' : 'border-white/[.07] bg-black/25'}`}
                          >
                            <span className="grid size-6 shrink-0 place-items-center rounded-[8px] border border-white/[.07] bg-black/35 transition group-hover/chip:bg-black/50"><TechIcon name={technology.icon} size="size-4" /></span>
                            <span className="min-w-0 whitespace-normal break-words leading-tight">{name}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  )
}