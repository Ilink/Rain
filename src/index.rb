require 'sinatra/base'
require 'slim'
require 'json'

# require_relative 'weather'

class Ilink < Sinatra::Base

	configure :production, :development do
		enable :logging
	end

	set :views, File.join(File.dirname(__FILE__), '..', 'views')
	set :public_folder, File.join(File.dirname(__FILE__), '..', 'public')

	get "/" do
		slim :rainSquid, :layout => :rainSquidLayout
	end

end