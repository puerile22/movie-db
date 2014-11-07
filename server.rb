require 'sinatra'
require 'sinatra/reloader'

set :bind, '0.0.0.0' # Vagrant fix
set :port, 9494

get '/' do
  send_file 'index.html'
end

