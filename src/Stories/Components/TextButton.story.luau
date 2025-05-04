local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

local function TextButtonStory(props)
    local count, setCount = React.useState(0)

    return React.createElement(BRC.TextButton, {
        AnchorPoint = "m",
        Position = UDim2.new(0.5, 0, 0.5, 0),
        Size = UDim2.new(0.5, 0, 0.5, 0),
        BackgroundColor = "#080808",

        TextColor = "#FFF",
        TextSize = 18,
        Text = ("This button was clicked %d times. How cool is that???"):format(count),
        TextWrapped = true,

        [React.Event.Activated] = function()
            setCount(function(oldCount)
                return oldCount + 1
            end)
        end,
    })
end

return {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {},
    story = function(props)
        return React.createElement(TextButtonStory, props)
    end,
}
