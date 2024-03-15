import React, { InstanceAttributes, InstanceProps } from "@rbxts/react";
import { ReactProps, ResolvableAnchorPoint, resolveAnchorPoint, resolveUDim } from "./utils";

export type BaseProps<T extends Instance> = ReactProps<T> & {
	visible?: boolean,

	noBackground?: boolean
	background?: Color3
	backgroundTransparency?: number

	border?: Color3
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
}

/**
 * Helper function for creating components
 *
 * Places basic attributes:
 *  - Position, Size
 *  - Colors
 *  - etc
 */
export function expandBase<T extends GuiObject>(name: string, additionalProps: InstanceAttributes<T>, userProps: BaseProps<T>) {

	return React.createElement(
		name,
		{
			Visible: userProps.visible,

			BackgroundColor3: userProps.background,
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
			...additionalProps,
		},

		// Corner Radius
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
			? <uistroke Color={userProps.border} Thickness={userProps.borderSize}
						{...userProps.stroke} />
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

		userProps.children,
	);
}