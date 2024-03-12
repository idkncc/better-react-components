# Modifiers && Utils

[Introduction](1_Introduction.md) • <u>Modifiers</u> • [Components](3_Components.md)

Roblox UI Modifiers, but in simpler way

## Modifiers

### Corner Radius

```tsx
<Frame
	cornerRadius={8}
	// or cornerRadius={new UDim(0, 8)} (same)
>
	...
</Frame>;
```

### Aspect Ratio

```tsx
<Frame
	aspectRatio={1}
	// aspectType={Enum.AspectType}
	// aspectAxis={Enum.DominantAxis}
>
	...
</Frame>;
```

### Stroke

```tsx
<Frame
	stroke={{ /* roblox props for UIStroke*/ }}
>
	...
</Frame>;
```

### Padding

```tsx
<Frame
	padding={4} // for top, left, bottom, right

	// or individually:
	// paddingTop={4}
	// paddingLeft={4}
	// paddingBottom={4}
	// paddingRight={4}
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