import React from "@rbxts/react";

import { BindingVariants, resolveUDim } from "../utils";

export type ListLayoutProps = BindingVariants<{
    padding?: number | UDim
    direction?: Enum.FillDirection
    order?: Enum.SortOrder
    horizontalAlign?: Enum.HorizontalAlignment
    verticalAlign?: Enum.VerticalAlignment


    flexWrap?: boolean
    flexAlignX?: Enum.UIFlexAlignment
    flexAlignY?: Enum.UIFlexAlignment
    flexAlignItems?: Enum.ItemLineAlignment
}>

export function ListLayout(props: ListLayoutProps) {
    return (
        <uilistlayout
            key={"ListLayout"}

            Padding={resolveUDim(props.padding ?? 0)}
            FillDirection={props.direction}
            SortOrder={props.order}

            HorizontalAlignment={props.horizontalAlign}
            VerticalAlignment={props.verticalAlign}

            // Flex (BETA)
            Wraps={props.flexWrap}
            HorizontalFlex={props.flexAlignX}
            VerticalFlex={props.flexAlignY}
            ItemLineAlignment={props.flexAlignItems}
        />
    );
}
