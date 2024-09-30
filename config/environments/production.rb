require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.middleware.insert_before ActionDispatch::Static, Rack::Deflater

  # Redirect non-www to www
  config.middleware.insert_before 0, Rack::Rewrite do
    r301 %r{.*}, 'https://www.laorthos.com$&', if: Proc.new { |rack_env|
      rack_env['SERVER_NAME'] == 'laorthos.com'
    }
  end

  # Code is not reloaded between requests.
  config.cache_classes = true

  # Eager load code on boot.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  # Ensure static assets are served when configured
  config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present? || ENV['HEROKU']
  config.public_file_server.headers = {
    'Cache-Control' => 'public, max-age=31536000'
  }

  # Set consistent asset host to avoid mismatches
  config.asset_host = "https://www.laorthos.com"
  config.hosts << "laorthos.com"
  config.hosts << "www.laorthos.com"

  config.assets.compile = false

  # Active Storage configuration
  config.active_storage.service = :local

  # Force all access to the app over SSL
  config.force_ssl = true

  # Log level and tags
  config.log_level = :info
  config.log_tags = [ :request_id ]

  # Use a different cache store in production
  config.cache_store = :redis_cache_store, { url: ENV['REDIS_TLS_URL'], expires_in: 30.days }
  config.active_job.queue_adapter = :sidekiq

  Sidekiq.configure_server do |config|
    config.redis = { url: ENV['REDIS_URL'] }
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: ENV['REDIS_URL'] }
  end

  # Enable locale fallbacks
  config.i18n.fallbacks = true

  # Don't log any deprecations
  config.active_support.report_deprecations = false

  # Default logging formatter
  config.log_formatter = ::Logger::Formatter.new

  # Action Mailer configuration
  config.action_mailer.asset_host = "https://www.laorthos.com"
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: 'smtp.gmail.com',
    port: 587,
    domain: 'gmail.com',
    user_name: 'unitymskwebsites@gmail.com',
    password: ENV["REACT_APP_GMAIL_PASSWORD"],
    authentication: 'plain',
    enable_starttls_auto: true
  }

  # Logger configuration
  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end

  # Do not dump schema after migrations
  config.active_record.dump_schema_after_migration = false
end
