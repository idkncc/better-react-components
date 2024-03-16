import BaseComponent from "./BaseComponent";
import { resolveColor3 } from "../utils";
import { InstanceEvent } from "@rbxts/react";

export type TextComponentInstance = TextLabel | TextButton | TextBox
export type TextComponentProps<T extends Instance = TextComponentInstance> = {
	text?: string,
	textColor?: Color3 | string

	textSize?: "AUTO" | number

	font?: Enum.Font | Font

	align?: Enum.TextXAlignment | "Left" | "Center" | "Right"
	verticalAlign?: Enum.TextYAlignment | "Top" | "Center" | "Bottom"

	event?: InstanceEvent<T>
}

export default BaseComponent
	.expand<TextComponentInstance, TextComponentProps>(
		(props) => ({
			Text: props.text,
			TextSize: props.textSize === "AUTO" ? 0 : props.textSize,
			TextScaled: props.textSize === "AUTO",
			TextColor3: resolveColor3(props.textColor),

			Font: typeIs(props.font, "Font") ? undefined : props.font,
			FontFace: typeIs(props.font, "Font") ? props.font : undefined,

			TextXAlignment: props.align,
			TextYAlignment: props.verticalAlign,
		}),
		(props) => [],
	);