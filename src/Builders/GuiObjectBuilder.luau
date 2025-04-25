local React = require("@pkg/react")
local ComponentBuilder = require("../Builder")
local Utils = require("../Utils")

--- Border settings
---
--- NOTE: when building, it uses `UIStroke`, instead of `GuiObject`'s border properties
export type Border = {
    BorderColor: Utils.Color?,
}

export type GuiObjectProps = {
    AnchorPoint: Utils.AnchorPoint?,
    AutomaticSize: Enum.AutomaticSize?,
    BackgroundColor: Utils.Color?,
    BackgroundTransparency: number?,

    --- Alias for `BackgroundTransparency = 1`
    NoBackground: boolean?,

    Position: UDim2?,
    Size: UDim2?,

    SizeConstraint: Enum.SizeConstraint?,
    Visible: boolean?,

    LayoutOrder: number?,
    ZIndex: number?,

    Border: Border?,
}

return ComponentBuilder.new(function(props: GuiObjectProps)
    return {
        AnchorPoint = props.AnchorPoint and Utils.ConvertAnchorPoint(props.AnchorPoint),
        AutomaticSize = props.AutomaticSize,

        BackgroundColor3 = props.BackgroundColor and Utils.ConvertColor(props.BackgroundColor),
        BackgroundTransparency = props.NoBackground and 1 or props.BackgroundTransparency,

        Position = props.Position,
        Size = props.Size,

        SizeConstraint = props.SizeConstraint,
        LayoutOrder = props.LayoutOrder,
        ZIndex = props.ZIndex,
    }, {
        Border = props.border
            and React.createElement("UIBorder", {
                Color = props.Border.BorderColor and Utils.ConvertColor(props.Border.BorderColor),
                Thickness = props.Border.Thickness,
            }),
    }
end)
