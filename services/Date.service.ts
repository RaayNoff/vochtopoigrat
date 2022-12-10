import moment from "moment";

import { IReleaseDate } from "../types/date";

interface IGetReleaseDatesReturn {
	dates: IReleaseDate[];
	currentDate: IReleaseDate;
}

class DateService {
	static getDaysInMonth(month: number, year: number) {
		return new Date(year, month, 0).getDate();
	}

	static getCurrentMonth() {
		return new Date().getMonth() + 1;
	}

	static getDateFromFormated(formatedDate: string) {
		const month = formatedDate.substring(5, 7);
		const year = formatedDate.substring(0, 4);
		const day = formatedDate.substring(8, 10);

		const date = new Date(Number(year), Number(month) - 1, Number(day));

		return date;
	}

	static getNormalFormated(formatedDate: string, pattern: string) {
		const date = this.getDateFromFormated(formatedDate);

		return moment.unix(Math.ceil(date.getTime() / 1000)).format(pattern);
	}

	static getReleaseDates(): IGetReleaseDatesReturn {
		const currentDate = new Date();

		const results: IReleaseDate[] = [];

		for (let i = -6; i < 6; i++) {
			let month = currentDate.getMonth() + i;
			let year = currentDate.getFullYear();

			if (month < 0) {
				month = Math.abs(month);
				year -= 1;
			}
			if (month + 1 > 12) {
				month = (month % 10) - 2;
				year += 1;
			}

			const maxDays = this.getDaysInMonth(month + 1, year);

			const dateStartFormated = moment(
				new Date().setFullYear(year, month, 1),
			).format("YYYY-MM-DD");
			const dateEndFormatted = moment(
				new Date().setFullYear(year, month, maxDays),
			).format("YYYY-MM-DD");

			results.push({
				formatedForUrl: `${dateStartFormated},${dateEndFormatted}`,
				maxDays,
				month: month + 1,
				year,
				formatedForDisplay: moment(new Date().setFullYear(year, month, 1)).format(
					"MMMM YYYY",
				),
				formatedForBtn: moment(new Date().setFullYear(year, month, 1)).format(
					"MMM",
				),
			});
		}

		const nowDate = results.filter(
			(date) => date.month === this.getCurrentMonth(),
		)[0];

		return { dates: results, currentDate: nowDate };
	}
}

export default DateService;
