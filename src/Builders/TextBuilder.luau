local Utils = require("../Utils")
local GuiObjectBuilder = require("./GuiObjectBuilder")

export type TextProps = {
    Text: string?,

    Font: Enum.Font?,
    LineHeight: number?,
    RichText: boolean?,
    TextColor: Utils.Color?,
    TextSize: Utils.TextSize?,
    TextWrapped: boolean?,

    TextXAlignment: Enum.TextXAlignment?,
    TextYAlignment: Enum.TextYAlignment?,
}

--- Builder for text-based objects (`TextLabel`, `TextButton`, etc.)
return GuiObjectBuilder:expand(function(props: TextProps)
    return {
        Text = props.Text,

        FontFace = props.Font,
        LineHeight = props.LineHeight,
        RichText = props.RichText,
        TextColor3 = Utils.ConvertColor(props.TextColor),
        TextWrapped = props.TextWrapped,

        TextSize = props.TextSize == "auto" and 1 or props.TextSize,
        TextScaled = props.TextSize == "auto",

        TextXAlignment = props.TextXAlignment,
        TextYAlignment = props.TextYAlignment,
    }, {}
end)
