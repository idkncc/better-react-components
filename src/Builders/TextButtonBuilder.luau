local Typings = require("@root/Typings")

local TextLabelBuilder = require("./TextBuilder")

return TextLabelBuilder:expand(function(props: Typings.TextButtonProps)
    return {
        AutoButtonColor = props.AutoButtonColor,
        HoverHapticEffect = props.HoverHapticEffect,
        PressHapticEffect = props.PressHapticEffect,
        Modal = props.Modal,
        Selected = props.Selected,
        Style = props.Style,
    }, {}
end)
