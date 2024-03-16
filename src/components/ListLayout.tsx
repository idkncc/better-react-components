import React from "@rbxts/react";
import { resolveUDim } from "../utils";


export type ListLayoutProps = {
	padding?: number | UDim
	direction?: Enum.FillDirection
	order?: Enum.SortOrder
}

export function ListLayout(props: ListLayoutProps) {
	return (
		<uilistlayout
			key={"ListLayout"}
			Padding={resolveUDim(props.padding ?? 0)}
			FillDirection={props.direction}
			SortOrder={props.order}
		/>
	);
}
