if GetResourceState("es_extended") ~= "started" then
    return
end

if Config.SystemSettings.Debug then
    local filename = function()
        local str = debug.getinfo(2, "S").source:sub(2)
        return str:match("^./(.).lua$") or str
    end
    print("^4[SERVER - DEBUG] ^0: " .. filename() .. ".lua started");
end
---@diagnostic disable: duplicate-set-field
G = {}
G.framework = 'esx'

ESX = exports.es_extended:getSharedObject()

function G.ShowNotification(text, type)
    if type == 'inform' then
        type = 'info'
    end
    ESX.ShowNotification(text, type)
end

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer, isNew, skin)
    ESX.PlayerData = xPlayer
end)
RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    ESX.PlayerData.job = job
    OpenMenu()
end)

function G.GetPlayerJob()
    local job = ESX.PlayerData.job.name
    return job

end
function G.GetPlayerName()
    local name = ESX.PlayerData.firstName .. ' ' .. ESX.PlayerData.lastName
    return name
end

function G.CheckPlayerJob(pjob)
    for _, v in pairs(Config.Jobs) do
        if ESX.PlayerData.job.name == v then
            return true
        end
    end
    return false
end
