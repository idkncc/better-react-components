import TextComponent, { TextComponentProps } from "../helpers/TextComponent";

export const Text = TextComponent
    .expand<TextLabel, TextComponentProps<TextLabel>>()
    .build("textlabel");
