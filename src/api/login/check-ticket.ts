export const CheckTicketApi = async (ticket: string) => {
	const response = await fetch(
		`https://cas.gdust.edu.cn/cas-api/cas/checkTicket?ticket=${ticket}`,
	);

	if (response.status !== 200) {
		return false;
	} else {
		return true;
	}
};
