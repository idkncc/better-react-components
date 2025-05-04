local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

local story = {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        Color = Color3.fromHex("#FF0000"),
        Thickness = UILabs.Slider(5, 0, 50),
    },
    story = function(props)
        return React.createElement(BRC.Frame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = "#FFF",
            CornerRadius = 15,

            Border = {
                Color = props.controls.Color, -- Color3 | number
                Thickness = props.controls.Thickness, -- number
            },
        })
    end,
}

return story
