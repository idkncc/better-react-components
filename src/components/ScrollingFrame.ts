import Object from "@rbxts/object-utils";
import BaseComponent from "../helpers/BaseComponent";

import { resolveColor3 } from "../utils";
import { getBindingValue, mapBinding } from "@rbxts/pretty-react-hooks";

import type { InstanceAttributes } from "@rbxts/react";

export type ScrollingFrameProps = {
    automaticCanvasSize?: Enum.AutomaticSize

    canvasPosition?: Vector2
    canvasSize?: UDim2

    direction?: Enum.ScrollingDirection

    /* Horizontal Scrollbar inset */
    scrollbarInsetH?: Enum.ScrollBarInset | boolean

    /* Vertical Scrollbar inset */
    scrollbarInsetV?: Enum.ScrollBarInset | boolean

    scrollbar?: Scrollbar | false
}

export type Scrollbar = {
    topImage?: string
    midImage?: string
    bottomImage?: string

    imageColor?: Color3 | string
    imageTransparency?: number
}

export const ScrollingFrameComponent = BaseComponent
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

                ScrollBarImageColor3: mapBinding(props.scrollbar, (scrollbar) => scrollbar && getBindingValue(resolveColor3(scrollbar.imageColor))),
                ScrollBarImageTransparency: mapBinding(props.scrollbar, (scrollbar) => scrollbar && scrollbar.imageTransparency),

            } as InstanceAttributes<ScrollingFrame>,
        ),
    );

export const ScrollingFrame = ScrollingFrameComponent.build("scrollingframe");
