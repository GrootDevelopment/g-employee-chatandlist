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
---@diagnostic disable: duplicate-set-field

G = {}
G.framework = 'qb'

QBCore = exports["qb-core"]:GetCoreObject()

function G.GetPlayer(src)
    return QBCore.Functions.GetPlayer(src)
end

function G.GetPlayersF()

    local APlayers = QBCore.Functions.GetPlayers()
    local playerids = {}

    for _, xPlayer in pairs(APlayers) do
        table.insert(playerids, xPlayer)

    end

    return playerids

end

function G.GetPlayers()
    return QBCore.Functions.GetPlayers()
end

function G.GetSpecificJobPlayers(job)
    local response = MySQL.query.await("SELECT * FROM `players` WHERE `job` LIKE '%" .. job .. "%'", {})
    local playersData = {}

    local hasActivePlayer = false

    for _, player in ipairs(response) do
        local isOnline = G.isPlayerWithIdentifierOnline(player.citizenid)
        if isOnline and not hasActivePlayer then
            hasActivePlayer = true
        end
		 
        local jobData = json.decode(player.job)
		  local rNames = json.decode(player.charinfo)
        local playerData = {
            name = rNames.firstname .. ' ' .. rNames.lastname,
            rank = jobData.grade and jobData.grade.name or 'Unknown',
            isActive = isOnline
        }

        table.insert(playersData, playerData)
    end

    local totalEmployees = #playersData
    local totalOnline = hasActivePlayer and 1 or 0

    return playersData, totalEmployees, totalOnline
end

function G.isPlayerWithIdentifierOnline(citizenid)
    local xPlayers = QBCore.Functions.GetPlayers()
    for _, playerId in pairs(xPlayers) do
        local player = G.GetPlayer(playerId)
        if player and player.PlayerData.citizenid == citizenid then
            return true
        end
    end
    return false
end

function G.GetJobName(src)
    local xPlayer = G.GetPlayer(src)
    if xPlayer then
        return xPlayer.PlayerData.job.name
    end
    return nil
end

function G.GetGradeName(rank)
    local response = MySQL.query.await(
        'SELECT JSON_UNQUOTE(job->"$."label") AS label FROM players WHERE JSON_EXTRACT(job, "$.level") = ?',
        {tonumber(rank)})

    if response[1] then
        return response[1].label
    else
        return 'Unknown'
    end
end


function G.ShowNotification(target, text, type)
    TriggerClientEvent("QBCore:Notify", target, text)
end

function G.GetPlayerSource(src)
    local xPlayer = G.GetPlayer(src)
    if xPlayer then
        return xPlayer.PlayerData.source
    end
    return nil
end
