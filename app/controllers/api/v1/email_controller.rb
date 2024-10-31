class Api::V1::EmailController < ApplicationController
  def send_email
    form_data = email_params
    if send_email_to_office(form_data)
      render json: { message: "Email sent successfully" }, status: :ok
    else
      render json: { error: "Email sending failed LAOSS: " }, status: :unprocessable_entity
    end
  end

  def send_email_webmd
    form_data = email_params
    if send_email_to_office_webmd(form_data)
      render json: { message: "Email sent successfully" }, status: :ok
    else
      render json: { error: "Email sending failed LAOSS: " }, status: :unprocessable_entity
    end
  end

  private

  def email_params
    params.permit(:fName, :lName, :email, :phone, :message, :recaptcha, :agreeToTerms, :dob, :agreeToTermsTexts, :selectedPatientType, :selectedSex, :selectedLocation, :selectedProvider)
  end

  def send_email_to_office(form_data)
    cc_emails = ['unitymskwebsites@gmail.com', 'jimmy.lagattuta@gmail.com', 'tguerrero@laorthos.com'] # Use an array for multiple CCs

    if form_data[:dob]
      if form_data[:agreeToTermsTexts]
        # texter wireup
        # puts "Texter"
      end
      OfficeMailer.request_appointment_email(form_data, cc_emails).deliver_now
    else
      OfficeMailer.contact_us_email(form_data, cc_emails).deliver_now
    end

    true
  rescue StandardError => e
    Rails.logger.error("Email sending error LAOSS: #{e.message}")
    OfficeMailer.error_email("LAOSS: Email Sending Error", "Failed to send email: #{e.message}").deliver_later
    false
  end

  def send_email_to_office_webmd(form_data)
    cc_emails = ['unitymskwebsites@gmail.com', 'jimmy.lagattuta@gmail.com', 'eperez@laorthos.com'] # Use an array for multiple CCs

    if form_data[:dob]
      if form_data[:agreeToTermsTexts]
        # texter wireup
        # puts "Texter"
      end
      OfficeMailer.request_appointment_email(form_data, cc_emails).deliver_now
    else
      OfficeMailer.contact_us_email_webmd(form_data, cc_emails).deliver_now
    end

    true
  rescue StandardError => e
    Rails.logger.error("Email sending error LAOSS: #{e.message}")
    OfficeMailer.error_email("LAOSS: Email Sending Error", "Failed to send email: #{e.message}").deliver_later
    false
  end
end
