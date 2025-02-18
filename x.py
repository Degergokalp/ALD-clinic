import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json

def tsc_notification(subject, body,receiver_email):
    sender_email = "tsc.trade.notify@gmail.com"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = "tsc.trade.notify@gmail.com"
    smtp_password = "dlflavrvdjjhfvnc"


    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()  # Enable encryption
        server.login(smtp_username, smtp_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())

    print("Email sent successfully.")
