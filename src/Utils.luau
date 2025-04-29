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

--- Padding (like in CSS)
---
--- There's 3 scenarios
---  1. Value is `UDimValue` or `{UDimValue}`: padding `UDimValue` is applied to all sides
---  2. Value is `{UDimValue, UDimValue}`: first value is vertical padding, second - horizontal padding
---  3. Value is `{UDimValue, UDimValue, UDimValue}`: where each value is {Top, Horizontal, Bottom}
---  4. Value is `{UDimValue, UDimValue, UDimValue, UDimValue}`: where each value is {Top, Right, Bottom, Left}
export type PaddingValue = UDimValue | { UDimValue }

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

local function ConvertUDimInternal(value: UDimValue): UDim
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

function Utils.ConvertUDim(value: BindingOrValue<UDimValue>): React.Binding<UDim>
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
    value: BindingOrValue<PaddingValue>
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
return Utils
