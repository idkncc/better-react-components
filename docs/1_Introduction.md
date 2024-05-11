# Introduction

<u>Introduction</u> • [Modifiers](2_Modifiers.md) • [Components](3_Components.md) • [Custom Components](4_Custom_Components.md)

> [!WARNING]
>
> Documentation is still in development. Best way to learn it – check out source code
>
> - [Base component](../src/expandBase.tsx)
> - [Frame](../src/components/Frame.ts)
> - [Text](../src/components/Text.ts)
> - [Button](../src/components/Button.ts)
> - _And other components at [/src/components/](../src/components)_
>
> Also see Hoarcekat stories at [/stories](../stories)
>

## Why?

This package can help You with Roblox's UI Modifiers

#### Before:

```tsx
<frame
	Position={new UDim2(.5, 0, .5, 0)}
	Size={new UDim2(.5, 0, .5, 0)}
	AnchorPoint={new Vector2(.5, .5)}
>
	<uigridlayout
		CellSize={new UDim2(.25, 0, .25, 0)}
		CellPadding={new UDim2(0, 4, 0, 4)}
	>
		<uiaspectratioconstraint AspectRatio={1} />
	</uigridlayout>

	<frame />
	<frame />
	<frame />
</frame>;
```

#### After:

```tsx
<Frame
	position={new UDim2(.5, 0, .5, 0)}
	size={new UDim2(.5, 0, .5, 0)}
	anchorPoint={"m"} // m - middle
	// or anchorPoint={AnchorPoints.Middle}
	// or anchorPoint={new Vector2(.5, .5)}
>
	<GridLayout
		cellSize={new UDim2(.25, 0, .25, 0)}
		cellPadding={new UDim2(0, 4, 0, 4)}
		cellAspectRatio={1}
	/>

	<frame />
	<frame />
	<frame />
</Frame>
```

## Installation

Pro tip: use [this @rbxts/react template](https://github.com/littensy/rbxts-react-example)

```bash
# install with any package manager:
pnpm add @rbxts/better-react-components
yarn add @rbxts/better-react-components
npm install @rbxts/better-react-components
```

## Usage:

```tsx
// import any component
import { Frame, Text } from "@rbxts/better-react-components";

...

// and use it!
return (
	<Frame>
		<Text text="Hello world!" />
	</Frame>
);

...
```

## Unusual behaviours

1. Borders are disabled by default. Also components use `UIStroke` instead of border properties
   ```tsx
   {/* no borders: */}
   <Frame> 
      ...
   </Frame>
   
   {/* red borders: */}
   <Frame 
    border={Color3.fromHex("#FF0000")}
    borderSize={1}
   > 
      ...
   </Frame>
   
   {/* attributes to UIStroke: */}
   <Frame stroke={{...}}> 
      ...
   </Frame>
   ```