# Better React Components

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
- [ ] Image
- [X] TextBox

### Modifiers

- [X] UIAspectRatioConstraint
- [X] UICorner
- [ ] UIGradient
- [X] UIGridLayout [(see GridLayout)](src/components/GridLayout.tsx)
- [X] UIListLayout [(see ListLayout)](src/components/ListLayout.tsx)
- [X] UIPadding
- [ ] UIPageLayout
- [ ] UIScale
- [X] UISizeConstraint
- [X] UIStroke
- [ ] UITableLayout
- [X] UITextSizeConstraint
