# lib/force_www.rb
class ForceWWW
    def initialize(app)
      @app = app
    end
  
    def call(env)
      req = Rack::Request.new(env)
  
      # Redirect non-www to www
      if req.host == 'laorthos.com'
        [301, { 'Location' => req.url.sub('laorthos.com', 'www.laorthos.com') }, []]
      else
        @app.call(env)
      end
    end
  end
  