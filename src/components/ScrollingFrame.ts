import Object from "@rbxts/object-utils";
import BaseComponent from "../helpers/BaseComponent";

import { resolveColor3 } from "../utils";

import type { InstanceAttributes } from "@rbxts/react";
import { mapBinding } from "@rbxts/pretty-react-hooks";

export type ScrollingFrameProps = {
	automaticCanvasSize?: Enum.AutomaticSize

	canvasPosition?: Vector2
	canvasSize?: UDim2

	direction?: Enum.ScrollingDirection

	/* Horizontal Scrollbar inset */
	scrollbarInsetH?: Enum.ScrollBarInset | boolean

	/* Vertical Scrollbar inset */
	scrollbarInsetV?: Enum.ScrollBarInset

	scrollbar?: Scrollbar | false
}

export type Scrollbar = {
	topImage?: string
	midImage?: string
	bottomImage?: string

	imageColor?: Color3 | string
	imageTransparency?: number
}

export const ScrollingFrame = BaseComponent
	.expand<ScrollingFrame, ScrollingFrameProps>(
		(props) => Object.assign(
			{
				AutomaticCanvasSize: props.automaticCanvasSize,

				CanvasPosition: props.canvasPosition,
				CanvasSize: props.canvasSize,

				HorizontalScrollBarInset: mapBinding(
					props.scrollbarInsetH,
					(scrollbarInsetH) =>
						typeIs(scrollbarInsetH, "boolean") && scrollbarInsetH
							? Enum.ScrollBarInset.Always
							: (scrollbarInsetH as Enum.ScrollBarInset) || Enum.ScrollBarInset.None,
				),
				VerticalScrollBarInset: mapBinding(
					props.scrollbarInsetV,
					(scrollbarInsetV) =>
						typeIs(scrollbarInsetV, "boolean") && scrollbarInsetV
							? Enum.ScrollBarInset.Always
							: (scrollbarInsetV as Enum.ScrollBarInset) || Enum.ScrollBarInset.None,
				),

				ScrollingDirection: props.direction,
				ScrollingEnabled: mapBinding(props.scrollbar, (scrollbar) => !typeIs(scrollbar, "boolean")),
			} as InstanceAttributes<ScrollingFrame>,

			// scrollbar settings
			{
				TopImage: mapBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.topImage),
				MidImage: mapBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.midImage),
				BottomImage: mapBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.bottomImage),

				ScrollBarImageColor3: mapBinding(props.scrollbar, (scrollbar) => scrollbar && resolveColor3(scrollbar.imageColor) as Color3),
				ScrollBarImageTransparency: mapBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.imageTransparency),

			} as InstanceAttributes<ScrollingFrame>,
		),
	)
	.build("scrollingframe");
