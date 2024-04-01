import ExpandableComponent from "./ExpandableComponent";
import {
	ColorOrHex,
	ReactProps,
	ResolvableAnchorPoint,
	resolveAnchorPoint,
	resolveColor3,
	resolveUDim,
} from "../utils";
import { InstanceProps } from "@rbxts/react";
import React from "@rbxts/react";
import { getBindingValue, isBinding, mapBinding } from "@rbxts/pretty-react-hooks";
import { getBaseColor, Gradient, GradientElement } from "./Gradient";

export type BaseProps = {
	visible?: boolean,

	noBackground?: boolean
	background?: Gradient | ColorOrHex
	backgroundTransparency?: number
	gradientRotation: number

	border?: ColorOrHex | Gradient
	borderGradientRotation?: number
	borderMode?: Enum.ApplyStrokeMode
	borderSize?: number
	borderLineJoinMode?: Enum.LineJoinMode
	stroke?: InstanceProps<UIStroke>

	position?: UDim2
	size?: UDim2,
	anchorPoint?: ResolvableAnchorPoint
	automaticSize?: Enum.AutomaticSize

	cornerRadius?: number | UDim

	aspectRatio?: number
	aspectType?: Enum.AspectType
	aspectAxis?: Enum.DominantAxis

	padding?: number | UDim
	paddingLeft?: number | UDim
	paddingRight?: number | UDim
	paddingTop?: number | UDim
	paddingBottom?: number | UDim

	minSize?: Vector2
	maxSize?: Vector2

	minTextSize?: number
	maxTextSize?: number

	scale?: number,

	layoutOrder?: number,
	zIndex?: number,
	sizeConstraint?: Enum.SizeConstraint
}

export default new ExpandableComponent<GuiObject, BaseProps>()
	.expand(
		(userProps) => ({
			Visible: userProps.visible,

			BackgroundColor3: getBaseColor(userProps.background),
			BackgroundTransparency: userProps.noBackground ? 1 : (userProps.backgroundTransparency ?? 0),

			AutomaticSize: userProps.automaticSize,

			Position: userProps.position,
			Size: userProps.size,
			AnchorPoint: resolveAnchorPoint(userProps.anchorPoint ?? new Vector2(0, 0)),

			BorderSizePixel: 0, // we use UIStroke instead

			LayoutOrder: userProps.layoutOrder,
			ZIndex: userProps.zIndex,
			SizeConstraint: userProps.sizeConstraint,
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
			|| userProps.border !== undefined || userProps.borderSize !== undefined || userProps.borderLineJoinMode !== undefined
				? (
					<uistroke
						Color={getBaseColor(userProps.border)}
						Thickness={userProps.borderSize}
						ApplyStrokeMode={userProps.borderMode}
						LineJoinMode={userProps.borderLineJoinMode}
						{...userProps.stroke}
					>
						<GradientElement color={userProps.border} rotation={userProps.borderGradientRotation} />
					</uistroke>
				)
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

			// Scale
			userProps.scale !== undefined
				? <uiscale Scale={userProps.scale} />
				: undefined,

			<GradientElement color={userProps.background} rotation={userProps.gradientRotation} />,
		],
	);
