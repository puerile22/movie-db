require 'sinatra'
require 'sinatra/reloader'

set :bind, '0.0.0.0' # Vagrant fix
set :port, 8080

get '/' do
  send_file 'index.html'
end

