export const formatedDate = (dateString: string) => {
	const date = new Date(dateString);
	const formatedDate = date.toDateString();
	const formatedTheformatedDate = formatedDate.slice(4, 19);
	return formatedTheformatedDate;
};
