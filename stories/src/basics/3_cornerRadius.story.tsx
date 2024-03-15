import React from "@rbxts/react";

import { AnchorPoints, Frame } from "@rbxts/better-react-components";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { App } from "../App";

export = hoarcekat(() => {
	return (
		<App>
			<Frame
				position={UDim2.fromScale(.5, .5)}
				size={UDim2.fromScale(.75, .75)}
				aspectRatio={1}
				anchorPoint={AnchorPoints.Middle}

				cornerRadius={18}
			>

			</Frame>
		</App>
	);
});