if GetResourceState("qbx_core") ~= "started" then
    return
end
lib.checkDependency('qbx_core', '1.19.0')
if Config.SystemSettings.Debug then
    local filename = function()
        local str = debug.getinfo(2, "S").source:sub(2)
        return str:match("^./(.).lua$") or str
    end
    print("^4[SERVER - DEBUG] ^0: " .. filename() .. ".lua started");
end

G = {}
G.framework = 'qbox'
PlayerData = {}

---@diagnostic disable: duplicate-set-field


function G.ShowNotification(text, type)
    exports.qbx_core:Notify(text, type, 5000)
end
local function InitializePlayerData()
    PlayerData = exports.qbx_core:GetPlayerData()
end
RegisterNetEvent('QBCore:Client:OnPlayerLoaded')
AddEventHandler('QBCore:Client:OnPlayerLoaded', function(playerData)
    InitializePlayerData()
end)

RegisterNetEvent('QBCore:Client:OnJobUpdate')
AddEventHandler('QBCore:Client:OnJobUpdate', function(job)
    
    PlayerData.job = job
    OpenMenu()
end)
function G.GetPlayerJob()
    return PlayerData.job.name
end
function G.GetPlayerName()
    return PlayerData.charinfo.firstname .. ' ' .. PlayerData.charinfo.lastname
end



function G.CheckPlayerJob()
    for _, v in pairs(Config.Jobs) do
        if PlayerData.job.name == v then
            return true
        end
    end
    return false
end

AddEventHandler('onResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
        InitializePlayerData()
    end
end)