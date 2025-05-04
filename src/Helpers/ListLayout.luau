local React = require("@pkg/react")

local Utils = require("@root/Utils")

export type ListLayoutProps = {
    Gap: Utils.UDimValue,

    Direction: Enum.FillDirection?,
    Order: Enum.SortOrder?,
    Wraps: boolean?,

    JustifyContent: Utils.FlexAlignment?,
    AlignItems: Utils.FlexAlignment?,
    -- TODO: ItemLineAlignment
}

return function(props: ListLayoutProps)
    local rbxProps = React.useMemo(function()
        local MainAxis = props.Direction or Enum.FillDirection.Vertical
        local CrossAxis = if MainAxis == Enum.FillDirection.Horizontal
            then Enum.FillDirection.Vertical
            else Enum.FillDirection.Horizontal

        local MainAxisResult = if props.JustifyContent ~= nil
            then Utils.ConvertFlexValue(MainAxis, props.JustifyContent)
            else {}
        local CrossAxisResult = if props.AlignItems ~= nil
            then Utils.ConvertFlexValue(CrossAxis, props.AlignItems)
            else {}

        local result = {
            Padding = props.Gap and Utils.ConvertUDim(props.Gap),

            FillDirection = MainAxis,
            SortOrder = props.Order,
            Wraps = props.Wraps,
        }

        return Utils.MergeMulti(result, MainAxisResult, CrossAxisResult)
    end, { props })

    return React.createElement("UIListLayout", rbxProps)
end
