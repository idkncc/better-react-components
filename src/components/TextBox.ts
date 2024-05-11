import TextComponent, { TextComponentProps } from "../helpers/TextComponent";

import { resolveColor3 } from "../utils";

type TextBoxProps = {
	placeholder?: string
	placeholderColor?: Color3 | string,

	textEditable?: boolean,
	clearTextOnFocus?: boolean
}

export const TextBoxComponent = TextComponent
	.expand<TextBox, TextComponentProps<TextBox> & TextBoxProps>(
		(props) => ({
			PlaceholderText: props.placeholder,
			PlaceholderColor3: resolveColor3(props.placeholderColor),

			TextEditable: props.textEditable,
			ClearTextOnFocus: props.clearTextOnFocus,
		}),
	);

export const TextBox = TextBoxComponent.build("textbox");