fx_version "cerulean"
lua54 "yes"
game "gta5"

name "g-employees-chat & lists"
version "1.0.0"
description "g-employees-chat & lists"
author "GD3V - justgroot"

shared_scripts{
	"@ox_lib/init.lua", -- disable it if you don't use ox_lib or qbox
	"locales/locale.lua",
	"locales/translations/*.lua",
	"src/shared/*.lua",
}

ui_page 'web/build/index.html'
files {
   'web/build/index.html',
   'web/build/**/*',
}

server_scripts{
	'@oxmysql/lib/MySQL.lua',
	"bridge/**/server.lua",
	"src/server/*.lua",
}
client_scripts {
   'bridge/**/client.lua',
   'src/client/*.lua',
}