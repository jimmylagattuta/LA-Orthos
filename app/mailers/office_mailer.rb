class OfficeMailer < ApplicationMailer
  default from: 'unitymskwebsites@gmail.com' # Set your default sender email address

  def contact_us_email(form_data, cc_emails)
    @form_data = form_data # Make the form data accessible in the email view template
    mail(to: 'unitymskwebsites@gmail.com', cc: cc_emails, subject: 'LAOSS: New Contact Form Submission')
  end

  def contact_us_email_webmd(form_data, cc_emails)
    @form_data = form_data # Make the form data accessible in the email view template
    mail(to: 'unitymskwebsites@gmail.com', cc: cc_emails, subject: 'LAOSS WebMD: New Contact Form Submission')
  end

  def request_appointment_email(form_data, cc_emails)
    @form_data = form_data # Make the form data accessible in the email view template
    mail(to: 'unitymskwebsites@gmail.com', cc: cc_emails, subject: 'LAOSS: New Request Appointment Form Submission')
  end

  def alert_no_reviews_email
    mail(to: 'jimmy.lagattuta@gmail.com', subject: 'Alert LAOSS: No Reviews Found')
  end

  def error_email(type, description)
    @type = type
    @description = description
    mail(to: 'jimmy.lagattuta@gmail.com', subject: "#{type} - LOASS: Error Notification", body: "#{type}: #{@description}")
  end
end
