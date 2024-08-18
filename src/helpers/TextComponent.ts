import BaseComponent from "./BaseComponent";

import { ColorOrHex, resolveColor3 } from "../utils";
import { mapBinding } from "@rbxts/pretty-react-hooks";

import type { InferEnumNames, InstanceEvent } from "@rbxts/react";

export type TextComponentInstance = TextLabel | TextButton | TextBox
export type TextComponentProps<T extends Instance = TextComponentInstance> = {
    text?: string,
    textColor?: ColorOrHex

    textSize?: number | "AUTO"

    font?: Enum.Font | Font
    richText?: boolean

    textAlign?: Enum.TextXAlignment
    verticalTextAlign?: Enum.TextYAlignment

    /** @deprecated use `textAlign` (WILL BE REMOVED IN NEXT MAJOR VERSION!) */
    align?: Enum.TextXAlignment
    /** @deprecated use `verticalTextAlign` (WILL BE REMOVED IN NEXT MAJOR VERSION!) */
    verticalAlign?: Enum.TextYAlignment

    event?: InstanceEvent<T>
}

export default BaseComponent
    .expand<TextComponentInstance, TextComponentProps>(
        (props) => ({
            Text: props.text,
            TextSize: mapBinding(
                props.textSize,
                (size) =>
                    typeIs(size, "number")
                        ? size
                        : 0,
            ),
            TextScaled: mapBinding(
                props.textSize,
                (size) => size === "AUTO",
            ),
            TextColor3: resolveColor3(props.textColor),

            FontFace: mapBinding(
                props.font,
                (font) =>
                    typeIs(font, "nil")
                        ? Font.fromEnum(Enum.Font.Legacy)
                        : typeIs(font, "Font")
                            ? font // font
                            : typeIs(font, "string")
                                ? Font.fromEnum(Enum.Font[font as InferEnumNames<Enum.Font>]) // font enum key
                                : Font.fromEnum(font), // font enum
            ),
            RichText: props.richText,

            TextXAlignment: props.textAlign ?? props.align,
            TextYAlignment: props.verticalTextAlign ?? props.verticalAlign,
        }),
    );
