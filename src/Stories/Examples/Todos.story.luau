local React = require("@pkg/react")
local ReactRoblox = require("@pkg/react-roblox")
local Collections = require("@pkg/collections")

local UILabs = require("@dev-pkg/ui-labs")

local BRC = require("@root/")

type Todo = { text: string, completed: boolean }

local function MenuStory(props)
    local todos, setTodos = React.useState({} :: { Todo })
    local input, setInput = React.useBinding("")

    return React.createElement(BRC.Frame, {
        -- PRO TIP: use this utillity to calcalate aspect ratio for component:
        -- > ref = BRC.Utils.CalculateAspectRatio,
        AnchorPoint = "m",
        Size = UDim2.new(0.5, 0, 0.8, 0),
        Position = UDim2.new(0.5, 0, 0.5, 0),
        Aspect = { Ratio = 1.6 },

        BackgroundColor = "#FFF",
        BackgroundTransparency = 0.3,

        CornerRadius = 8 + 8, -- inner corner + padding
        Padding = 8,

        ListLayout = {
            Gap = 8,
            Order = Enum.SortOrder.LayoutOrder,
        },
    }, {
        Header = React.createElement(BRC.Frame, {
            LayoutOrder = 1,

            Size = UDim2.new(1, 0, 0, 48),
            NoBackground = true,

            ListLayout = {
                Gap = 8,
                Direction = Enum.FillDirection.Horizontal,
                Order = Enum.SortOrder.LayoutOrder,
            },
        }, {
            TodoText = React.createElement(BRC.TextBox, {
                LayoutOrder = 1,

                Size = UDim2.new(0, 0, 1, 0),
                FlexMode = Enum.UIFlexMode.Fill,

                CornerRadius = 8,

                Text = input,
                [React.Change.Text] = function(inst)
                    setInput(inst.Text)
                end,
            }),
            CreateTodo = React.createElement(BRC.TextButton, {
                LayoutOrder = 2,
                Size = UDim2.new(0.2, 0, 1, 0),

                CornerRadius = 8,

                BackgroundColor = "#00a63e",
                TextColor = "#FFFFFF",

                Text = "Add",

                [React.Event.Activated] = function()
                    setTodos(function(todos)
                        local text = input:getValue()
                        setInput("")

                        return BRC.Utils.MergeMulti(
                            todos,
                            { [#todos + 1] = { text = text, completed = false } }
                        )
                    end)
                end,
            }),
        }),

        Content = React.createElement(
            BRC.ScrollingFrame,
            {
                LayoutOrder = 2,

                NoBackground = true,

                Padding = { 6, 18, 6, 0 },
                Size = UDim2.new(1, 0, 1, 0),
                FlexMode = Enum.UIFlexMode.Fill,

                ListLayout = {
                    Gap = 8,
                    Direction = Enum.FillDirection.Vertical,
                    Order = Enum.SortOrder.LayoutOrder,
                },
            },

            Collections.Array.map(todos, function(todo: Todo, index: number)
                return React.createElement(BRC.Frame, {
                    LayoutOrder = 10 + index,
                    Size = UDim2.new(1, 0, 0, 42),

                    CornerRadius = 8,
                    Padding = 4,

                    ListLayout = {
                        Gap = 8,
                        Direction = Enum.FillDirection.Horizontal,
                        Order = Enum.SortOrder.LayoutOrder,
                        AlignItems = "center",
                    },
                }, {
                    React.createElement(BRC.TextLabel, {
                        LayoutOrder = 1,

                        Size = UDim2.new(1, 0, 1, 0),
                        FlexMode = Enum.UIFlexMode.Fill,
                        NoBackground = true,

                        Padding = { 0, 8 },

                        TextXAlignment = Enum.TextXAlignment.Left,
                        Text = todo.text,
                    }),
                    React.createElement(BRC.TextButton, {
                        LayoutOrder = 2,

                        AnchorPoint = "mr",
                        Size = UDim2.new(0.1, 0, 1, 0),
                        Aspect = { Ratio = 1 },

                        CornerRadius = 4,

                        BackgroundColor = todo.completed and "#DC2626" or "#00A63E",
                        TextColor = "#FFF",
                        Text = todo.completed and "X" or "√",

                        [React.Event.Activated] = function()
                            setTodos(function(todos)
                                return BRC.Utils.MergeMulti(todos, {
                                    [index] = { completed = not todos[index].completed },
                                })
                            end)
                        end,
                    }),
                })
            end)
        ),
    })
end

return {
    react = React,
    reactRoblox = ReactRoblox,
    controls = {},
    story = function(props)
        return React.createElement(MenuStory, props)
    end,
}
