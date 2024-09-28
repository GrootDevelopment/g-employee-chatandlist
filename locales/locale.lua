Language = {}

-- example:
-- local input = lib.inputDialog(LAN("title") 

-- Language["en"] = {
--    title = "ctm title",
-- }


function LAN(name, ...)
    if name then 
        local str = Language[Config.SystemSettings .Language][name]
        if str then 
            return string.format(str, ...)
        else    
            return "ERR_TRANSLATE_"..(name).."_404"
        end
    else
        return "ERR_TRANSLATE_404"
    end
end