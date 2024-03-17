import BaseComponent from "./BaseComponent";
import { resolveBinding, resolveColor3 } from "../utils";
import { createBinding, InferEnumNames, InstanceEvent } from "@rbxts/react";

export type TextComponentInstance = TextLabel | TextButton | TextBox
export type TextComponentProps<T extends Instance = TextComponentInstance> = {
	text?: string,
	textColor?: Color3 | string

	textSize?: number

	font?: Enum.Font | Font

	align?: Enum.TextXAlignment
	verticalAlign?: Enum.TextYAlignment

	event?: InstanceEvent<T>
}

export default BaseComponent
	.expand<TextComponentInstance, TextComponentProps>(
		(props) => ({
			Text: props.text,
			TextSize: props.textSize,
			TextScaled: false,
			TextColor3: resolveColor3(props.textColor),

			FontFace: resolveBinding<Enum.Font | Font, Font>(
				props.font as Enum.Font | Font,
				(font) =>
					typeIs(font, "Font")
						? font
						: typeIs(font, "string")
							? Font.fromEnum(Enum.Font[font as InferEnumNames<Enum.Font>])
							: Font.fromEnum(font),
			),

			TextXAlignment: props.align,
			TextYAlignment: props.verticalAlign,
		}),
		(props) => [],
	);