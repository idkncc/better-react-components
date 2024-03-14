import { BaseProps, expandBase } from "../expandBase";

export type ScrollingFrameProps = BaseProps<ScrollingFrame> & {
	automaticCanvasSize?: Enum.AutomaticSize | "X" | "Y" | "XY"

	canvasPosition?: Vector2
	canvasSize?: UDim2

	/* Horizontal Scrollbar inset */
	scrollbarInsetH?: boolean | Enum.ScrollBarInset

	/* Vertical Scrollbar inset */
	scrollbarInsetV?: boolean | Enum.ScrollBarInset
}

export function ScrollingFrame(props: ScrollingFrameProps) {
	return expandBase<ScrollingFrame>(
		"scrollingframe",
		{
			AutomaticCanvasSize: props.automaticCanvasSize,

			CanvasPosition: props.canvasPosition,
			CanvasSize: props.canvasSize,

			HorizontalScrollBarInset:
				typeIs(props.scrollbarInsetV, "boolean") && props.scrollbarInsetV
					? Enum.ScrollBarInset.Always
					: props.scrollbarInsetV || Enum.ScrollBarInset.None,
			VerticalScrollBarInset:
				typeIs(props.scrollbarInsetV, "boolean") && props.scrollbarInsetV
					? Enum.ScrollBarInset.Always
					: props.scrollbarInsetV || Enum.ScrollBarInset.None,
		},
		props,
	);
}
