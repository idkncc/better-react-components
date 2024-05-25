# Better React Components

![NPM Downloads](https://img.shields.io/npm/dm/%40rbxts%2Fbetter-react-components?style=for-the-badge)
![NPM Version](https://img.shields.io/npm/v/%40rbxts%2Fbetter-react-components?style=for-the-badge)

Roblox's ui elements, with builtin modifiers

Also see **[introduction](docs/1_Introduction.md)**

## Example

```tsx
<Frame
	position={new UDim2(.5, 0, .5, 0)}
	size={new UDim2(.5, 0, .5, 0)}

	anchorPoint={AnchorPoints.Middle}
	cornerRadius={8}
	padding={4}
>
	<GridLayout
		cellSize={new UDim2(.25, 0, .25, 0)}
		cellPadding={new UDim2(0, 4, 0, 4)}
		cellAspectRatio={1}
	/>

	<DummyElement />
	<Button
		textColor={"#64FEE7"}
		text="Hello world!"
	/>
	<Text
		background={"#64FEE7"}
		text="Hello there!"
		font={Enum.Font.Arial}
	/>
</Frame>;
```

## Support

### TODO

- [X] Stories
- [X] Support for Bindings in props
- [ ] Better documentation

### Components

- [X] Frame
- [X] ScrollableFrame
- [X] Button
- [ ] ImageButton
- [X] Text
- [X] Image
- [X] TextBox

### Modifiers

- [X] UIAspectRatioConstraint
- [X] UICorner
- [X] UIGradient
- [X] UIGridLayout [(see GridLayout)](src/components/GridLayout.tsx)
- [X] UIListLayout [(see ListLayout)](src/components/ListLayout.tsx)
- [ ] ~~UIFlexLayout~~ (waiting for production release 👀)
- [X] UIPadding
- [ ] UIPageLayout
- [X] UIScale
- [X] UISizeConstraint
- [X] UIStroke
- [ ] UITableLayout
- [X] UITextSizeConstraint

### Custom Modifiers

- [ ] FlowLayout [(view)](https://devforum.roblox.com/t/flow-flexbox-layout-for-lua/2614394)
