local Typings = require("@root/Typings")

local TextLabelBuilder = require("./TextBuilder")

return TextLabelBuilder:expand(function(props: Typings.TextButtonProps)
    return {
        Style = props.Style,
        AutoButtonColor = props.AutoButtonColor,
        Modal = props.Modal,
    }, {}
end)
