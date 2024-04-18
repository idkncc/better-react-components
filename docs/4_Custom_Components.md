# Custom Components

[Introduction](1_Introduction.md) • [Modifiers](2_Modifiers.md) • [Components](3_Components.md) • <u>Custom
Components</u>

## Terms

[**ExpandableComponent**](../src/helpers/ExpandableComponent.ts) - is a class, that has arrays of builders.
It could be expanded by method `expand(propBuilder, childrenBuilder)` and could build a component function using `build(elementType)`

**Prop Builder** - is a function, that takes user props (`background`, `text`, `position`) and 
returns some additional Roblox's attributes (`BackgroundColor3`, `Text`, `Position`)

**Children Builder** - is a function, that takes user props (`cornerRadius`, `aspectRatio`) and
returns some additional Roblox's UIModifiers (`UICorner`, `UIAspectRatioConstraint`)

## Builtin

All builtin components are based of [BaseComponent](../src/helpers/BaseComponent.tsx), that creates
some basic props and children _(see implementation)_

[TextComponent](../src/helpers/TextComponent.ts) is expanded from BaseComponent and created for text 
based elements (`TextButton`, `TextLabel`, etc)

## Custom components

```ts
import {Helpers} from "@rbxts/better-react-components"
const BaseComponent = Helpers.BaseComponent

type AdditionalImageProps = {
	image: string
}

// taking base component
const ImageButtonComponent = BaseComponent
	// expanding it
	// generics: <Instance, AdditionalUserProps>
	.expand<ImageButton, AdditionalImageProps>(
		// propsBuilder, that returns additional props
		(userProps) => ({
			Image: userProps.image,
		}),

		// no children builder, because we dont need additional modifiers
	);

// and now build a function
const FancyImageButton = ImageButtonComponent
	.build("imagebutton");
```

> [!NOTE]
> 
> - `ImageButtonComponent` - ExpandableComponent **(not for rendering!)**
> - `FancyImageButton` - Function **(for rendering!)**

```tsx
// use it 😎:
return (
	<FancyImageButton
		anchorPoint={AnchorPoints.Middle}
		position={new UDim2(.5, 0, .5, 0)}
		size={new UDim2(.5, 0, .5, 0)}
		image={"rbxassetid://..."}
	/>
);
```