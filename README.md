# better-react-components

Roblox's UI elements, but with builtin modifiers

> ![NOTE]
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

## Development

1. Install Aftman and Make
2. Run:
   ```
   make install          # installs all toolchain, dependencies and patch sourcemap.json
   make serve            # starts rojo server
   make build            # builds .rbxmx (NOT IMPLEMENTED)

   make patch-sourcemaps # patches sourcemaps. needed after installing wally dependencies
   ```

## Supported Components/Modifiers

### Components

- [x] Frame
- [ ] ScrollableFrame
- [x] TextButton
- [ ] ImageButton
- [ ] Image
- [x] TextLabel
- [ ] TextBox
- [ ] CanvasGroup

### Modifiers

- [ ] UIAspectRatioConstraint
- [x] UICorner (`CornerRadius` property)
- [ ] UIGradient
- [ ] UIGridLayout
- [ ] UIListLayout
- [ ] UIFlexLayout
- [ ] UIPadding
- [ ] UIPageLayout
- [ ] UIScale
- [ ] UISizeConstraint
- [x] UIStroke (`Border` property)
- [ ] UITableLayout
- [ ] UITextSizeConstraint
