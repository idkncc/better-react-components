import TextComponent, { TextComponentProps } from "../helpers/TextComponent";

type ButtonProps = TextComponentProps<TextButton> & {
    autoButtonColor: boolean
}

export const ButtonComponent = TextComponent
    .expand<TextButton, ButtonProps>(
        (props) => ({
            AutoButtonColor: props.autoButtonColor,
        }),
    );

export const Button = ButtonComponent.build("textbutton");
