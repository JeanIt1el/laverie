<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailService
{
    public function __construct(private MailerInterface $mailer)
    {
    }

    public function sendOtpEmail(string $to, string $otp): void
    {
        $email = (new Email())
            ->from('itieleliza@gmail.com') // ⚠️ Remplacez par VOTRE email Gmail
            ->to($to)
            ->subject('Code de vérification - Laverie')
            ->html("
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;'>
                    <div style='background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
                        <h2 style='color: #2563eb; margin-bottom: 20px;'>Code de vérification</h2>
                        <p style='color: #374151; font-size: 16px; line-height: 1.5;'>
                            Bonjour,
                        </p>
                        <p style='color: #374151; font-size: 16px; line-height: 1.5;'>
                            Voici votre code de vérification :
                        </p>
                        <div style='background-color: #f3f4f6; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px;'>
                            <span style='font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #2563eb;'>{$otp}</span>
                        </div>
                        <p style='color: #6b7280; font-size: 14px; line-height: 1.5;'>
                            Ce code expire dans <strong>10 minutes</strong>.
                        </p>
                        <p style='color: #6b7280; font-size: 14px; line-height: 1.5; margin-top: 20px;'>
                            Si vous n'avez pas demandé ce code, veuillez ignorer cet email.
                        </p>
                    </div>
                </div>
            ");

        $this->mailer->send($email);
    }
}
