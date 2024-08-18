import React from "@rbxts/react";

import type { BindingVariants } from "../utils";

export type GridLayoutProps = BindingVariants<{
    cellPadding?: UDim2
    cellSize?: UDim2
    cellAspectRatio?: number
    cellAspectType?: Enum.AspectType
    cellAspectAxis?: Enum.DominantAxis
    startCorner?: Enum.StartCorner
    direction?: Enum.FillDirection
    horizontalAlign?: Enum.HorizontalAlignment
    verticalAlign?: Enum.VerticalAlignment,
    sortOrder?: Enum.SortOrder;
}>

export function GridLayout(props: GridLayoutProps) {
    return (
        <uigridlayout
            key={"GridLayout"}

            CellPadding={props.cellPadding}
            CellSize={props.cellSize}
            StartCorner={props.startCorner}
            FillDirection={props.direction}
            HorizontalAlignment={props.horizontalAlign}
            VerticalAlignment={props.verticalAlign}
            SortOrder={props.sortOrder}
        >
            {props.cellAspectRatio !== undefined
                ? <uiaspectratioconstraint
                    AspectRatio={props.cellAspectRatio}
                    DominantAxis={props.cellAspectAxis}
                    AspectType={props.cellAspectType}
                />
                : undefined}
        </uigridlayout>
    );
}
