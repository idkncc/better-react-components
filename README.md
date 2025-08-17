# better-react-components

Roblox UI elements, but with builtin modifiers

> [!NOTE]
>
> Currently, I am rewriting this library from Typescript to Lua.
>
> I'll still publish this library to NPM.

## Setup guide

```
Dear Future Me.

Please, publish and write here, how to install this library from wally or npm

Respectfully,
  Past Me
```

## Development & Build from Scratch

1. Install Aftman and Make
2. Run:
   ```
   make install         # installs toolchain
   
   # Development stuff:
   make watch           # starts darklua's processer
   make serve           # starts rojo server

   # Buildin' stuff:
   make wally-package   # builds wally package at `build/wally/`
   make roblox-package  # builds roblox model file at `build/wally/better-react-components.rbxmx`
   ```

## Supported Components/Modifiers

### Components

- [ ] CanvasGroup
- [x] Frame
- [ ] ImageButton
- [x] TextButton
- [ ] ImageLabel
- [x] TextLabel
- [x] ScrollingFrame
- [x] TextBox
- [ ] VideoDisplay
- [ ] VideoFrame
- [ ] ViewportFrame
- [ ] LayerCollector
  - [ ] BillboardGui
  - [x] ScreenGui
  - [ ] SurfaceGui
- [ ] Path2D

### Modifiers

- [x] UIConstraint
  - [x] UIAspectRatioConstraint
  - [x] UISizeConstraint
  - [x] UITextSizeConstraint
- [x] UICorner (`CornerRadius` property)
- [ ] UIDragDetector
- [ ] UIGradient
- [x] UIPadding
- [ ] UIScale
- [x] UIStroke (`Border` property)


### Layouts

- [ ] UIGridLayout
- [x] UIListLayout
- [x] UIFlexItem
- [ ] UITableLayout
- [ ] UIPageLayout
