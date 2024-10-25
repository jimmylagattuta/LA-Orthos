class Api::V1::JobsController < ApplicationController
  def index
    render json: "Los Angeles Orthopedic Group " * 1000
  end

  def pull_google_places_cache
    csrf_token = form_authenticity_token
    puts "Pulling Google Places cache..."
    reviews = GooglePlacesCached.cached_google_places_reviews
    puts "Pulled reviews: #{reviews}"
    render json: { reviews: reviews, csrf_token: csrf_token }
  end
end

class GooglePlacesCached
  require 'redis'
  require 'json'
  require 'uri'
  require 'net/http'

  def self.remove_user_by_name(users, name)
    puts "Removing user with name: #{name}"
    users.reject! { |user| user['user'] && user['user']['name'] == name }
    puts "Users after removal: #{users}"
  end

  def self.cached_google_places_reviews
    begin
      puts "Connecting to Redis..."
      redis = Redis.new(
        url: ENV['REDIS_URL'],
        ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }  # Disable SSL verification
      )
      cached_data = redis.get('cached_google_places_reviews')
      puts "Cached data from Redis: #{cached_data}"

      if cached_data.present?
        puts "Processing cached data..."
        users = JSON.parse(cached_data)
        puts "Parsed users from cached data: #{users}"

        remove_user_by_name(users, 'Pdub ..')

        filtered_reviews = users.select { |review| review['rating'] == 5 }
        updated_reviews = JSON.generate(filtered_reviews)
        puts "Updated reviews after filtering: #{updated_reviews}"
        return updated_reviews
      end

      # If no cache, start fetching reviews from Google Places API
      puts "No cached data. Fetching from Google Places API..."
      place_ids = [
        'ChIJ6wjoflfGwoARIQ4pYyXJCN8',
        'ChIJo34riQ3GwoARLZD9o-uqI8Y',
        'ChIJfc-vNJTTwoARtN9DZQQNDRc',
        'ChIJ1e1EWx7RwoAReCY-TXXbhT4',
        'ChIJm2ksPQiZwoARG_JhTUiR0pI',
        'ChIJj3JTtm7BwoARcku_Ur8WuDE',
        'ChIJsT3iMBWHwoARLfqsCmNi-C0'
      ]

      http = Net::HTTP.new("maps.googleapis.com", 443)
      http.use_ssl = true
      reviews = []

      place_ids.each do |place_id|
        puts "Fetching details for place ID: #{place_id}"
        encoded_place_id = URI.encode_www_form_component(place_id)
        url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
        request = Net::HTTP::Get.new(url)
        response = http.request(request)
        body = response.read_body
        parsed_response = JSON.parse(body)
        puts "Google API response for place ID #{place_id}: #{parsed_response}"

        if parsed_response['status'] == 'OK'
          place_details = parsed_response['result']
          place_reviews = place_details.present? ? place_details['reviews'] || [] : []
          reviews.concat(place_reviews)
          puts "Fetched reviews for place ID #{place_id}: #{place_reviews}"
        else
          puts "Failed to retrieve place details for place ID: #{place_id}"
        end
      end

      # Cache the reviews in Redis
      redis.set("cached_google_places_reviews", JSON.generate(reviews))
      redis.expire("cached_google_places_reviews", 30.days.to_i)
      cached_reviews = redis.get("cached_google_places_reviews")
      puts "Cached reviews after fetching from Google: #{cached_reviews}"

      if cached_reviews.present?
        users = JSON.parse(cached_reviews)
        remove_user_by_name(users, 'Pdub ..')
        updated_reviews = JSON.generate(users)
        puts "Updated cached reviews after filtering: #{updated_reviews}"
        return updated_reviews
      end

      return { reviews: "No cached reviews" }

    rescue StandardError => e
      puts "Error in cached_google_places_reviews: #{e.message}"
      return { "error": e.message }
    end
  end
end
