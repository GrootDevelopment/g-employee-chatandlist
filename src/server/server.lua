if Config.SystemSettings.Debug then
    local filename = function()
        local str = debug.getinfo(2, "S").source:sub(2)
        return str:match("^./(.).lua$") or str
    end
    print("^4[SERVER - DEBUG] ^0: " .. filename() .. ".lua started")
end

RegisterNetEvent('justgroot:g-employeeslistandchat:get:data', function(pjob)
    local _soruce = source
    local getplayersdata, totalemployees, totalOnline = G.GetSpecificJobPlayers(pjob)
    TriggerClientEvent('justgroot:g-employeeslistandchat:send-data-to-client', _soruce, getplayersdata, totalemployees,
        totalOnline)
end)

RegisterNetEvent('justgroot:g-employeeslistandchat:save-chat-show', function(data)
    local _source = source
    local job = G.GetJobName(_source)

    if data then
        local chatData = {
            sender = data.sender,
            message = data.message,
            job = job
        }


        local getplayerids = G.GetPlayersF()
        for _, playerId in ipairs(getplayerids) do
            if G.GetJobName(playerId) == job then
                TriggerClientEvent('justgroot:g-employeeslistandchat:send-chat-data-to-client', playerId, chatData)
            end
        end

        SendNotificationtoJobPlayers(job)
    end
end)

local chatStatus = {}

RegisterNetEvent('justgroot:g-employeeslistandchat:toggle-state', function(isOpen)
    local playerId = source
    chatStatus[playerId] = isOpen
end)

function SendNotificationtoJobPlayers(job)
    local getplayerids = G.GetPlayersF()
   
    for _, playerId in ipairs(getplayerids) do
        local playerJob = G.GetJobName(playerId)
        if playerJob == job then
            if not chatStatus[playerId] then
                G.ShowNotification(playerId, '[Employee Chat] New message received') -- Send the notification
            end
        end
    end
end

