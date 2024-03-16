import TextComponent, { TextComponentProps } from "../helpers/TextComponent";

export const Button = TextComponent
	.expand<TextButton, TextComponentProps<TextButton>>()
	.build("textbutton");