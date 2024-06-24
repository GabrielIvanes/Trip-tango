'use server';

export const getAmadeusAccessToken = async () => {
	const apiKey = process.env.AMADEUS_API_KEY;
	const apiSecret = process.env.AMADEUS_API_SECRET;

	if (!(apiKey && apiSecret))
		return { success: false, message: 'Missing api key or api secret' };

	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
	};
	const body = new URLSearchParams({
		grant_type: 'client_credentials',
		client_id: apiKey,
		client_secret: apiSecret,
	});

	try {
		let accessToken = await fetch(
			'https://test.api.amadeus.com/v1/security/oauth2/token',
			{
				method: 'POST',
				headers: headers,
				body: body,
			}
		);
		accessToken = await accessToken.json();
		console.log(accessToken);
		return { success: true, accessToken };
	} catch (err) {
		return { success: false, message: err };
	}
};
