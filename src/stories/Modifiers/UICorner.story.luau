local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local Frame = require("../..").Frame

local story = {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        CornerRadius = UILabs.Slider(10, 0, 150, 1),
    },
    story = function(props)
        return React.createElement(Frame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = "#FFF",
            CornerRadius = props.controls.CornerRadius, -- number
        })
    end,
}

return story
