import React, { useBinding } from "@rbxts/react";

import { Button, Frame, GridLayout, Text } from "@rbxts/better-react-components";

import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Latte } from "@rbxts/catppuccin";

export = hoarcekat(() => {
	const [count, setCount] = useBinding(0);

	return (
		<Frame
			size={UDim2.fromScale(1, 1)}
			noBackground

			padding={16}
		>
			<GridLayout
				cellSize={new UDim2(1 / 3, -8, 1, -8)}
				cellPadding={UDim2.fromOffset(8, 8)}
				cellAspectRatio={1}

				direction={Enum.FillDirection.Horizontal}
			/>

			<Button
				text={"Subtract"}
				textSize={32}
				font={Enum.Font.BuilderSans}

				cornerRadius={16}

				background={Latte.Red}
				textColor={Latte.Base}

				event={{ Activated: () => setCount(count.getValue() - 1) }}
			/>
			<Text
				text={count.map((v) => `Count: ${v}`)}
				textSize={32}
				font={Enum.Font.BuilderSansBold}

				cornerRadius={16}

				background={Latte.Base}
				textColor={Latte.Text}
			/>
			<Button
				text={"Add"}
				textSize={32}
				font={Enum.Font.BuilderSans}

				cornerRadius={16}

				background={Latte.Green}
				textColor={Latte.Base}

				event={{ Activated: () => setCount(count.getValue() + 1) }}
			/>
		</Frame>
	);
})