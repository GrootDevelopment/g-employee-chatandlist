if GetResourceState("qb-core") ~= "started" then
    return
end

if Config.SystemSettings.Debug then
    local filename = function()
        local str = debug.getinfo(2, "S").source:sub(2)
        return str:match("^./(.).lua$") or str
    end
    print("^4[SERVER - DEBUG] ^0: " .. filename() .. ".lua started")
end

G = {}
G.framework = 'qbcore'
PlayerData = {}
local QBCore = exports['qb-core']:GetCoreObject()
---@diagnostic disable: duplicate-set-field

function G.ShowNotification(text, type)
    if type == 'inform' then
        type = 'info'
    end
    QBCore.Functions.Notify(text, type, 5000)  
end

local function InitializePlayerData()
    PlayerData = QBCore.Functions.GetPlayerData()
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
    return QBCore.Functions.GetPlayerData().job.name
end

function G.GetPlayerName()
    local charinfoo = PlayerData.charinfo
    return charinfoo.firstname .. ' ' .. charinfoo.lastname
end

function G.CheckPlayerJob(pjob)
    for _, v in pairs(Config.Jobs) do
        if PlayerData.job.name == v then
            return true
        end
    end
    return false
end

