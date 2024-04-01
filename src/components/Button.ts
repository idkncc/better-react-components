import TextComponent, { TextComponentProps } from "../helpers/TextComponent";

type ButtonProps = TextComponentProps<TextButton> & {
	autoButtonColor: boolean
}

export const Button = TextComponent
	.expand<TextButton, ButtonProps>(
		(props) => ({
			AutoButtonColor: props.autoButtonColor,
		}),
	)
	.build("textbutton");