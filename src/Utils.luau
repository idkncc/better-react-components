local React = require("@pkg/react")

local Typings = require("@root/Typings")

local Utils = {}

local AnchorPointMapping = setmetatable({
    tl = Vector2.new(0, 0),
    t = Vector2.new(0.5, 0),
    tr = Vector2.new(1, 0),

    ml = Vector2.new(0, 0.5),
    m = Vector2.new(0.5, 0.5),
    mr = Vector2.new(1, 0.5),

    bl = Vector2.new(0, 1),
    b = Vector2.new(0.5, 1),
    br = Vector2.new(1, 1),
}, {
    __index = function()
        error("Invalid anchor point.")
    end,
})

local function isBinding(value: any): boolean
    return typeof(value) == "table" and value["getValue"] ~= nil and value["map"] ~= nil
end

-- TODO: create separate package "better-react-hooks"
function Utils.mapBinding<T, R>(
    bindingOrValue: Typings.BindingOrValue<T>,
    map: (value: T) -> R
): React.Binding<R>
    local binding = if isBinding(bindingOrValue)
        then bindingOrValue :: React.Binding<T>
        else React.createBinding(bindingOrValue :: T)

    return binding:map(map)
end

function Utils.Assign<T1, T2>(table1: T1, table2: T2): T1 & T2
    local result = table1 :: any

    for k, v in pairs(table2 :: any) do
        result[k] = v
    end

    return result :: T1 & T2
end

-- thanks to https://gist.github.com/qizhihere/cb2a14432d9bf65693ad?permalink_comment_id=3389084#gistcomment-3389084
function Utils.MergeMulti(...): any
    local tables_to_merge = { ... }
    assert(#tables_to_merge > 1, "There should be at least two tables to merge them")

    for k, t in ipairs(tables_to_merge) do
        assert(typeof(t) == "table", string.format("Expected a table as function parameter %d", k))
    end

    local result = table.clone(tables_to_merge[1])

    for i = 2, #tables_to_merge do
        local from = tables_to_merge[i]
        for k, v in pairs(from) do
            if type(v) == "table" then
                result[k] = result[k] or {}
                assert(type(result[k]) == "table", string.format("Expected a table: '%s'", k))
                result[k] = Utils.MergeMulti(result[k], v)
            else
                result[k] = v
            end
        end
    end

    return result
end

function Utils.CalculateAspectRatio(instance: GuiObject)
    local AbsoluteSize = instance.AbsoluteSize

    print("===============================")
    print(("Calculated Aspect Ratio: %.3f"):format(AbsoluteSize.X / AbsoluteSize.Y))
    print("===============================")
end

function Utils.ConvertColor(value: Typings.BindingOrValue<Color3 | string>): React.Binding<Color3>
    return Utils.mapBinding(value, function(value)
        if typeof(value) == "Color3" then
            return value
        elseif typeof(value) == "string" then
            return Color3.fromHex(value)
        else
            error(
                string.format(
                    'Invalid value in ConvertColor. Expected Color3 or string, found "%s"',
                    typeof(value)
                )
            )
        end
    end)
end

function Utils.ConvertAnchorPoint(
    value: Typings.BindingOrValue<Typings.AnchorPoint>
): React.Binding<Vector2>
    return Utils.mapBinding(value, function(value)
        if typeof(value) == "Vector2" then
            return value
        elseif typeof(value) == "string" then
            return AnchorPointMapping[value]
        else
            error(
                string.format(
                    'Invalid value in ConvertAnchorPoint. Expected Vector2 or string, found "%s"',
                    typeof(value)
                )
            )
        end
    end)
end

function Utils.ConvertFont(value: Typings.BindingOrValue<Typings.FontValue>): React.Binding<Font>
    return Utils.mapBinding(value, function(value)
        if typeof(value) == "EnumItem" then
            return Font.fromEnum(value :: Enum.Font)
        elseif typeof(value) == "Font" then
            return value
        else
            error(
                string.format(
                    'Invalid value in ConvertFont. Expected Font or Enum.Font, found "%s"',
                    typeof(value)
                )
            )
        end
    end)
end

local function ConvertUDimInternal(value: Typings.UDimValue): UDim
    if typeof(value) == "UDim" then
        return value
    elseif typeof(value) == "number" then
        return UDim.new(0, value)
    else
        error(
            string.format(
                'Invalid value in ConvertUDim. Expected UDim or number, found "%s"',
                typeof(value)
            )
        )
    end
end

function Utils.ConvertUDim(value: Typings.BindingOrValue<Typings.UDimValue>): React.Binding<UDim>
    return Utils.mapBinding(value, ConvertUDimInternal)
end

export type ConvertPaddingResult = {
    PaddingBottom: UDim,
    PaddingLeft: UDim,
    PaddingRight: UDim,
    PaddingTop: UDim,
}

local function ConvertPaddingInternal(value: { UDim }): ConvertPaddingResult
    if #value == 0 then
        return { PaddingTop = 0, PaddingRight = 0, PaddingBottom = 0, PaddingLeft = 0 }
    elseif #value == 1 then
        return {
            PaddingTop = value[1],
            PaddingRight = value[1],
            PaddingBottom = value[1],
            PaddingLeft = value[1],
        }
    elseif #value == 2 then
        return {
            PaddingTop = value[1],
            PaddingRight = value[2],
            PaddingBottom = value[1],
            PaddingLeft = value[2],
        }
    elseif #value == 3 then
        return {
            PaddingTop = value[1],
            PaddingRight = value[2],
            PaddingBottom = value[3],
            PaddingLeft = value[2],
        }
    elseif #value == 4 then
        return {
            PaddingTop = value[1],
            PaddingRight = value[2],
            PaddingBottom = value[3],
            PaddingLeft = value[4],
        }
    else
        error(
            string.format(
                "Invalid value in ConvertUDim. Expected up to 4 padding values, found %d.",
                #value
            )
        )
    end
end

function Utils.ConvertPadding(
    value: Typings.BindingOrValue<Typings.PaddingValue>
): React.Binding<ConvertPaddingResult>
    return Utils.mapBinding(value, function(value)
        if typeof(value) == "table" then
            local result: { UDim } = {}
            for _, v in value do
                result[#result + 1] = ConvertUDimInternal(v)
            end

            return ConvertPaddingInternal(result)
        elseif typeof(value) == "UDim" or typeof(value) == "number" then
            return ConvertPaddingInternal({ ConvertUDimInternal(value) })
        else
            error(
                string.format(
                    'Invalid value in ConvertPadding. Expected UDimValue or {UDimValue}, found "%s"',
                    typeof(value)
                )
            )
        end
    end)
end

export type ConvertFlexValueResult = {
    HorizontalAlignment: Enum.HorizontalAlignment?,
    HorizontalFlex: Enum.UIFlexAlignment?,
    VerticalAlignment: Enum.VerticalAlignment?,
    VerticalFlex: Enum.UIFlexAlignment?,
}

--- Converts CSS like JustifyContent and AlignItems values to Roblox's ListLayout props
function Utils.ConvertFlexValue(
    direction: Enum.FillDirection,
    value: Typings.FlexAlignment
): ConvertFlexValueResult
    if value == "start" then
        if direction == Enum.FillDirection.Horizontal then
            return {
                HorizontalAlignment = Enum.HorizontalAlignment.Left,
                HorizontalFlex = Enum.UIFlexAlignment.None,
            }
        else
            return {
                VerticalAlignment = Enum.VerticalAlignment.Top,
                VerticalFlex = Enum.UIFlexAlignment.None,
            }
        end
    elseif value == "end" then
        if direction == Enum.FillDirection.Horizontal then
            return {
                HorizontalAlignment = Enum.HorizontalAlignment.Right,
                HorizontalFlex = Enum.UIFlexAlignment.None,
            }
        else
            return {
                VerticalAlignment = Enum.VerticalAlignment.Bottom,
                VerticalFlex = Enum.UIFlexAlignment.None,
            }
        end
    elseif value == "center" then
        if direction == Enum.FillDirection.Horizontal then
            return {
                HorizontalAlignment = Enum.HorizontalAlignment.Center,
                HorizontalFlex = Enum.UIFlexAlignment.None,
            }
        else
            return {
                VerticalAlignment = Enum.VerticalAlignment.Center,
                VerticalFlex = Enum.UIFlexAlignment.None,
            }
        end
    elseif value == "space-between" then
        if direction == Enum.FillDirection.Horizontal then
            return {
                HorizontalAlignment = Enum.HorizontalAlignment.Center,
                HorizontalFlex = Enum.UIFlexAlignment.SpaceBetween,
            }
        else
            return {
                VerticalAlignment = Enum.VerticalAlignment.Center,
                VerticalFlex = Enum.UIFlexAlignment.SpaceBetween,
            }
        end
    elseif value == "space-around" then
        if direction == Enum.FillDirection.Horizontal then
            return {
                HorizontalAlignment = Enum.HorizontalAlignment.Center,
                HorizontalFlex = Enum.UIFlexAlignment.SpaceAround,
            }
        else
            return {
                VerticalAlignment = Enum.VerticalAlignment.Center,
                VerticalFlex = Enum.UIFlexAlignment.SpaceAround,
            }
        end
    elseif value == "space-evenly" then
        if direction == Enum.FillDirection.Horizontal then
            return {
                HorizontalAlignment = Enum.HorizontalAlignment.Center,
                HorizontalFlex = Enum.UIFlexAlignment.SpaceEvenly,
            }
        else
            return {
                VerticalAlignment = Enum.VerticalAlignment.Center,
                VerticalFlex = Enum.UIFlexAlignment.SpaceEvenly,
            }
        end
    elseif value == "stretch" then
        if direction == Enum.FillDirection.Horizontal then
            return {
                HorizontalAlignment = Enum.HorizontalAlignment.Center,
                HorizontalFlex = Enum.UIFlexAlignment.Fill,
            }
        else
            return {
                VerticalAlignment = Enum.VerticalAlignment.Center,
                VerticalFlex = Enum.UIFlexAlignment.Fill,
            }
        end
    else
        error(
            string.format(
                'Invalid value in ConvertFlexValue. Expected "start", "end", "center", "space-between", "space-around", "space-evenly" or "stretch", found "%s"',
                value
            )
        )
    end
end

return Utils
