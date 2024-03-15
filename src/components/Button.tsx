import { BaseProps, expandBase } from "../expandBase";
import { resolveColor3 } from "../utils";

export type ButtonProps = BaseProps<TextButton> & {
	text: string,
	textSize?: "AUTO" | number
	textColor?: Color3 | string

	font?: Enum.Font | Font

	align?: Enum.TextXAlignment | "Left" | "Center" | "Right"
	verticalAlign?: Enum.TextYAlignment | "Top" | "Center" | "Bottom"
}

export function Button(props: ButtonProps) {
	return expandBase<TextButton>(
		"textbutton",
		{
			Text: props.text,
			TextSize: props.textSize === "AUTO" ? 0 : props.textSize,
			TextScaled: props.textSize === "AUTO",
			TextColor3: resolveColor3(props.textColor),

			Font: typeIs(props.font, "Font") ? undefined : props.font,
			FontFace: typeIs(props.font, "Font") ? props.font : undefined,

			TextXAlignment: props.align,
			TextYAlignment: props.verticalAlign,
		},
		props,
	);
}
