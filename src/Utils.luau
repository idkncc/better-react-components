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

function Utils.Assign<T1, T2>(table1: T1, table2: T2): T1 & T2
    for k, v in pairs(table2) do
        table1[k] = v
    end

    return table1
end

function Utils.ConvertColor(value: Color3 | string): Color3
    if typeof(value) == "string" then
        return Color3.fromHex(value)
    else
        return value
    end
end

function Utils.ConvertAnchorPoint(value: AnchorPoint): Vector2
    if typeof(value) == "Vector2" then
        return value
    end

    return AnchorPointMapping[value]
end

return Utils
