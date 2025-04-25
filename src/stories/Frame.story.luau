local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local Frame = require(script.Parent.Parent.Components.Frame)

local story = {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        AnchorPoint = UILabs.EnumList({
            TopLeft = "tl",
            TopCenter = "t",
            TopRight = "tr",
            MiddleLeft = "ml",
            MiddleCenter = "m",
            MiddleRight = "mr",
            BottomLeft = "bl",
            BottomCenter = "b",
            BottomRight = "br",
        }, "MiddleCenter"),
        BackgroundColor = Color3.fromHex("#FF0000"),
        CornerRadius = 0,
    },
    story = function(props)
        return React.createElement(Frame, {
            AnchorPoint = props.controls.AnchorPoint,
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = props.controls.BackgroundColor,
            -- CornerRadius = props.controls.CornerRadius
        })
    end,
}

return story
