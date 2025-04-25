local TextLabelBuilder = require("./TextBuilder")

export type TextButtonProps = {
    Style: Enum.ButtonStyle?,
    AutoButtonColor: boolean?,
    Modal: boolean?
}

return TextLabelBuilder:expand(function (props: TextButtonProps)
    return {
        Style = props.Style,
        AutoButtonColor = props.AutoButtonColor,
        Modal = props.Modal
    }, {}
end)
