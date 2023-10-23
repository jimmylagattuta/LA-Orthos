class Api::V1::EmailController < ApplicationController
    def send_email
        form_data = email_params
        if send_email_to_office(form_data)
          render json: { message: "Email sent successfully" }, status: :ok
        else
          render json: { error: "Email sending failed" }, status: :unprocessable_entity
        end
      end

      private

      def email_params
        params.permit(:fName, :lName, :email, :phone, :message, :recaptcha, :agreeToTerms)
      end

      def send_email_to_office(form_data)
        OfficeMailer.contact_us_email(form_data).deliver_now

        true
      rescue StandardError => e
        Rails.logger.error("Email sending error: #{e.message}")
        false
      end
end
