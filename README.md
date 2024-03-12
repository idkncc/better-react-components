# Better React Components

Roblox's elements, with builtin modifiers

Also see **[introduction](docs/1_Introduction.md)**

## Example

```tsx
<Frame
	position={new UDim2(.5, 0, .5, 0)}
	size={new UDim2(.5, 0, .5, 0)}

	anchorPoint={"m"}
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
		position={new UDim2(0, 0, 0, 0)} size={new UDim2(0, 0, 0, 0)}
		textColor={Color3.fromHex("#64FEE7")}
		text="Hello world!"
	/>
	<Text
		position={new UDim2(0, 0, 0, 0)} size={new UDim2(0, 0, 0, 0)}
		background={Color3.fromHex("#64FEE7")
		text="Hello world!"
	/>
</Frame>;
```

