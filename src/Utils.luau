local React = require("@pkg/react")

local Utils = {}

--- User-friendly anchor points
---
---       center
--- left  |    right
--- |     |    |
--- `tl`, `t`, `tr` – top
--- `ml`, `m`, `mr` – middle
--- `bl`, `b`, `br` – bottom
export type AnchorPoint = "tl" | "t" | "tr" | "ml" | "m" | "mr" | "bl" | "b" | "br" | Vector2

--- Color
---
--- It's either `Color3` or hexcode of color (e.g. `#FF0000`)
export type Color = Color3 | string

--- Text Size
---
--- `"auto"` enables `TextScaled` property. Otherwise sets TextSize
export type TextSize = number | "auto"

--- Font
export type FontValue = Font | EnumItem

--- UDim
---
--- Takes `UDim` or `number` as offset
export type UDimValue = UDim | number

export type BindingOrValue<T> = React.Binding<T> | T

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
function Utils.mapBinding<T, R>(bindingOrValue: BindingOrValue<T>, map: (value: T) -> R): React.Binding<R>
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

function Utils.ConvertColor(value: BindingOrValue<Color3 | string>): React.Binding<Color3>
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

function Utils.ConvertAnchorPoint(value: BindingOrValue<AnchorPoint>): React.Binding<Vector2>
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

function Utils.ConvertFont(value: BindingOrValue<FontValue>): React.Binding<Font>
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

function Utils.ConvertUDim(value: BindingOrValue<UDimValue>): React.Binding<UDim>
    return Utils.mapBinding(value, function(value)
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
    end)
end

return Utils
