import BaseComponent from "../helpers/BaseComponent";

export type ScrollingFrameProps = {
	automaticCanvasSize?: Enum.AutomaticSize | "X" | "Y" | "XY"

	canvasPosition?: Vector2
	canvasSize?: UDim2

	/* Horizontal Scrollbar inset */
	scrollbarInsetH?: boolean | Enum.ScrollBarInset

	/* Vertical Scrollbar inset */
	scrollbarInsetV?: boolean | Enum.ScrollBarInset
}

export const ScrollingFrame = BaseComponent
	.expand<ScrollingFrame, ScrollingFrameProps>(
		(props) => ({
			AutomaticCanvasSize: props.automaticCanvasSize,

			CanvasPosition: props.canvasPosition,
			CanvasSize: props.canvasSize,

			HorizontalScrollBarInset:
				typeIs(props.scrollbarInsetH, "boolean") && props.scrollbarInsetH
					? Enum.ScrollBarInset.Always
					: props.scrollbarInsetH || Enum.ScrollBarInset.None,
			VerticalScrollBarInset:
				typeIs(props.scrollbarInsetV, "boolean") && props.scrollbarInsetV
					? Enum.ScrollBarInset.Always
					: props.scrollbarInsetV || Enum.ScrollBarInset.None,
		}),
		(props) => [],
	)
	.build("scrollingframe");
