import React, { useBinding, useEffect, useRef, useState } from "@rbxts/react";

import {
	AnchorPoints,
	Button,
	Frame,
	GridLayout,
	ListLayout,
	resolveColor3,
	Text,
} from "@rbxts/better-react-components";
import { App } from "../App";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Latte } from "@rbxts/catppuccin";

export = hoarcekat(() => {
	return (
		<App>
			<ListLayout padding={4} />

			{/* Array of colors (timed automatically) */}
			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={["#00FF00"]}
			/>

			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={["#FF0000", "#0000FF"]}
			/>

			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={["#FF0000", "#FF00FF", "#0000FF"]}
			/>


			{/* Array of keypoints */}
			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={[
					new ColorSequenceKeypoint(0, resolveColor3("#000000") as Color3),
					new ColorSequenceKeypoint(0.5-0.5/3, resolveColor3("#FF0000") as Color3),
					new ColorSequenceKeypoint(0.5+0.5/3, resolveColor3("#FF0000") as Color3),
					new ColorSequenceKeypoint(1, resolveColor3("#000000") as Color3)
				]}
			/>

			{/* Sequence */}
			<Frame
				size={new UDim2(1, -4, 0, 75)}
				background={new ColorSequence([
					new ColorSequenceKeypoint(0, resolveColor3("#FF0000") as Color3),
					new ColorSequenceKeypoint(0.5, resolveColor3("#3333CC") as Color3),
					new ColorSequenceKeypoint(1, resolveColor3("#00FF00") as Color3)
				])}
			/>

		</App>
	);
})