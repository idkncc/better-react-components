import React, { useEffect, useRef, useState } from "@rbxts/react";

import { AnchorPoints, Text } from "../.."; // @rbxts/better-react-components
import { App } from "../App";

import { hoarcekat } from "@rbxts/pretty-react-hooks";

export = hoarcekat(() => {
	const [textSizes, setTextSizes] = useState(new Vector2());
	const textRef = useRef<GuiObject>();

	useEffect(() => {
		if (!textRef.current) return;

		const connection = textRef.current.GetPropertyChangedSignal("AbsoluteSize")
			.Connect(updateSizes);

		updateSizes();
		return () => connection.Disconnect();
	}, [textRef]);

	function updateSizes() {
		if (!textRef.current) return;

		setTextSizes(textRef.current!.AbsoluteSize.Floor());
	}

	return (
		<App>
			<Text
				ref={textRef}

				size={UDim2.fromScale(.5, .5)}
				position={UDim2.fromScale(.5, .5)}

				anchorPoint={AnchorPoints.Middle}

				text={`${textSizes.X}x${textSizes.Y}`}
			/>
		</App>
	);
})