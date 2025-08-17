local Typings = require("@root/Typings")
local Utils = require("@root/Utils")

local TextBuilder = require("./TextBuilder")

return TextBuilder:expand(function(props: Typings.TextBoxProps)
    return {
        ClearTextOnFocus = props.ClearTextOnFocus,
        CursorPosition = props.CursorPosition,
        MultiLine = props.MultiLine,
        PlaceholderColor3 = props.PlaceholderColor and Utils.ConvertColor(props.PlaceholderColor),
        PlaceholderText = props.PlaceholderText,
        SelectionStart = props.SelectionStart,
        ShowNativeInput = props.ShowNativeInput,
        TextEditable = props.TextEditable,
    }, {}
end)
