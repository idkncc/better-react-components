import type { InstanceProps } from "@rbxts/react";
import React from "@rbxts/react";
import ExpandableComponent from "./ExpandableComponent";

import { ColorOrHex, ResolvableAnchorPoint, resolveAnchorPoint, resolveUDim } from "../utils";
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

    layoutOrder?: number
    zIndex?: number
    sizeConstraint?: Enum.SizeConstraint

    // Flex
    flex?: InstanceProps<UIFlexItem>
    flexMode?: Enum.UIFlexMode
}

export default new ExpandableComponent<GuiObject, BaseProps>()
    .expand(
        // most basic props:
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

        // most basic modifiers:
        (userProps) => [
            userProps.cornerRadius !== undefined
                ? <uicorner key={"_BRC_CornerRadius"} CornerRadius={resolveUDim(userProps.cornerRadius)} />
                : undefined,

            // Aspect Ratio
            userProps.aspectRatio !== undefined
                ? <uiaspectratioconstraint
                    key={"_BRC_AspectRatio"}
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
                        key={"_BRC_Stroke"}
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
                    key={"_BRC_Padding"}
                    PaddingRight={resolveUDim(userProps.paddingRight ?? userProps.padding ?? 0)}
                    PaddingLeft={resolveUDim(userProps.paddingLeft ?? userProps.padding ?? 0)}
                    PaddingTop={resolveUDim(userProps.paddingTop ?? userProps.padding ?? 0)}
                    PaddingBottom={resolveUDim(userProps.paddingBottom ?? userProps.padding ?? 0)}
                />
                : undefined,

            // Size constraint
            userProps.minSize !== undefined || userProps.maxSize !== undefined
                ? <uisizeconstraint key={"_BRC_SizeConstr"} MinSize={userProps.minSize} MaxSize={userProps.maxSize} />
                : undefined,

            // Text Size constraint
            userProps.minTextSize !== undefined || userProps.maxTextSize !== undefined
                ? <uitextsizeconstraint
                    key={"_BRC_TextSize"}
                    MinTextSize={userProps.minTextSize ?? 1}
                    MaxTextSize={userProps.maxTextSize}
                />
                : undefined,

            // Scale
            userProps.scale !== undefined
                ? <uiscale key={"_BRC_Scale"} Scale={userProps.scale} />
                : undefined,

            // Flex item
            userProps.flex !== undefined || userProps.flexMode !== undefined
                ? <uiflexitem key={"_BRC_FlexItem"} FlexMode={userProps.flexMode} {...userProps.flex} />
                : undefined,

            <GradientElement color={userProps.background} rotation={userProps.gradientRotation} />,
        ],
    );
