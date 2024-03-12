import { BaseProps, expandBase } from "../expandBase";

export type ButtonProps = BaseProps<TextButton> & {
	text: string,
	textSize?: "AUTO" | number
	textColor?: Color3
}

export function Button(props: ButtonProps) {
	return expandBase<TextButton>(
		"textbutton",
		{
			Text: props.text,
			TextSize: props.textSize === "AUTO" ? 0 : props.textSize,
			TextScaled: props.textSize === "AUTO",
			TextColor3: props.textColor,
		},
		props,
	);
}
