local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/init")

local function PaddingStory(props)
    local Padding = React.useMemo(function()
        local Padding = {}
        for v in string.gmatch(props.controls.Padding, "%d+") do
            Padding[#Padding + 1] = tonumber(v)
        end
        return Padding
    end, { props.controls.Padding })

    return React.createElement(
        BRC.Frame,
        {
            AnchorPoint = "m",
            Position = UDim2.new(0.5, 0, 0.5, 0),
            Size = UDim2.new(0.5, 0, 0.5, 0),
            BackgroundColor = "#F00",

            Padding = Padding,
        },
        React.createElement(BRC.TextLabel, {
            Size = UDim2.new(1, 0, 1, 0),
            BackgroundColor = "#FFF",
            Text = ("Padding = {%s}"):format(table.concat(Padding, ", ")),
            Font = Enum.Font.Roboto,
            TextSize = 30,
        })
    )
end

local story = {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {
        Padding = "15",
    },
    story = function(props)
        return React.createElement(PaddingStory, props)
    end,
}

return story
