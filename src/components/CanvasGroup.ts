import BaseComponent from "../helpers/BaseComponent";
import { ColorOrHex, resolveColor3 } from "../utils";

export interface CanvasGroupProps {
    /**
     * Color tint that applies to all descendants.
     *
     * `GroupColor3` property in Roblox
     */
    tintColor?: ColorOrHex,

    /**
     * Transparency that applies to all descendants.
     *
     * `GroupTransparency` property in Roblox
     */
    opacity?: number
}

/**
 * @see https://create.roblox.com/docs/reference/engine/classes/CanvasGroup
 */
export const CanvasGroup = BaseComponent
    .expand<CanvasGroup, CanvasGroupProps>(
        (props) => ({
            GroupColor3: resolveColor3(props.tintColor),
            GroupTransparency: props.opacity
        }),
    )
    .build("canvasgroup");
