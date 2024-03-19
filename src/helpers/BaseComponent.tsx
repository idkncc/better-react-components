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
import { isBinding, mapBinding } from "@rbxts/pretty-react-hooks";

function resolveGradient(value: Array<ColorOrHex> | Array<ColorSequenceKeypoint> | ColorSequence): ColorSequence {
	if (typeIs(value, "ColorSequence")) {
		return value as ColorSequence;
	} else if (typeIs(value[0], "ColorSequenceKeypoint")) {
		return new ColorSequence(value as Array<ColorSequenceKeypoint>);
	} else {
		if (value.size() === 1) value = [value[0], value[0]];

		const keypointsCount = value.size();
		const step = 1 / (keypointsCount - 1);

		const seq: Array<ColorSequenceKeypoint> = [];
		let j = 0;
		for (let i = 0; i <= 1; i += step) {
			seq.push(new ColorSequenceKeypoint(i, resolveColor3(value[j] as ColorOrHex) as Color3));
			j++;
		}


		return new ColorSequence(seq);
	}
}

export type BaseProps = {
	visible?: boolean,

	noBackground?: boolean
	background?: ColorOrHex | Array<ColorOrHex> | Array<ColorSequenceKeypoint> | ColorSequence
	backgroundTransparency?: number
	gradientRotation: number

	border?: ColorOrHex
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
}

export default new ExpandableComponent<GuiObject, BaseProps>()
	.expand(
		(userProps) => ({
			Visible: userProps.visible,

			BackgroundColor3: mapBinding(
				userProps.background,
				(value) =>
					typeIs(value, "string") || typeIs(value, "Color3")
						? resolveColor3(value) as Color3 // regular color
						: Color3.fromHex("#FFFFFF"), // gradient
			),
			BackgroundTransparency: userProps.noBackground ? 1 : (userProps.backgroundTransparency ?? 0),

			AutomaticSize: userProps.automaticSize,

			Position: userProps.position,
			Size: userProps.size,
			AnchorPoint: resolveAnchorPoint(userProps.anchorPoint ?? new Vector2(0, 0)),

			BorderSizePixel: 0, // we use UIStroke instead
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
				? <uistroke
					Color={resolveColor3(userProps.border as ColorOrHex)}
					Thickness={userProps.borderSize}
					ApplyStrokeMode={userProps.borderMode}
					LineJoinMode={userProps.borderLineJoinMode}
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
		],
	)
	.expand(
		() => ({}),
		(userProps) => {
			const bgColor = (isBinding(userProps.background) ? userProps.background.getValue() : userProps.background);

			return [
				!typeIs(bgColor, "string") && !typeIs(bgColor, "Color3") && !typeIs(bgColor, "nil")
					? <uigradient
						Color={mapBinding(userProps.background as [], resolveGradient)}
						Rotation={userProps.gradientRotation}
					/>
					: undefined,
			];
		},
	);
