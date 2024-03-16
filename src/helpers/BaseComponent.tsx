import ExpandableComponent from "./ExpandableComponent";
import { ReactProps, ResolvableAnchorPoint, resolveAnchorPoint, resolveColor3, resolveUDim } from "../utils";
import { InstanceProps } from "@rbxts/react";
import React from "@rbxts/react";

export type BaseProps<T extends Instance> = ReactProps<T> & {
	visible?: boolean,

	noBackground?: boolean
	background?: Color3 | string
	backgroundTransparency?: number

	border?: Color3 | string
	borderMode?: Enum.ApplyStrokeMode | "Contextual" | "Border"
	borderSize?: number

	position?: UDim2
	size?: UDim2,
	anchorPoint?: ResolvableAnchorPoint
	automaticSize?: Enum.AutomaticSize | "X" | "Y" | "XY"

	cornerRadius?: number | UDim

	aspectRatio?: number
	aspectType?: Enum.AspectType
	aspectAxis?: Enum.DominantAxis

	stroke?: InstanceProps<UIStroke>

	padding?: number | UDim
	paddingLeft?: number | UDim
	paddingRight?: number | UDim
	paddingTop?: number | UDim
	paddingBottom?: number | UDim

	minSize?: Vector2
	maxSize?: Vector2

	minTextSize?: number
	maxTextSize?: number
}

export default new ExpandableComponent<GuiObject, BaseProps<GuiObject>>([], [])
	.expand(
		(userProps) => ({
			Visible: userProps.visible,

			BackgroundColor3: resolveColor3(userProps.background),
			BackgroundTransparency: userProps.noBackground ? 1 : (userProps.backgroundTransparency ?? 0),

			AutomaticSize: userProps.automaticSize,

			Position: userProps.position,
			Size: userProps.size,
			AnchorPoint: resolveAnchorPoint(userProps.anchorPoint ?? new Vector2(0, 0)),

			Event: userProps.event,
			Change: userProps.change,
			Tag: userProps.tag,
			ref: userProps.ref,

			BorderSizePixel: 0, // we use UIStroke instead

			...userProps.overrideRoblox,
		}),
		(userProps) => [
			userProps.cornerRadius !== undefined
				? <uicorner CornerRadius={resolveUDim(userProps.cornerRadius)} />
				: undefined,

			// Aspect Ratio
			userProps.aspectRatio !== undefined
				? <uiaspectratioconstraint
					AspectRatio={userProps.aspectRatio}
					AspectType={userProps.aspectType}
					DominantAxis={userProps.aspectAxis}
				/>
				: undefined,

			// Stroke (border)
			userProps.stroke !== undefined
			|| userProps.border !== undefined || userProps.borderSize !== undefined
				? <uistroke
					Color={resolveColor3(userProps.border)}
					Thickness={userProps.borderSize}
					ApplyStrokeMode={userProps.borderMode}
					{...userProps.stroke}
				/>
				: undefined,

			// Padding
			userProps.padding !== undefined
			|| userProps.paddingLeft !== undefined || userProps.paddingRight !== undefined
			|| userProps.paddingTop !== undefined || userProps.paddingBottom !== undefined
				? <uipadding
					PaddingRight={resolveUDim(userProps.paddingRight ?? userProps.padding ?? 0)}
					PaddingLeft={resolveUDim(userProps.paddingLeft ?? userProps.padding ?? 0)}
					PaddingTop={resolveUDim(userProps.paddingTop ?? userProps.padding ?? 0)}
					PaddingBottom={resolveUDim(userProps.paddingBottom ?? userProps.padding ?? 0)}
				/>
				: undefined,

			// Size constraint
			userProps.minSize !== undefined || userProps.maxSize !== undefined
				? <uisizeconstraint MinSize={userProps.minSize} MaxSize={userProps.maxSize} />
				: undefined,

			// Text Size constraint

			userProps.minTextSize !== undefined || userProps.maxTextSize !== undefined
				? <uitextsizeconstraint
					MinTextSize={userProps.minTextSize ?? 1}
					MaxTextSize={userProps.maxTextSize}
				/>
				: undefined,

			userProps.children,
		],
	);