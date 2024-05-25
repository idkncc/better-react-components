import React from "@rbxts/react";

import { hoarcekat } from "@rbxts/pretty-react-hooks";

import { App } from "../App";
import { AnchorPoints, TextBox } from "../.."; // @rbxts/better-react-components
import { CatppuccinLatte } from "../utils";


export = hoarcekat(() => {
	return (
		<App>
			<TextBox
				size={new UDim2(.5, 0, .5, 0)}
				minSize={new Vector2(200, 100)}
				aspectRatio={8 / 2}

				position={new UDim2(.5, 0, .5, 0)}
				anchorPoint={AnchorPoints.Middle}

				cornerRadius={12}
				border={CatppuccinLatte.Text}
				borderMode={Enum.ApplyStrokeMode.Border}
				borderSize={2}

				text={""}
				textSize={16}
				placeholder="Cool textbox"

				background={CatppuccinLatte.Base}
				textColor={CatppuccinLatte.Text}
				placeholderColor={CatppuccinLatte.Surface2}
			/>
		</App>
	);
});