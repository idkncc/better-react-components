import { BaseProps, expandBase } from "../expandBase";
import { resolveColor3 } from "../utils";

export type TextProps = BaseProps<TextButton> & {
	text: string,
	textColor?: Color3 | string

	textSize?: "AUTO" | number

	font?: Enum.Font | Font

	align?: Enum.TextXAlignment | "Left" | "Center" | "Right"
	verticalAlign?: Enum.TextYAlignment | "Top" | "Center" | "Bottom"
}

export function Text(props: TextProps) {
	return expandBase<TextButton>("textlabel",
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
