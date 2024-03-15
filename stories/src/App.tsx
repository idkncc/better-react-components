import React from "@rbxts/react";
import { Frame } from "@rbxts/better-react-components";

declare const _G: Record<string, unknown>;
_G.__DEV__ = true;

export function App(props: { children: React.ReactNode }) {
	return React.createElement(
		Frame,
		{ size: UDim2.fromScale(1, 1), noBackground: true },
		props.children,
	);
}
