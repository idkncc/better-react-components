local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

local story = {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        CornerRadius = UILabs.Slider(10, 0, 150, 1),
    },
    story = function(props)
        return React.createElement(BRC.Frame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = "#FFF",
            CornerRadius = props.controls.CornerRadius, -- UDim | number
        })
    end,
}

return story
