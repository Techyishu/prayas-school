# 3D Model Assets

This folder is prepared for your GLB 3D model files.

## Expected Files

Once you have your AI-generated models ready, place them here:

1. **earth_globe.glb** - Rotating earth with immigration paths
   - Source: Spline AI prompt: "rotating earth immigration paths"
   - Usage: Hero section globe

2. **passport_card.glb** - Holographic passport card
   - Source: Meshy AI prompt: "holographic passport card"
   - Usage: Floating passport cards in hero

3. **visa_icons.glb** - Service icons pack
   - Source: IconScout free pack or Meshy AI
   - Usage: Services section 3D icons

## Current State

Currently using **procedural 3D placeholders** built with:
- `@react-three/drei` primitives (Sphere, Box, RoundedBox)
- Custom geometries for the globe wireframe
- Metallic materials with distortion effects

## To Use Custom Models

Once you have GLB files:

1. Place them in this `/public/models/` folder
2. Update the component imports to use `useGLTF`:

```tsx
import { useGLTF } from '@react-three/drei'

function MyModel() {
    const { scene } = useGLTF('/models/earth_globe.glb')
    return <primitive object={scene} />
}
```

## Free 3D Model Sources

- [Spline](https://spline.design) - AI-generated 3D
- [Meshy](https://meshy.ai) - Text-to-3D AI
- [Sketchfab](https://sketchfab.com) - Free GLB models
- [IconScout](https://iconscout.com) - 3D icon packs
- [Poly Pizza](https://poly.pizza) - Free low-poly models
