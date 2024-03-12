import React from "@rbxts/react";
import { AnchorPoints, Frame, ListLayout, Button } from "@rbxts/better-react-components";
import { Latte } from "@rbxts/catppuccin";
import { Sidebar } from "./examples/1_Sidebar";
import { Somemenu } from "./examples/2_Smth";

export function App() {
	return (
		<screengui
			ResetOnSpawn={false}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<Sidebar />
			<Somemenu />
		</screengui>
	);
}
