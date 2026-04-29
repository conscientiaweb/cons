'use server';

const TIQR_BASE_URL = 'https://api.tiqr.events';
const SESSION_ID = 'YOUR_SESSION_ID'; // Replace with your TiQR Session ID
const TICKET_ID = 352; // Replace with your workshop Ticket ID

export async function initiateTiQR(formData, workshopNames, totalAmount) {
  try {
    // 1. Get Access Token
    const authRes = await fetch(`${TIQR_BASE_URL}/participant/booking/custom-token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: SESSION_ID }),
      cache: 'no-store'
    });
    const { access_token } = await authRes.json();

    // 2. Create Booking
    const bookingRes = await fetch(`${TIQR_BASE_URL}/participant/booking/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        first_name: formData.name.split(' ')[0] || 'User',
        last_name: formData.name.split(' ').slice(1).join(' ') || '.',
        phone_number: `+91${formData.phone.replace(/\D/g, '')}`,
        email: formData.email.toLowerCase(),
        ticket: TICKET_ID,
        quantity: 1,
        meta_data: {
          workshops: workshopNames,
          college: formData.college,
          roll_no: formData.schoolId,
          amount: totalAmount
        }
      })
    });

    const data = await bookingRes.json();
    if (data.payment?.url_to_redirect) {
      return { url: data.payment.url_to_redirect };
    }
    return { error: "Failed to generate payment link." };
  } catch (err) {
    return { error: "Connection to TiQR failed." };
  }
}