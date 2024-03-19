import Object from "@rbxts/object-utils";
import BaseComponent from "../helpers/BaseComponent";

import { resolveBinding, resolveColor3 } from "../utils";

import type { InstanceAttributes } from "@rbxts/react";

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

				ScrollingDirection: props.direction,
				ScrollingEnabled: resolveBinding(props.scrollbar, (scrollbar) => !typeIs(scrollbar, "boolean")),
			} as InstanceAttributes<ScrollingFrame>,

			// scrollbar settings
			{
				TopImage: resolveBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.topImage),
				MidImage: resolveBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.midImage),
				BottomImage: resolveBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.bottomImage),

				ScrollBarImageColor3: resolveBinding(props.scrollbar, (scrollbar) => scrollbar && resolveColor3(scrollbar.imageColor) as Color3),
				ScrollBarImageTransparency: resolveBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.imageTransparency),

			} as InstanceAttributes<ScrollingFrame>,
		),
	)
	.build("scrollingframe");
