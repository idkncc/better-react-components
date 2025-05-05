local React = require("@pkg/react")

local Utils = require("@root/Utils")
local Typings = require("@root/Typings")

local GuiObjectBuilder = require("./GuiObjectBuilder")

--- Builder for text-based objects (`TextLabel`, `TextButton`, etc.)
return GuiObjectBuilder:expand(function(props: Typings.TextProps)
    return {
        Text = props.Text,

        FontFace = props.Font and Utils.ConvertFont(props.Font),
        LineHeight = props.LineHeight,
        RichText = props.RichText,
        TextColor3 = props.TextColor and Utils.ConvertColor(props.TextColor),
        TextWrapped = props.TextWrapped,

        TextSize = props.TextSize == "auto" and 1 or props.TextSize,
        TextScaled = props.TextSize == "auto",

        TextXAlignment = props.TextXAlignment,
        TextYAlignment = props.TextYAlignment,
    }, {
        BRCTextSizeConstraint = (props.MinTextSize ~= nil or props.MaxTextSize ~= nil)
            and React.createElement("UITextSizeConstraint", {
                MinTextSize = props.MinTextSize,
                MaxTextSize = props.MaxTextSize,
            }),
    }
end)
