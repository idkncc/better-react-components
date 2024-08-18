/**
 * Pass this function to GuiObject as ref to calculate aspect ratio
 *
 * @example
 * ```tsx
 * <Frame
 *     size={new UDim2(.3, 0, .4, 0)}
 *     ref={calculateAspectRatio}
 * >
 *     ...
 * </Frame>
 *
 * In Output (some fraction):
 * [CALC_ASPECT_RATIO](1): .875
 * ```
 */
export function calculateAspectRatio(element: unknown) {
    if (typeIs(element, "Instance") && element.IsA("GuiObject")) {
        const sizes = (element as GuiObject).AbsoluteSize;
        const name = (element as GuiObject).Name;

        print(`[CALC_ASPECT_RATIO](${name}): ${sizes.X / sizes.Y}`);
    } else {
        error(`[CALC_ASPECT_RATIO]: Passed invalid argument. GuiObject expected, got ${typeOf(element)}`)
    }
}
