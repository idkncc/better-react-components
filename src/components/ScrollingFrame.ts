import BaseComponent from "../helpers/BaseComponent";
import { resolveBinding } from "../utils";
import { InferEnumNames } from "@rbxts/react";

export type ScrollingFrameProps = {
	automaticCanvasSize?: Enum.AutomaticSize

	canvasPosition?: Vector2
	canvasSize?: UDim2

	/* Horizontal Scrollbar inset */
	scrollbarInsetH?: Enum.ScrollBarInset | boolean

	/* Vertical Scrollbar inset */
	scrollbarInsetV?: Enum.ScrollBarInset
}

export const ScrollingFrame = BaseComponent
	.expand<ScrollingFrame, ScrollingFrameProps>(
		(props) => ({
			AutomaticCanvasSize: props.automaticCanvasSize,

			CanvasPosition: props.canvasPosition,
			CanvasSize: props.canvasSize,

			HorizontalScrollBarInset: resolveBinding(
				props.scrollbarInsetH,
				(scrollbarInsetH) =>
					typeIs(scrollbarInsetH, "boolean") && scrollbarInsetH
						? Enum.ScrollBarInset.Always
						: (scrollbarInsetH as Enum.ScrollBarInset) || Enum.ScrollBarInset.None,
			),
			VerticalScrollBarInset: resolveBinding(
				props.scrollbarInsetV,
				(scrollbarInsetV) =>
					typeIs(scrollbarInsetV, "boolean") && scrollbarInsetV
						? Enum.ScrollBarInset.Always
						: (scrollbarInsetV as Enum.ScrollBarInset) || Enum.ScrollBarInset.None,
			),
		}),
		(props) => [],
	)
	.build("scrollingframe");
