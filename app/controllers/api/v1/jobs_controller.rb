class Api::V1::JobsController < ApplicationController
    require 'open-uri'
    require 'json'
  
    def index
      render json: "Midland Orthopedic Group " * 1000
    end
  
    def pull_yelp_cache
      api_key = ENV['GOOGLE_PLACES_API_KEY']
      puts "*" * 100
      puts "api_key"
      puts api_key
      puts "*" * 100
      if api_key.nil? || api_key.empty?
        render json: { "error": "Please set the GOOGLE_PLACES_API_KEY environment variable." }
        return
      end
  
      places_api = GooglePlacesApi.new(api_key)
  
      # Replace 'YOUR_PLACE_ID_TO_LOOKUP' with an actual place ID to retrieve details
      place_id = 'ChIJ6wjoflfGwoARIQ4pYyXJCN8'
      encoded_place_id = URI.encode_www_form_component(place_id)
      place_details = places_api.get_place_details(encoded_place_id)
  
      if place_details
        render json: place_details
      else
        render json: { "error": "Failed to retrieve place details." }
      end
    end
  
    class GooglePlacesApi
      def initialize(api_key)
        @api_key = api_key
      end
  
      def get_place_details(place_id)
        url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&key=#{@api_key}"
  
        begin
          response = open(url).read
          data = JSON.parse(response)
          puts "*" * 100
          puts "data"
          puts data.inspect
          puts "*" * 100
          if data['status'] == 'OK'
            place_details = data['result']
            # Process and use place_details as needed
            return place_details
          else
            puts "Error: #{data['status']}"
            return nil
          end
        rescue OpenURI::HTTPError => e
          puts "HTTP Error: #{e.message}"
          return nil
        rescue JSON::ParserError => e
          puts "JSON Parsing Error: #{e.message}"
          return nil
        end
      end
    end
  end
  