# Modifiers && Utils

[Introduction](1_Introduction.md) • <u>Modifiers</u> • [Components](3_Components.md) • [Custom Components](4_Custom_Components.md)

Roblox UI Modifiers, but in simpler way

> [!TIP]
>
> All properties support Bindings!

## Default Modifiers

These modifiers are available on all components

> [!INFORMATION]
>
> [see **/src/helpers/BaseComponent.tsx**](../src/helpers/BaseComponent.tsx) for source code

### Standard properties

```tsx
<Frame
	visible={boolean}

	position={UDim2}
	size={UDim2}
	anchorPoint={ResolvableAnchorPoint}

	automaticSize={Enum.AutomaticSize | "X" | "Y" | "XY"}
>
	...
</Frame>;
```

### Override roblox

Add roblox's properties to element

```tsx
<Frame
	overrideRoblox={InstanceProps<Frame>}

	// for example:
	//  overrideRoblox={{ Rotation: 12, Style: ..., ZIndex: 5}}
>
	...
</Frame>;
```

### Background

```tsx
<Frame
	noBackground // same as backgroundTransparency={1}
	background={Color3 | string} // if its string, it will be converted from HEX value to Color3

	//
	// Gradients: (NEW)
	//  background={Array<Color3 | string> | Array<ColorSequenceKeypoint>}
	//
	// see example at /src/stories/tests/gradients.story.tsx
	//

	backgroundTransparency={number}
>
	...
</Frame>;
```

### Stroke (border)

Same as `UIStroke`

```tsx
<Frame
	border={Color3}
	borderSize={number}

	stroke={InstanceProps<UIStroke>} // custom props for UIStroke
>
	...
</Frame>;
```

### Corner Radius

Same as `UICorner`

```tsx
<Frame
	cornerRadius={8}
	// or cornerRadius={new UDim(0, 8)} (same)
>
	...
</Frame>;
```

### Aspect Ratio

Same as `UIAspectRatioConstraint`

```tsx
<Frame
	aspectRatio={1}
	// aspectType={Enum.AspectType}
	// aspectAxis={Enum.DominantAxis}
>
	...
</Frame>;
```

### Padding

Same as `UIPadding`

```tsx
<Frame
	padding={number} // for top, left, bottom, right

	// or individually:
	// paddingTop={number}
	// paddingLeft={number}
	// paddingBottom={number}
	// paddingRight={number}

	// also supports UDim
	// padding={UDim}
>
	...
</Frame>;
```

### Size Constraint

Same as `UISizeConstraint`

```tsx
<Frame
	minSize={Vector2} // min size in pixels
	maxSize={Vector2} // max size in pixels
>
	...
</Frame>;
```

### Text Size Constraint

Same as `UITextSizeConstraint`

```tsx
<Text
	minTextSize={number}
	maxTextSize={number}
>
	...
</Text>;
```

### Scale

Same as `UIScale`

```tsx
<Frame
	scale={number}
>
	...
</Frame>;
```

### Flex Item (BETA)

Same as `UIFlexItem`

```tsx
<Frame
	flex={InstanceProps<UIFlexItem>}
	flexMode={Enum.UIFlexMode}
>
	...
</Frame>;
```

## Utils

Some utils, used for building this components

### AnchorPoints

```tsx
import { AnchorPoints } from "@rbxts/better-react-components";

<Frame anchorPoint={AnchorPoints.TopLeft} />;
<Frame anchorPoint={AnchorPoints.Middle} />;
<Frame anchorPoint={AnchorPoints.BottomRight} />;
```

### resolveAnchorPoint

```tsx
import { AnchorPoints, resolveAnchorPoint } from "@rbxts/better-react-components";

resolveAnchorPoint("m")                      // Vector2(.5, .5)
resolveAnchorPoint(AnchorPoints.BottomRight) // Vector2(1, 1)

resolveAnchorPoint(new Vector2(x, y))        // Vector2(x, y)
```

### resolveUDim

```tsx
import { resolveUDim } from "@rbxts/better-react-components";

resolveUDim(8)              // UDim(0, 8)
resolveUDim(n)              // UDim(0, n)

resolveUDim(new UDim(a, b)) // UDim(a, b)
```

### calculateAspectRatio

Easy calculate aspect ratio for object, can be used while development

```tsx
import { Frame } from "@rbxts/better-react-components";

const { calculateAspectRatio } = Helper;

<Frame
	size={UDim2.fromScale(.6, .65)}

	// sizes in percents, not in pixels.
	// To calculate aspect ratio, use:
	ref={calculateAspectRatio}

	// on rendering, in console use will see (example):
	//  [CALC_ASPECT_RATIO](2): 1.8844717137
	// now, you can use 1.88 as aspect ratio
	// aspectRatio={1.88}
>
	{/* ... */}
</Frame>;
```

### createColorSequence

Creates ColorSequence from `Array<ColorOrHex> | Array<ColorSequenceKeypoint> | ColorSequence`

```ts
import {Helpers} from "@rbxts/better-react-components";

const { createColorSequence } = Helpers.Gradient;

createColorSequence(["#FF0000", "#0000FF"]);
createColorSequence([new Color3(.5, 0, 0), new Color3(0, 0, .5)]);

createColorSequence([
	new ColorSequenceKeypoint(0, Color3.fromRGB(255, 0, 0)),
	new ColorSequenceKeypoint(0.5, Color3.fromRGB(0, 190, 200)),
	new ColorSequenceKeypoint(1, Color3.fromRGB(190, 0, 255)),
]);

createColorSequence(
	new ColorSequence([
		new ColorSequenceKeypoint(0, Color3.fromRGB(255, 0, 0)),
		new ColorSequenceKeypoint(0.5, Color3.fromRGB(0, 190, 200)),
		new ColorSequenceKeypoint(1, Color3.fromRGB(190, 0, 255)),
	]),
);
```