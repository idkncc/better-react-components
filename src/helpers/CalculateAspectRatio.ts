/**
 * Pass this function to GuiObject as ref to calculate aspect ratio
 */
export function calculateAspectRatio(element: unknown) {
	if (element === undefined) return;

	const sizes = (element as GuiObject).AbsoluteSize;
	const name = (element as GuiObject).Name;

	print(`[CALC_ASPECT_RATIO](${name}): ${sizes.X / sizes.Y}`);
}