# lib/middleware/force_www.rb
class ForceWWW
    def initialize(app)
      @app = app
    end
  
    def call(env)
      request = Rack::Request.new(env)
  
      # Check if the host does not start with 'www'
      if request.host !~ /^www\./
        # Redirect to the same path but with 'www'
        [301, { 'Location' => request.url.sub("//", "//www.") }, []]
      else
        @app.call(env)
      end
    end
  end
  