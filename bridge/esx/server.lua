if GetResourceState("es_extended") ~= "started" then
    return
end

if Config.SystemSettings.Debug then
    local filename = function()
        local str = debug.getinfo(2, "S").source:sub(2)
        return str:match("^./(.).lua$") or str
    end
    print("^4[SERVER - DEBUG] ^0: " .. filename() .. ".lua started")
end
---@diagnostic disable: duplicate-set-field

G = {}
G.framework = 'esx'

ESX = exports.es_extended:getSharedObject()

function G.GetPlayer(src)
    return ESX.GetPlayerFromId(src)
end

function G.GetPlayersF()
    local extendedPlayers = ESX.GetExtendedPlayers()  
    local playerIds = {}

    for _, xPlayer in ipairs(extendedPlayers) do
        table.insert(playerIds, xPlayer.source) 
    end

    return playerIds 
end


function G.GetPlayers()
    return ESX.GetExtendedPlayers()
end

function G.GetSpecificJobPlayers(job)
    local response = MySQL.query.await(
        'SELECT `firstname`, `lastname`, `identifier`, `job_grade`, `job` FROM `users` WHERE `job` = ?', {job})

    local playersData = {}

    for _, player in ipairs(response) do
        local isOnline = G.isPlayerWithIdentifierOnline(player.identifier)

        local playerData = {
            name = player.firstname .. ' ' .. player.lastname,
            rank = G.GetGradeName(player.job_grade),
            isActive = isOnline
        }

        table.insert(playersData, playerData)
    end
    local totalemployees = #playersData
    local totalOnline = 0

    for _, player in ipairs(playersData) do
        if player.isActive then
            totalOnline = (totalOnline + 1)
        end
    end

    return playersData, totalemployees, totalOnline
end

function G.isPlayerWithIdentifierOnline(identifier)
    local xPlayers = ESX.GetExtendedPlayers()
    for _, xPlayer in pairs(xPlayers) do
        if xPlayer.identifier == identifier then
            return true
        end
    end
    return false
end

function G.GetJobName(src)
    local xPlayer = G.GetPlayer(src)
    if xPlayer then
        return xPlayer.job.name
    end
    return nil

end

function G.GetGradeName(rank)
    local response = MySQL.query.await('SELECT `label` FROM `job_grades` WHERE `grade` = ?', {tonumber(rank)})

    if response[1] then
        return response[1].label
    else
        return 'Unknown'
    end
end


function G.ShowNotification(target, text, type)
    TriggerClientEvent('esx:showNotification', target, text)
end

function G.GetPlayerSource(src)
    local xPlayer = G.GetPlayer(src)
    if xPlayer then
        return xPlayer.source
    end
    return nil
end
