local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

return {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {},
    story = function(props)
        -- TODO: complete this story
        return React.createElement(BRC.ScrollingFrame, {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),

            BackgroundColor = "#C00000",
            CanvasSize = UDim2.new(1, 0, 2, 0),
        }, {
            React.createElement("Frame", { Size = UDim2.new(0, 100, 0, 100) }),
        })
    end,
}
