if Config.SystemSettings.Debug then
    local filename = function()
        local str = debug.getinfo(2, "S").source:sub(2)
        return str:match("^./(.).lua$") or str
    end
    print("^4[SERVER - DEBUG] ^0: " .. filename() .. ".lua started")
end

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

local isMenuOpen = false

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    TriggerServerEvent('justgroot:g-employeeslistandchat:toggle-state', false)
    debugPrint('Hide NUI frame')
    cb({})
end)

local function SendMydetails()
    local mydata = {
        name = G.GetPlayerName(),
        job = G.GetPlayerJob()
    }
    SendNUIMessage({
        action = 'justgroot:g-employeeslistandchat:send-mydetails',
        data = mydata
    })
end



function OpenMenu()
    local pjob = G.GetPlayerJob()
    TriggerServerEvent('justgroot:g-employeeslistandchat:get:data', pjob)
    SendMydetails()
end
local Localization = function()
    local translations = {
        employeelistTitle = LAN("employeelistTitle"),
        onlineAndTotalEmployees = LAN("onlineAndTotalEmployees"),
        Name = LAN("Name"),
        Rank = LAN("Rank"),
        Status = LAN("Status"),
        online = LAN("online"),
        offline = LAN("offline"),
        employeeschat = LAN("employeeschat"),
        chatinputplaceholder = LAN("chatinputplaceholder"),
        noemployeesfound = LAN("noemployeesfound"),
        employeeschatempty = LAN("employeeschatempty")

    }
    SendNUIMessage({
        action = 'g-employee-chatandlist:localizations',
        data = translations
    })
end

if Config.SystemSettings.EnableSystem then

    RegisterCommand(Config.Menu.cmd, function()
        Localization()
        if G.CheckPlayerJob(pjob) then
            TriggerServerEvent('justgroot:g-employeeslistandchat:toggle-state', true)
            toggleNuiFrame(true)
            OpenMenu()
        else
            G.ShowNotification('You are not allowed to use this menu', 'error')
        end
    end, false)
end

TriggerEvent('chat:addSuggestion', '/' .. Config.Menu.cmd, Config.Menu.help)

RegisterNetEvent('justgroot:g-employeeslistandchat:send-data-to-client', function(pjob, totalemployees, totalOnline)
    SendNUIMessage({
        action = 'justgroot:g-employeeslistandchat:send-data-to-nui',
        data = {
            employeeLists = pjob,
            EnableChat = Config.SystemSettings.EnableChat,
            TotalEmployees = totalemployees,
            TotalOnlineEmployee = totalOnline
        }
    })
end)

RegisterNUICallback('justgroot:g-employeeslistandchat:get-chat-data', function(data, cb)

    TriggerServerEvent('justgroot:g-employeeslistandchat:save-chat-show', data, isMenuOpen)
    cb({})
end)

RegisterNetEvent('justgroot:g-employeeslistandchat:send-chat-data-to-client', function(data)

    SendNUIMessage({
        action = 'justgroot:g-employeeslistandchat:send-all-chat-to-nui',
        data = data
    })
end)

