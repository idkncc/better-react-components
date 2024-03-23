import React from "@rbxts/react";
import { resolveUDim } from "../utils";
import { BindingVariants } from "../helpers/ExpandableComponent";


export type ListLayoutProps = BindingVariants<{
	padding?: number | UDim
	direction?: Enum.FillDirection
	order?: Enum.SortOrder
	horizontalAlign?: Enum.HorizontalAlignment
	verticalAlign?: Enum.VerticalAlignment
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
		/>
	);
}
